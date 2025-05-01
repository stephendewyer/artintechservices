<script lang="ts">
  import { page } from "$app/stores";
    import SubmitButton02 from "../buttons/SubmitButton02.svelte";
    import ErrorFlashMessage from "../flashMessages/ErrorFlashMessage.svelte";
    import PendingFlashMessage from "../flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "../flashMessages/SuccessFlashMessage.svelte";
    import EmailInput from "../inputs/EmailInput.svelte";

    export let panel_data;

    const sessionEmail = $page.data.streamed.user?.email;
    
    // after change email submit

    let emailIsValid: boolean = true;

    let emailInputValue: string = "";

    let responseChangeEmailItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    $: if((responseChangeEmailItem.success) || (responseChangeEmailItem.error)) {
        setTimeout(() => {
            responseChangeEmailItem.success = "";
            responseChangeEmailItem.error = "";
            responseChangeEmailItem.status = null;
        }, 4000);
    };

    const sendEmailUpdateEmail = async (
        sessionEmail: string | null | undefined,
        emailInputValue: string,
        name: string
    ) => {
        const response = await fetch("/authenticated-client/api/sendEmailUpdateEmail", {
            method: "POST",
            body: JSON.stringify({
                sessionEmail,
                emailInputValue,
                name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseChangeEmailItem = await response.json();
        return responseChangeEmailItem;

    };

    let pendingEmailUpdateEmail: boolean = false;

    const sendEmailUpdateEmailHandler = async () => {
        pendingEmailUpdateEmail = true;
        try {
            await sendEmailUpdateEmail(
                sessionEmail,
                emailInputValue,
                panel_data[0].name
            );
            if (responseChangeEmailItem.success) {
                emailInputValue = "";
            } else if (responseChangeEmailItem.error) {
                if ((emailInputValue === "") || (!emailInputValue.includes('@'))) {
                    emailIsValid = false;
                };
            };
        } catch (error) {
            console.log(error);
        };
    };

    $: if ((responseChangeEmailItem.error) || (responseChangeEmailItem.success)) {
        pendingEmailUpdateEmail = false;
    };

</script>
<form 
    on:submit|preventDefault={sendEmailUpdateEmailHandler}
    class="form"
>
    <h2>
        change email address
    </h2>
    <p>
        <span style="font-weight: bold">current email: </span>{panel_data[0].userEmail}
    </p>
    <p>Please submit the email address you want to use on your account.  A verification link to change the email address associated with your account will send to the email address you submit.</p>
    <div class="input_row">
        <EmailInput
            bind:isValid={emailIsValid}
            placeholder="myEmail@myDomain.com"
            inputID="client_email"
            inputName="client_email"
            bind:emailInputValue={emailInputValue}
            inputLabel={true}
            required={true}
        >
            new email
        </EmailInput>
    </div>
    <div class="buttons_container">
        <SubmitButton02
            disable={false}
        >
            send verification link
        </SubmitButton02>
    </div>
    {#if (pendingEmailUpdateEmail)}
        <PendingFlashMessage >
            please wait while we validate your data
        </PendingFlashMessage>
    {:else if (responseChangeEmailItem.error)}
        <ErrorFlashMessage >
            {responseChangeEmailItem.error}
        </ErrorFlashMessage>
    {:else if (responseChangeEmailItem.success)}
        <SuccessFlashMessage>
            {responseChangeEmailItem.success}
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