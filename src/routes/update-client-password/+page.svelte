<script lang="ts">
    import PasswordCompare from "$lib/components/inputs/createPasswordInputs/PasswordCompare.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { goto } from "$app/navigation";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import { page } from "$app/stores";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    
    export let data;

    let email = data.email;

    let passwordsMatch: null | boolean = null;
    let passwordInputValue: string = "";
    let passwordIsValid: boolean = true;
    let passwordReenteredInputValue: string = "";
    let passwordReenteredIsValid: boolean = true;

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
<svelte:head>
    <title>Art in Tech Services - update client password</title>
    <meta name="description" content="update client password" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
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
    <div class="login_helpers_column">
        <h4 class="login_helper_prompt">
            did not receive update password link?
        </h4>
        <a href="/reset-client-password">
            <ActionButtonSecondary>
                resend update password link
            </ActionButtonSecondary>
        </a>
    </div>
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

    .login_helpers_column {
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
    }

    .login_helper_prompt {
        text-align: center;
        width: 100%;
        padding: 0 0.5rem;
    }

    @media screen and (max-width: 1080px) {

        .login_helpers_column {
            width: 100%;
            gap: 0.5rem;
        }
    }
</style>