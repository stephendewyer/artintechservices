<script lang="ts">
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    
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
	<meta property="og:image" content="{ArtInTechServicesBanner}" />
    <meta property="og:url" content="https://artintechservices.vercel.app/reset-client-password" />
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
</div>

<style>

    .input_row {
        width: 100%;
        max-width: 28rem;
    }

</style>