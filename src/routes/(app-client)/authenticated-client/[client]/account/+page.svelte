<script lang="ts">
    import SettingsIcon from "$lib/images/icons/settings_icon.svg?raw";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import SubmitButton02 from "$lib/components/buttons/SubmitButton02.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    
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
        const response = await fetch("/authenticated-client/api/resetPassword", {
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
                emailInputValue
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

    // after change email submit

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
        }, 4000)
    };

    const changeEmailHandler = async () => {

    };

    const deleteAccountHandler = async () => {

    };

</script>

<svelte:head>
	<title>Art in Tech Services - my client account</title>
	<meta name="description" content="my client account page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<section class="account_page">
    <div class="account_heading">
        <h1>account</h1>
        <div class="settings_icon">
            {@html SettingsIcon}
        </div>
    </div>
    <form 
        on:submit|preventDefault={resetPasswordHandler}
        class="form"
    >
        <h2>
            reset password
        </h2>
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
    <form 
        on:submit|preventDefault={changeEmailHandler}
        class="form"
    >
        <h2>
            change email
        </h2>
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
            <SubmitButton02
                disable={false}
            >
                send reset email
            </SubmitButton02>
        </div>
    </form>
    <form 
        on:submit|preventDefault={deleteAccountHandler}
        class="form"
    >
        <h2>delete account</h2>
        <p style="padding: 0; margin: 0;">
            Do you want to permanently delete your account?
        </p>
        <SubmitButton02
            disable={false}
        >
            permanently delete my account
        </SubmitButton02>
    </form>
</section>

<style>
    .account_page {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .account_heading {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    .settings_icon {
        width: 6rem;
    }

    .form {
        width: 32rem;
    }

    .input_row {
        width: 100%;
    }

    .delete_account {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        padding: 0 0 2rem 0;
    }
</style>