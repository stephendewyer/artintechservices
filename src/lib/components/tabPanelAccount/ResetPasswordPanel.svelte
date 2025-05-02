<script lang="ts">
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import EmailInput from "../inputs/EmailInput.svelte";
    import SubmitButton02 from "../buttons/SubmitButton02.svelte";
    import TextInputReadOnly from "../inputs/TextInputReadOnly.svelte";

    export let panel_data;

    let emailIsValid: boolean = true;
    let emailInputValue: string = "";
    // after reset password submit

    let responseChangePasswordItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    $: if((responseChangePasswordItem.success) || (responseChangePasswordItem.error)) {
        setTimeout(() => {
            responseChangePasswordItem.success = "";
            responseChangePasswordItem.error = "";
            responseChangePasswordItem.status = null;
        }, 4000)
    };

    const resetPassword = async (
        email: string
    ) => {
        const response = await fetch("/authenticated-client/api/sendPasswordUpdateEmail", {
            method: "POST",
            body: JSON.stringify({
                email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseChangePasswordItem = await response.json();
        return responseChangePasswordItem;
    };

    let pendingResetPassword: boolean = false;

    const resetPasswordHandler = async () => {
        pendingResetPassword = true;
        try {
            await resetPassword(
                panel_data[0].userEmail
            );
            if (responseChangePasswordItem.success) {
                emailInputValue = "";
            } else if (responseChangePasswordItem.error) {
                if ((emailInputValue === "") || (!emailInputValue.includes('@'))) {
                    emailIsValid = false;
                };
            };
        } catch (error) {
            console.log(error);
        };
    };

    $: if ((responseChangePasswordItem.error) || (responseChangePasswordItem.success)) {
        pendingResetPassword = false;
    };
</script>
<form 
    on:submit|preventDefault={resetPasswordHandler}
    class="form"
>
    <h2>
        reset password
    </h2>
    <div class="input_row">
        <TextInputReadOnly
            bind:isValid={emailIsValid}
            placeholder="myEmail@myDomain.com"
            inputID="client_email"
            inputName="client_email"
            bind:textInputValue={panel_data[0].userEmail}
            inputLabel={true}
            required={true}
        >
            email
        </TextInputReadOnly>
    </div>
    <div class="buttons_container">
        <SubmitButton02
            disable={false}
        >
            send reset email
        </SubmitButton02>
    </div>
    {#if (pendingResetPassword)}
        <PendingFlashMessage >
            please wait while we validate your data
        </PendingFlashMessage>
    {:else if (responseChangePasswordItem.error)}
        <ErrorFlashMessage >
            {responseChangePasswordItem.error}
        </ErrorFlashMessage>
    {:else if (responseChangePasswordItem.success)}
        <SuccessFlashMessage>
            {responseChangePasswordItem.success}
        </SuccessFlashMessage>
    {/if}
</form>
<style>

.form {
        width: 100%;
    }

    .input_row {
        width: 100%;
        max-width: 40rem;
    }
    
</style>