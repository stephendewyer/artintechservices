<script lang="ts">
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";

    let emailIsValid: boolean = true;

    let emailInputValue: string = "";

    const sendEmailHandler = () => {

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
                disable={!emailIsValid}
            >
                send reset email
            </SubmitButton>
        </div>
    </form>
</div>

<style>

    .input_row {
        width: 100%;
        max-width: 28rem;
    }

</style>