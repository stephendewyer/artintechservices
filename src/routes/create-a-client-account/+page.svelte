<script lang="ts">
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import PasswordCompare from "$lib/components/inputs/PasswordCompare.svelte";
    import TextInput from "$lib/components/inputs/TextInput.svelte";

    let nameFirstInputValue: string = "";
    let nameLastInputValue: string = "";
    let emailInputValue: string = "";
    let passwordInputValue: string = "";
    let passwordReenteredInputValue: string = "";

    let nameFirstIsValid: boolean = true;
    let nameLastIsValid: boolean = true;
    let emailIsValid: boolean = true;
    let passwordIsValid: boolean = true;
    let passwordReenteredIsValid: boolean = true;
    let passwordsMatch: boolean | null = null;

    let createClientAccountButtonDisabled: boolean = true;

    $: if (
        emailIsValid &&
        (passwordsMatch === true) &&
        (passwordInputValue !== "") &&
        (emailInputValue !== "") &&
        (passwordReenteredInputValue !== "") &&
        (nameFirstInputValue !== "") &&
        (nameLastInputValue !== "")
    ) {
        createClientAccountButtonDisabled = false;
    } else {
        createClientAccountButtonDisabled = true;
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

    const createClientAccount = async (
        nameFirstInputValue: string,
        nameLastInputValue: string,
        emailInputValue: string,
        passwordInputValue: string,
        passwordReenteredInputValue: string
    ) => {
        const response = await fetch("/api/createAccountClient", {
            method: 'POST',
            body: JSON.stringify({
                nameFirstInputValue, 
                nameLastInputValue, 
                emailInputValue, 
                passwordInputValue,
                passwordReenteredInputValue
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const createClientAccountHandler = async () => {
        pending = true;
        try {
            await createClientAccount(
                nameFirstInputValue, 
                nameLastInputValue, 
                emailInputValue, 
                passwordInputValue,
                passwordReenteredInputValue
            );

            if (responseItem.success) {
                nameFirstInputValue = "", 
                nameLastInputValue = "", 
                emailInputValue = "", 
                passwordInputValue = "",
                passwordReenteredInputValue = ""
            };

            if (responseItem.error) {
                if (emailInputValue === "") {
                    emailIsValid = false;
                } else if (!emailInputValue.includes('@')) {
                    emailIsValid = false;
                } else if (emailInputValue !== "") {
                    emailIsValid = true;
                };

                if (nameFirstInputValue === "") {
                    nameFirstIsValid = false;
                } else if (nameFirstInputValue !== "") {
                    nameFirstIsValid = true;
                };

                if (nameLastInputValue === "") {
                    nameLastIsValid = false;
                } else if (nameLastInputValue !== "") {
                    nameLastIsValid = true;
                };

                if (passwordInputValue === "") {
                    passwordIsValid = false;
                } else if (passwordInputValue !== "") {
                    passwordIsValid = true;
                };

                if (passwordReenteredInputValue === "") {
                    passwordReenteredIsValid = false;
                } else if (passwordReenteredInputValue !== "") {
                    passwordReenteredIsValid = true;
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
	<title>Art in Tech Services - create a client account</title>
	<meta name="description" content="create a client account" />
	<meta property="og:image" content="{ArtInTechServicesBanner}" />
    <meta property="og:url" content="https://artintechservices.vercel.app/create-a-client-account" />
</svelte:head>

<div class="page">
    <form class="form" on:submit|preventDefault={createClientAccountHandler}>
        <h1>create a free client account</h1>
        <h3>*indicates required</h3>
        <div class="input_row">
            <TextInput
                bind:isValid={nameFirstIsValid}
                placeholder="myfirstname"
                inputID="name_first"
                inputName="name_first"
                bind:textInputValue={nameFirstInputValue}
                inputLabel={true}
                required={true}
            >
            first name*
            </TextInput>
        </div>
        <div class="input_row">
            <TextInput
                bind:isValid={nameLastIsValid}
                placeholder="mylastname"
                inputID="name_last"
                inputName="name_last"
                bind:textInputValue={nameLastInputValue}
                inputLabel={true}
                required={true}
            >
            last name*
            </TextInput>
        </div>
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
                email*
            </EmailInput>
        </div>
        <div class="input_row">
            <PasswordCompare
                bind:passwordInputValue
                bind:passwordReenteredInputValue
                bind:passwordIsValid
                bind:passwordReenteredIsValid
                bind:passwordsMatch
            >
                <div slot="password_label">password*</div>
                <div slot="re-entered_password_label">re-enter password*</div>
            </PasswordCompare>
        </div>
        <div class="buttons_container">
            <a href="/">
                <CancelButton>
                    cancel
                </CancelButton>
            </a>
            <SubmitButton 
                disable={createClientAccountButtonDisabled}
            >
                create account
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