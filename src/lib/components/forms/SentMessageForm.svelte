<script lang="ts">
    import PendingFlashMessage from "../flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "../flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "../flashMessages/SuccessFlashMessage.svelte";
    import AttachmentImage from "$lib/images/projects/Port_Mansfield_pier.jpg"
    import DocumentFileButton from "../buttons/DocumentFileButton.svelte";
    import SendMessageForm from "./CreateMessageForm.svelte";
    import Checkbox from "../inputs/Checkbox.svelte";

    export let deletedMessage: boolean = false;

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

    let permanentlyDeleteMessageValueChanged: boolean = false;
    let permanentlyDeleteMessageChecked: boolean = false;
    let permanentlyDeleteMessageValue: string = "";

    let restoreDeletedMessageValueChanged: boolean = false;
    let restoreDeletedMessageChecked: boolean = false;
    let restoreDeletedMessageValue: string = "";

</script>

<form class="sent_message_form">
    <div class="sent_message">
        <p class="date">
            yesterday, 23 September 2024
        </p>
        <p class="label">
            subject
        </p>
        <p class="message_paragraphs">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Tortor quis sagittis ullamcorper auctor, dictum fringilla neque.
        </p>
        <p class="label">
            message
        </p>
        <p class="message_paragraphs">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus facilisi condimentum pellentesque neque risus eget pharetra orci. Vestibulum ante torquent leo nam purus curabitur ad porttitor. Interdum morbi dis dictumst auctor eget magna lacinia vestibulum. Feugiat vitae ad fringilla platea dictum suspendisse ullamcorper. Varius aliquet nunc dolor curabitur mi praesent! Odio euismod torquent ligula tempor egestas facilisis elementum elementum.<br/><br/>
            Ullamcorper dis fusce congue praesent hendrerit condimentum. Habitant id iaculis accumsan lacinia a. Proin tincidunt dapibus urna congue blandit primis. Consectetur tempus molestie facilisi blandit cursus metus lacus tempor. Magnis iaculis mus tempus inceptos ut integer. Donec non aliquet suscipit elit vivamus aliquet diam. Enim porta id suspendisse finibus risus ligula. Bibendum duis fermentum congue potenti libero.
        </p>
        <div class="attachments">
            <div class="image_attachment">
                <img src={AttachmentImage} alt="attachment" />
            </div>
            <div class="document_attachment">
                <DocumentFileButton documentURL={"/file name/test"} />
            </div>
        </div>
    </div>
    {#if deletedMessage}
        <div class="deleted_message_options">
            <Checkbox 
                bind:valueChanged={permanentlyDeleteMessageValueChanged}
                bind:checked={permanentlyDeleteMessageChecked}
                bind:value={permanentlyDeleteMessageValue}
            >
                permanently delete message?
            </Checkbox>
            <Checkbox 
                bind:valueChanged={restoreDeletedMessageValueChanged}
                bind:checked={restoreDeletedMessageChecked}
                bind:value={restoreDeletedMessageValue}
            >
                restore message?
            </Checkbox>
        </div>
    {:else}
        <div class="forward">
            <SendMessageForm reply={false} forward={true}/>
        </div>
    {/if}
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
    .sent_message_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .sent_message {
        background-color: #F2F9F2;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
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

    .label {
        font-size: 1.4rem;
        font-weight: 600;
        color: #1C2226;
        padding: 0 0 0.5rem 0;
        width: 100%;
        margin: 0;
    }

    .message_paragraphs {
        padding: 0;
        margin: 0;
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

    .forward {
        background-color: #F2F9F2;
        width: 100%;
    }

    .deleted_message_options {
        background-color: #F2F9F2;
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: 1rem;
        justify-content: space-evenly;
    }

    @media screen and (max-width: 1440px) {
        .label {
            font-size: 1.2rem;
            padding: 0 0 0.4rem 0;
        }

        .date {
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 720px) {
        .label {
            font-size: 1rem;
            padding: 0 0 0.3rem 0;
        }

        .date {
            font-size: 0.8rem;
        }
    }

</style>