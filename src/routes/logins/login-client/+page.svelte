<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import PasswordInput from "$lib/components/inputs/PasswordInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import { signIn } from "@auth/sveltekit/client";

    // receive form data from server

    let emailInputValue: string = "";
    let emailIsValid: boolean = true;

    let passwordInputValue: string = "";
    let passwordIsValid: boolean = true;

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

    const loginClient = async (
        email: string,
        password: string
    ) => {
        const response = await fetch("/api/authentication/signInClient", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const loginClientHandler = async () => {
        pending = true;
        try {
            await loginClient(emailInputValue, passwordInputValue);
            if (responseItem.success) {
                try {
                    await signIn("credentials", {
                        providerId: "client-login",
                        email: emailInputValue,
                        password: passwordInputValue,
                        redirect: true,
                        callbackUrl: "/authenticated-client/client"
                    });
                } catch (error) {
                    console.log(error);
                };
            } else if (responseItem.error) {
                if ((emailInputValue === "") || (!emailInputValue.includes('@'))) {
                    emailIsValid = false;
                };
                if (passwordInputValue === "") {
                    passwordIsValid = false;
                };
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
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <form class="form" on:submit|preventDefault={loginClientHandler}>
        <h1>login client</h1>
        <ul>
            <li>
                schedule and keep track of consultations
            </li>
            <li>
                start and keep track of projects
            </li>
            <li>
                send and receive secure messages
            </li>
            <li>
                handle invoices
            </li>
            <li>
                handle personal account details
            </li>
        </ul>
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
                disable={false}
            >
                login
            </SubmitButton>
        </div>
    </form>
    {#if (pending)}
        <PendingFlashMessage >
            please wait while we validate your credentials
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
        padding: 0 0 2rem 0;
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

        .login_helpers_container {
            flex-direction: column;
        }

        .login_helpers_column {
            width: 100%;
            gap: 0.5rem;
        }
    }
</style>