<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import TextArea from "$lib/components/inputs/TextArea.svelte";
    import type { E164Number } from 'svelte-tel-input/types';
    import PhoneInput from "$lib/components/inputs/PhoneInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton02.svelte";
    import TextInput from "$lib/components/inputs/TextInput.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";

    let nameFirstInputValue: string = "";
    let nameLastInputValue: string = "";
    let emailInputValue: string = "";
    let phoneInputValue: E164Number | null = null;
    let subjectInputValue: string = "";
    let messageInputValue: string = "";

    let nameFirstIsValid: boolean = true;
    let nameLastIsValid: boolean = true;
    let emailIsValid: boolean = true;
    let phoneIsValid: boolean = true;
    let subjectIsValid: boolean = true;
    let messageIsValid: boolean = true;

    // after submit
	let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000);
    };

    async function createMessage(
        email: string, 
        phone: E164Number | null,
        nameFirst: string, 
        nameLast: string, 
        subject: string, 
        message: string
    ) {	
        const response = await fetch("/api/sendMail", {

            method: 'POST',
            body: JSON.stringify({
                email,
                phone,
                nameFirst,
                nameLast,
                subject,
                message
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const sendMessageHandler = async () => {
        pending = true;

        try {

            await createMessage(
                emailInputValue,
                phoneInputValue,
                nameFirstInputValue,
                nameLastInputValue,
                subjectInputValue,
                messageInputValue
            );

            if (responseItem.success) {

                emailInputValue = "",
                nameFirstInputValue = "",
                nameLastInputValue = "",
                phoneInputValue = null,
                subjectInputValue = "",
                messageInputValue = ""
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

                if (subjectInputValue === "") {
                    subjectIsValid = false;
                } else if (subjectInputValue !== "") {
                    subjectIsValid = true;
                };

                if (messageInputValue === "") {
                    messageIsValid = false;
                } else if (messageInputValue !== "") {
                    messageIsValid = true;
                };
            };
        } catch (error) {
            console.log(error);
        };

    };

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };
    
</script>

<svelte:head>
	<title>Art in Tech Services - contact</title>
	<meta name="description" content="contact" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <form class="form" on:submit|preventDefault={sendMessageHandler}> 
        <h1>contact</h1>
        <h2>how can we help you?</h2>
        <h4 class="indicates_required_heading">indicates required*</h4>
        <div class="inputs_row">
            <div class="input_column">
                <TextInput 
                    placeholder="myFirstName"
                    inputID="name_first"
                    inputName="name_first"
                    inputLabel={true}
                    bind:textInputValue={nameFirstInputValue}
                    bind:isValid={nameFirstIsValid}
                    textInputErrorMessage="first name required"
                    required={true}
                >
                    first name*
                </TextInput>
            </div>
            <div class="input_column">
                <TextInput 
                    placeholder="myLastName"
                    inputID="name_last"
                    inputName="name_last"
                    inputLabel={true}
                    bind:textInputValue={nameLastInputValue}
                    bind:isValid={nameLastIsValid}
                    textInputErrorMessage="last name required"
                    required={true}
                >
                    last name*
                </TextInput>
            </div>        
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <EmailInput
                    placeholder="myname@mycompany.com"
                    inputID="email"
                    inputName="email"
                    inputLabel={true}
                    bind:emailInputValue={emailInputValue}
                    bind:isValid={emailIsValid}
                    required={true}
                >
                    email*
                </EmailInput>
            </div>
            <div class="input_column">
                <PhoneInput
                    inputID="phone_number"
                    inputName="phone_number"
                    inputLabel={true}
                    bind:phoneInputValue={phoneInputValue}
                    bind:isValid={phoneIsValid}
                    required={false}
                    phoneInputErrorMessage="phone number required"
                >
                    phone number
                </PhoneInput>
            </div>
            
        </div>
        <div class="inputs_row">
            <TextInput
                placeholder="help with my project"
                inputID="subject"
                inputName="subject"
                inputLabel={true}
                bind:textInputValue={subjectInputValue}
                bind:isValid={subjectIsValid}
                textInputErrorMessage="message subject required"
                required={true}
            >
                subject*
            </TextInput>
        </div>
        <div class="inputs_row">
            <TextArea
                placeholder="I have a project that needs ..."
                inputID="message"
                inputName="message"
                inputLabel={true}
                bind:textareaInputValue={messageInputValue}
                bind:isValid={messageIsValid}
                textAreaInputErrorMessage="message required"
                required={true}
            >
                message*
            </TextArea>
        </div>
        <div class="buttons_container">            
            <SubmitButton disable={false}>
                send message
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
    .buttons_container {
        display: flex;
        gap: 1rem;
        flex-direction: row;
        align-items: center;
    }

    @media screen and (max-width: 720px) {
        .buttons_container {
            flex-direction: column-reverse;
        }
    }
</style>