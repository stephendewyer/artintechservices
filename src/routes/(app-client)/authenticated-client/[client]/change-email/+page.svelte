<script lang="ts">
    import { page } from "$app/stores";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import { signOut } from "@auth/sveltekit/client";

    export let data;

    const newEmail = data.newEmail;

    const sessionEmail = $page.data.streamed.user?.email;

    let responseConfirmChangeEmail: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    $: if((responseConfirmChangeEmail.success) || (responseConfirmChangeEmail.error)) {
        setTimeout(() => {
            responseConfirmChangeEmail.success = "";
            responseConfirmChangeEmail.error = "";
            responseConfirmChangeEmail.status = null;
        }, 4000);
    };

    const confirmEmailChange = async (
        sessionEmail: string | null | undefined,
        newEmail: string
    ) => {
        
        const response = await fetch("/authenticated-client/api/updateClientEmail", {
            method: "PATCH",
            body: JSON.stringify({
                sessionEmail,
                newEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseConfirmChangeEmail = await response.json();
        return responseConfirmChangeEmail;

    };

    let pendingEmailChange: boolean = false;

    const confirmEmailChangeHandler = async () => {
        pendingEmailChange = true;
        try {
            await confirmEmailChange(
                sessionEmail,
                newEmail
            );
            if (responseConfirmChangeEmail.success) {
                signOut({
                    redirect: true,
                    callbackUrl: "/logins/login-client"
                });
            };
        } catch (error) {
            console.log(error);
        };
    };

    $: if ((responseConfirmChangeEmail.error) || (responseConfirmChangeEmail.success)) {
        pendingEmailChange = false;
    };

</script>

<div class="email_change_successful">
    <h1>confirm email change</h1>
    <form 
        on:submit|preventDefault={confirmEmailChangeHandler}
        class="form"
    >
        <h2>
            I would like to change the email associated with my account to {newEmail}.
        </h2>
        <p class="logout_details">
            Changing your email will logout this session, after which you can login with your new email.
        </p>
        <SubmitButton disable={false}>
            yes, change my email
        </SubmitButton>
        {#if (pendingEmailChange)}
            <PendingFlashMessage >
                please wait while we validate your data
            </PendingFlashMessage>
        {:else if (responseConfirmChangeEmail.error)}
            <ErrorFlashMessage >
                {responseConfirmChangeEmail.error}
            </ErrorFlashMessage>
        {:else if (responseConfirmChangeEmail.success)}
            <SuccessFlashMessage>
                {responseConfirmChangeEmail.success}
            </SuccessFlashMessage>
        {/if}
    </form>
</div>

<style>

    .form {
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: 60rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .email_change_successful {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    .logout_details {
        width: 100%;
    }
</style>