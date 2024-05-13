<script lang="ts">
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    
    let emailIsValid: boolean = true;
    let emailInputValue: string = "";

    let buttonDisabled: boolean = true;

    $: if (
        emailIsValid &&
        (emailInputValue !== "") &&
        (emailInputValue.includes('@'))
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

    const sendEmail = async (
        email: string
    ) => {
        const response = await fetch("/api/authentication/resetPassword/resetPasswordClient", {
            method: "POST",
            body: JSON.stringify({
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

    let pending: boolean = false;

    const sendEmailHandler = async () => {
        pending = true;
        try {
            await sendEmail(
                emailInputValue
            );
            if (responseItem.success) {
                emailInputValue = "";
            } else if (responseItem.error) {
                if ((emailInputValue === "") || (!emailInputValue.includes('@'))) {
                    emailIsValid = false;
                };
            };
        } catch (error) {
            console.log(error);
        };
    };

    $: if ((responseItem.error) || (responseItem.success)) {
        pending = false;
    };

</script>

<svelte:head>
	<title>Art in Tech Services - reset client password</title>
	<meta name="description" content="reset client password" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <form 
        on:submit|preventDefault={sendEmailHandler}
        class="form"
    >
        <h1>
            reset client password
        </h1>
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
                email
            </EmailInput>
        </div>
        <div class="buttons_container">
            <SubmitButton
                disable={buttonDisabled}
            >
                send reset email
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
    <a href="/login-client" class="cancel_button_container">
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