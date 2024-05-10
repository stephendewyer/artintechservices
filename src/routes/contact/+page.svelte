<script lang="ts">
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import TextArea from "$lib/components/inputs/TextArea.svelte";
    import type { E164Number } from 'svelte-tel-input/types';
    import PhoneInput from "$lib/components/inputs/PhoneInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import TextInput from "$lib/components/inputs/TextInput.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import Megaphone from "$lib/images/icons/contact_megaphone.svg?raw";

    let nameFirst: string = "";
    let nameLast: string = "";
    let email: string = "";
    let phone: E164Number | null = null;
    let subject: string = "";
    let message: string = "";

    let nameFirstIsValid: boolean = true;
    let nameLastIsValid: boolean = true;
    let emailIsValid: boolean = true;
    let phoneIsValid: boolean = true;
    let subjectIsValid: boolean = true;
    let messageIsValid: boolean = true;

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

    const sendMessageHandler = () => {

    };

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };
    
</script>

<svelte:head>
	<title>Art in Tech Services - contact</title>
	<meta name="description" content="contact" />
	<meta property="og:image" content="{ArtInTechServicesBanner}" />
    <meta property="og:url" content="https://artintechservices.vercel.app/contact" />
</svelte:head>

<div class="page">
    <form class="form" on:submit|preventDefault={sendMessageHandler}> 
        <h1>contact</h1>
        <div class="megaphone">
            {@html Megaphone}
        </div>
        <h2>how can we help you?</h2>
        <h4>*indicates requred</h4>
        <div class="inputs_row">
            <div class="input_column">
                <TextInput 
                    placeholder="myFirstName"
                    inputID="name_first"
                    inputName="name_first"
                    inputLabel={true}
                    textInputValue={nameFirst}
                    isValid={nameFirstIsValid}
                    textInputErrorMessage="first name required"
                    required={true}
                >
                    *first name
                </TextInput>
            </div>
            <div class="input_column">
                <TextInput 
                    placeholder="myLastName"
                    inputID="name_last"
                    inputName="name_last"
                    inputLabel={true}
                    textInputValue={nameLast}
                    isValid={nameLastIsValid}
                    textInputErrorMessage="last name required"
                    required={true}
                >
                    *last name
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
                    emailInputValue={email}
                    isValid={emailIsValid}
                    required={true}
                >
                *email
                </EmailInput>
            </div>
            <div class="input_column">
                <PhoneInput
                    inputID="phone_number"
                    inputName="phone_number"
                    inputLabel={true}
                    phoneInputValue={phone}
                    isValid={phoneIsValid}
                    required={true}
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
                textInputValue={subject}
                isValid={subjectIsValid}
                textInputErrorMessage="message subject required"
                required={true}
            >
                *subject
            </TextInput>
        </div>
        <div class="inputs_row">
            <TextArea
                placeholder="I have a project that needs ..."
                inputID="message"
                inputName="message"
                inputLabel={true}
                textareaInputValue={message}
                isValid={messageIsValid}
                textAreaInputErrorMessage="message required"
                required={true}
            >
                *message
            </TextArea>
        </div>
        <div class="buttons_container">
            <a href="/">
                <CancelButton>
                    cancel
                </CancelButton>
            </a>
            
            <SubmitButton disable={false}>
                send request
            </SubmitButton>
        </div>
    </form>
    {#if (pending)}
        <PendingFlashMessage >
            please wait while we validate your data
        </PendingFlashMessage>
    {:else if (item.error)}
        <ErrorFlashMessage >
            {item.error}
        </ErrorFlashMessage>
    {:else if (item.success)}
        <SuccessFlashMessage>
            {item.success}
        </SuccessFlashMessage>
    {/if}
</div>
<style>
    .megaphone {
        width: 8rem;
        fill: #36261E;
    }

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