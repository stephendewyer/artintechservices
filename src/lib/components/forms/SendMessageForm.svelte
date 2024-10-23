<script lang="ts">
    import TextInput from "../inputs/TextInput.svelte";
    import TextArea from "../inputs/TextArea.svelte";
    import AttachDocumentButton from "../buttons/AttachDocumentButton.svelte";
    import AttachImageButton from "../buttons/AttachImageButton.svelte";
    import SubmitButton02 from "../buttons/SubmitButton02.svelte";
    import PendingFlashMessage from "../flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "../flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "../flashMessages/SuccessFlashMessage.svelte";

    export let reply: boolean = false;

    let subjectIsValid: boolean = true;
    let subjectInputValue: string = "";

    let messageInputValue: string = "";
    let messageIsValid: boolean = true;

    // after submit
	let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    let pendingMessageSent: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000);
    };

    let attachDocumentClicked: boolean = false;
    let attachImageClicked: boolean = false;
</script>

<form class="send_message_form"> 
    <TextInput
        textInputErrorMessage="subject required"
        bind:isValid={subjectIsValid}
        placeholder="I need project X to do Y"
        inputID="subject"
        inputName="subject"
        bind:textInputValue={subjectInputValue}
        inputLabel={true}
        required={true}
    >
        subject*
    </TextInput>
    <TextArea
        placeholder="The project is doing X and I need Y to ..."
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
    <div class="attach_items">
        <div class="attach_document">
            <AttachDocumentButton bind:attachDocumentClicked={attachDocumentClicked} />    
        </div>
        <div class="attach_image">
            <AttachImageButton bind:attachImageClicked={attachImageClicked}/>
        </div>
    </div>
    <div class="send_button">
        <SubmitButton02>
            {#if reply}
                reply
            {:else}
                send
            {/if}
        </SubmitButton02>
    </div>
</form>
{#if (pendingMessageSent)}
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

<style>
    .send_message_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        background-color: #F2F9F2;
        padding: 1rem;
    }

    .attach_items {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 1rem;
    }

    .attach_image {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .attach_document {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }


</style>