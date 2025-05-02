<script lang="ts">
    import PasswordCompare from "$lib/components/inputs/createPasswordInputs/PasswordCompare.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    
    let passwordsMatch: null | boolean = null;
    let passwordInputValue: string = "";
    let passwordIsValid: boolean = true;
    let passwordReenteredInputValue: string = "";
    let passwordReenteredIsValid: boolean = true;
    const sessionEmail = $page.data.streamed.user?.email;

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
        sessionEmail: string | null
    ) => {
        const response = await fetch("/authenticated-client/api/updateClientPassword", {
            method: "PATCH",
            body: JSON.stringify({
                password,
                passwordReentered,
                sessionEmail
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
                sessionEmail
            );
            if (responseItem.success) {
                passwordInputValue = "";
                passwordReenteredInputValue = "";
                goto("/authenticated-client/client/account")
            };

        } catch (error) {
            console.log(error);
        };
    };

    $: if((responseItem.error) || (responseItem.success)) {
        pending = false;
    };

</script>
<div class="container">
    <form class="form" on:submit|preventDefault={updatePasswordHandler}>
        <h1>update client password</h1>
        <ul>
            <li>
                password must have at least 7 characters and 14 or less characters
            </li>
            <li>
                password must have at least one number and one special character
            </li>
            <li>
                password must have at least one capitalized letter and one lower case letter
            </li>
        </ul>
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
        <SubmitButton disable={false}>
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
</div>

<style>
    .input_row {
        width: 100%;
        max-width: 28rem;
    }

</style>