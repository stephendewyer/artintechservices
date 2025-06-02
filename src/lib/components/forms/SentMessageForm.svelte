<script lang="ts">
    import DocumentFileButton from "../buttons/DocumentFileButton.svelte";

    export let message: MessageWithContact;

</script>

<form class="received_message_form">
    <div class="received_message">
        <p class="date">
            {`${new Date(message.date_sent).toUTCString().split(',')[0]}., ${new Date(message.date_sent).toLocaleString().split(',')[0]}, ${new Date(message.date_sent).toLocaleString().split(',')[1].slice(1,13)}`}
        </p>
        <p class="subject">
            <span class="heading">
                subject: 
            </span><br />
            {message.subject}
        </p>
        <p class="message_paragraphs">
            <span class="heading">
                message: 
            </span><br/>
            {message.body}
        </p>
        <span class="heading" style="text-align: left; width: 100%;">
            attachments: 
        </span><br/>
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
</form>

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

    .heading {
        font-weight: 600;
        font-size: 1rem;
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