<script lang="ts">
    import PendingFlashMessage from "../flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "../flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "../flashMessages/SuccessFlashMessage.svelte";
    import AttachmentImage from "$lib/images/projects/Port_Mansfield_pier.jpg"
    import DocumentFileButton from "../buttons/DocumentFileButton.svelte";
    import SendMessageForm from "./CreateMessageForm.svelte";

    export let message: MessageWithContact;

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

<form class="received_message_form">
    <div class="received_message">
        <p class="date">
            {new Date(message.date_sent).toUTCString()}
        </p>
        <p class="subject">
            <span style="font-weight: 600">subject: </span>{message.subject}
        </p>
        <p class="message_paragraphs">
            <span class="subject" style="font-weight: 600">message: </span><br/>
            {message.body}
        </p>
        <div class="attachments">
            <div class="image_attachment">
                {#if message.image_attachment_ID}
                    <img src={message.image_attachment_URL} alt="attachment" />
                {/if}
            </div>
            <div class="document_attachment">
                {#if message.document_attachment_ID}
                    <DocumentFileButton documentURL={message.document_attachment_URL} />
                {/if}
            </div>
        </div>
    </div>
    <div class="reply">
        <SendMessageForm reply={true} forward={false}/>
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
    .received_message_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
    }

    .received_message {
        background-color: #F2F9F2;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .date {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
        margin: 0;
    }

    .subject {
        font-size: 1.4rem;
        color: #1C2226;
        padding: 0;
        width: 100%;
        margin: 0;
    }

    .message_paragraphs {
        padding: 0;
        margin: 0;
        width: 100%;
    }

    .attachments {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        gap: 1rem;
    }

    .image_attachment {
        width: 10rem;
        height: 10rem;
    }

    .image_attachment > img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    .document_attachment {
        width: auto;
    }

    .reply {
        background-color: #FFF3ED;
        width: 100%;
    }

    @media screen and (max-width: 1440px) {


        .date {
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 720px) {

        .date {
            font-size: 0.8rem;
        }
    }

</style>