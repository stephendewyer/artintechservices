<script lang="ts">
    import PasswordCompare from "$lib/components/inputs/PasswordCompare.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import { goto } from "$app/navigation";

    export let data;

    let email = data.email;

    let passwordsMatch: null | boolean = null;
    let passwordInputValue: string = "";
    let passwordIsValid: boolean = true;
    let passwordReenteredInputValue: string = "";
    let passwordReenteredIsValid: boolean = true;

    let buttonDisabled: boolean = true;

    $: if (
            passwordInputValue === passwordReenteredInputValue &&
            passwordInputValue !== "" && 
            passwordReenteredInputValue !== ""
        ) {
        buttonDisabled = false;
    } else {
        buttonDisabled = true;
    };

    // after submit

	let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000)
    };

    let pending: boolean = false;

    const updatePassword = async (
        password: string,
        passwordReentered: string,
        email: string | null
    ) => {
        const response = await fetch("/api/authentication/updatePassword/updatePasswordClient", {
            method: "PATCH",
            body: JSON.stringify({
                password,
                passwordReentered,
                email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseItem = await response.json();
        console.log(responseItem);
        return responseItem;
    };

    const updatePasswordHandler = async () => {
        pending = true;
        try {
            await updatePassword(
                passwordInputValue,
                passwordReenteredInputValue,
                email
            );
            if (responseItem.success) {
                passwordInputValue = "";
                passwordReenteredInputValue = "";
                email = ""
                goto("/login-client")
            };
        } catch (error) {
            console.log(error);
        };
    };

    $: if((responseItem.error) || (responseItem.success)) {
        pending = false;
    };

</script>
<div class="page">
    <form class="form" on:submit|preventDefault={updatePasswordHandler}>
        <h1>update client password</h1>
        <div class="input_row">
            <PasswordCompare
                bind:passwordsMatch={passwordsMatch}
                bind:passwordInputValue={passwordInputValue}
                bind:passwordIsValid={passwordIsValid}
                bind:passwordReenteredInputValue={passwordReenteredInputValue}
                bind:passwordReenteredIsValid={passwordReenteredIsValid}
            >
                <div slot="password_label">new password</div>
                <div slot="re-entered_password_label">re-enter new password</div>
            </PasswordCompare>
        </div>
        <SubmitButton disable={buttonDisabled}>
            update password
        </SubmitButton>
    </form>
    {#if (pending)}
        <PendingFlashMessage >
            please wait while we validate your data
        </PendingFlashMessage>
    {:else if (responseItem.error)}
        <ErrorFlashMessage >
            {responseItem.error}
        </ErrorFlashMessage>
    {:else if (responseItem.success)}
        <SuccessFlashMessage>
            {responseItem.success}
        </SuccessFlashMessage>
    {/if}
    <a href="/reset-client-password" class="cancel_button_container">
        <CancelButton>
            cancel
        </CancelButton>
    </a>
</div>

<style>
    .input_row {
        width: 100%;
        max-width: 28rem;
    }
    .cancel_button_container {
        padding: 2rem 1rem 1rem 1rem;
    }
</style>