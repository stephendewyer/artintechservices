<script lang="ts">
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import PasswordInput from "$lib/components/inputs/PasswordInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";

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

    let passwordInputErrorMessage = "password required";

    let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    // after submit
	let item: ResponseObj = {
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

    const loginAdministratorHandler = () => {

    }

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };

</script>

<svelte:head>
	<title>Art in Tech Services - login administrator</title>
	<meta name="description" content="login administrator" />
	<meta property="og:image" content="{ArtInTechServicesBanner}" />
    <meta property="og:url" content="https://artintechservices.vercel.app/login-administrator" />
</svelte:head>

<div class="page">
    <form class="form" on:submit|preventDefault={loginAdministratorHandler}>
        <h1>login administrator</h1>
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

    .cancel_button_container {
        padding: 2rem 1rem 1rem 1rem;
    }

</style>