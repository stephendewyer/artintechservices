<script lang="ts">
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import PasswordInput from "$lib/components/inputs/PasswordInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import { goto } from '$app/navigation';
    import { signIn } from "@auth/sveltekit/client";

    let emailInputValue: string = "";
    let emailIsValid: boolean = true;

    let passwordInputValue: string = "";
    let passwordIsValid: boolean = true;

    let loginClientButtonDisabled: boolean = true;

    $: if (
        emailIsValid &&
        passwordIsValid &&
        (passwordInputValue !== "") &&
        (emailInputValue !== "")
    ) {
        loginClientButtonDisabled = false;
    } else {
        loginClientButtonDisabled = true;
    };

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

    const loginClientHandler = async () => {
        pending = true;
        try {
            const response = await signIn("credentials", {
                providerId: "client-login",
                email: emailInputValue,
                password: passwordInputValue,
                redirect: false,
            });

            console.log(response)

            if (!response) {
                responseItem.error = "invalid email and/or password";
            } else if (response) {
                responseItem.success = "valid email and password";
                emailInputValue = "";
                passwordInputValue = "";
                goto(`/authenticated-client/client`)
            }; 
        } catch (error) {
            console.log(error);
        };
    };

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };

</script>

<svelte:head>
	<title>Art in Tech Services - login client</title>
	<meta name="description" content="login client" />
	<meta property="og:image" content="{ArtInTechServicesBanner}" />
    <meta property="og:url" content="https://artintechservices.vercel.app/login-client" />
</svelte:head>

<div class="page">
    <form class="form" on:submit|preventDefault={loginClientHandler}>
        <h1>login client</h1>
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
                email:
            </EmailInput>
        </div>
        <div class="input_row">
            <PasswordInput
                bind:isValid={passwordIsValid}
                placeholder="myPassword"
                inputID="client_password"
                inputName="client_password"
                inputLabel={true}
                bind:passwordInputValue={passwordInputValue}
                required={true}
                passwordInputErrorMessage="password required"
            >
                password:
            </PasswordInput>
        </div>
        <div class="buttons_container">
            <SubmitButton 
                disable={loginClientButtonDisabled}
            >
                login
            </SubmitButton>
        </div>
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
    <div class="login_helpers_container">
        <div class="login_helpers_column">
            <h4 class="login_helper_prompt">
                don't have an account?
            </h4>
            <a href="/create-a-client-account">
                <ActionButtonSecondary>
                    create a free account
                </ActionButtonSecondary>
            </a>
        </div>
        <div class="login_helpers_column">
            <h4 class="login_helper_prompt">
                forgot your password?
            </h4>
            <a href="/reset-client-password">
                <ActionButtonSecondary>
                    reset password
                </ActionButtonSecondary>
            </a>
        </div>
    </div>
    <a href="/" class="cancel_button_container">
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

    .login_helpers_container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
        width: 100%;
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

    .cancel_button_container {
        padding: 2rem 1rem 1rem 1rem;
    }

    @media screen and (max-width: 1440px) {

    }

    @media screen and (max-width: 1080px) {

        .login_helpers_container {
            flex-direction: column;
        }

        .login_helpers_column {
            width: 100%;
            gap: 0.5rem;
        }
    }
</style>