<script lang="ts">
    import TextInput from "../inputs/TextInput.svelte";
    import TextArea from "../inputs/TextArea.svelte";
    import AttachDocumentButton from "../buttons/AttachDocumentButton.svelte";
    import AttachImageButton from "../buttons/AttachImageButton.svelte";
    import SubmitButton02 from "../buttons/SubmitButton02.svelte";
    import PendingFlashMessage from "../flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "../flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "../flashMessages/SuccessFlashMessage.svelte";
    import { page } from "$app/stores";
    import DocumentFileInput from "../inputs/DocumentFileInput.svelte";
    import ImageFileInput from "../inputs/ImageFileInput.svelte";
    import CloseButton from "../buttons/CloseButton.svelte";
    import SaveButton from "../buttons/SaveButton.svelte";
    import { onMount } from "svelte";
    import LoadingSpinner from "../loadingSpinners/LoadingSpinner.svelte";
    import { UpdateMessagesStore } from "$lib/stores/UpdateMessagesStore";

    export let selectedContactID: number | null = null;
    export let contact: Contact | null = null;
    export let reply: boolean = false;
    export let replyToMessageID: number | null = null;
    export let conversationID: number | null = null;
    export let message: Message | null = null;

    const sessionEmail = $page.data.streamed.user?.email;

    let subjectIsValid: boolean = true;
    let subjectInputValue: string = message?.subject ? message.subject : "";

    let messageInputValue: string = message?.body ? message.body : "";
    let messageIsValid: boolean = true;

    let imageFileInputValue: string = "";
    let imageFileIsValid: boolean = true;

    let imageInputElement: HTMLInputElement;

    let imageInputFiles: FileList | null = null;

    let imageID: number | null = message?.image_attachment_ID ? message.image_attachment_ID : null;

    let imagePublicID: string | null = message?.image_attachment_public_ID ? message.image_attachment_public_ID : null;

    let deleteImage: boolean = false;

    let documentID: number | null = message?.document_attachment_ID ? message.document_attachment_ID : null;

    let documentPublicID: string | null = message?.document_attachment_public_ID ? message.document_attachment_public_ID : null;
    
    let deleteDocument: boolean = false;

    let documentInputElement: HTMLInputElement;

    let documentInputFiles: FileList | null = null;
    
    let image: any = message?.image_attachment_URL ? message.image_attachment_URL : "";

    let documentFileInputValue: string = "";
    let documentFileIsValid: boolean = true;
    let document: any = message?.document_attachment_URL ? message.document_attachment_URL : "";

    let messageID: number | null = message?.message_ID ? message.message_ID : null;

    let pendingGetMessage: boolean = false;

    let savedMessage: Message;

    const getMessage = async (messageID: number | null, sessionEmail: string) => {
        pendingGetMessage = true;
        try {
            const response = await fetch("/authenticated-client/api/getMessage", {
                method: "POST",
                body: JSON.stringify({
                    messageID,
                    sessionEmail
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                savedMessage = await response.json();
                pendingGetMessage = false;
            };
            
        } catch (error) {
            console.log(error);
        };

        return savedMessage;
    };

    onMount(() => {
        if (messageID !== null) {
            // getMessage(messageID, sessionEmail);
        };
    });

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
        }, 4000);
    };

    $: if((responseItem.success) || (responseItem.error)) {
        pendingMessageSent = false;
        pendingMessageSaved = false;
    };

    let disableCreateMessageButton: boolean = false;

    $: if (subjectInputValue === "" || messageInputValue === "" || !selectedContactID) {
        disableCreateMessageButton = true;
    } else {
        disableCreateMessageButton = false;
    };

    let pendingMessageSent: boolean = false;

    const sendMessage = async (
        conversationID: number | null,
        replyToMessageID: number | null,
        messageID: number | null,
        sessionEmail: string,
        contact: Contact | null,
        subjectInputValue: string,
        messageInputValue: string,
        imageFileInputValue: string,
        image: any,
        imageID: number | null,
        imagePublicID: string | null,
        deleteImage: boolean,
        documentID: number | null,
        document: any,
        documentFileInputValue: string,
        documentPublicID: string | null,
        deleteDocument: boolean
    ) => {	
        const response = await fetch("/authenticated-client/api/createMessage", {

            method: 'POST',
            body: JSON.stringify({
                conversationID,
                replyToMessageID,
                messageID,
                sessionEmail,
                contact,
                subjectInputValue,
                messageInputValue,
                imageFileInputValue,
                image,
                imageID,
                imagePublicID,
                deleteImage,
                documentID,
                document,
                documentFileInputValue,
                documentPublicID,
                deleteDocument
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const handleSendMessageSubmit = async () => {
        pendingMessageSent = true;

        try {

            await sendMessage(
                conversationID,
                replyToMessageID,
                messageID,
                sessionEmail,
                contact,
                subjectInputValue,
                messageInputValue,
                imageFileInputValue,
                image,
                imageID,
                imagePublicID,
                deleteImage,
                documentID,
                document,
                documentFileInputValue,
                documentPublicID,
                deleteDocument
            );

            if (responseItem.success) {
                // deactive selected contact card
                selectedContactID = null;
                contact = null;
                // clear fields
                conversationID = null;
                replyToMessageID = null;
                messageID = null;
                subjectInputValue = "";
                messageInputValue = "";
                imageFileInputValue = "",
                image = "",
                imageID = null,
                imagePublicID = null,
                deleteImage = false,
                documentID = null,
                document = "",
                documentFileInputValue = "",
                documentPublicID = null,
                deleteDocument = false
            };

            if (responseItem.error) {
                console.log("failed to send message");
            };
        } catch (error) {
            console.log(error);
        };
    };

    const saveMessage = async (
        conversationID: number | null,
        replyToMessageID: number | null,
        messageID: number | null,
        sessionEmail: string,
        contact: Contact | null,
        subjectInputValue: string,
        messageInputValue: string,
        imageFileInputValue: string,
        image: any,
        imageID: number | null,
        imagePublicID: string | null,
        deleteImage: boolean,
        documentID: number | null,
        document: any,
        documentFileInputValue: string,
        documentPublicID: string | null,
        deleteDocument: boolean
    ) => {	
        const response = await fetch("/authenticated-client/api/saveMessage", {

            method: 'POST',
            body: JSON.stringify({
                conversationID,
                replyToMessageID,
                messageID,
                sessionEmail,
                contact,
                subjectInputValue,
                messageInputValue,
                imageFileInputValue,
                image,
                imageID,
                imagePublicID,
                deleteImage,
                documentID,
                document,
                documentFileInputValue,
                documentPublicID,
                deleteDocument
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    let pendingMessageSaved: boolean = false;

    const handleSaveMessageClicked = async () => {
        pendingMessageSaved = true;

        try {

            await saveMessage(
                conversationID,
                replyToMessageID,
                messageID,
                sessionEmail,
                contact,
                subjectInputValue,
                messageInputValue,
                imageFileInputValue,
                image,
                imageID,
                imagePublicID,
                deleteImage,
                documentID,
                document,
                documentFileInputValue,
                documentPublicID,
                deleteDocument
            );

            if (responseItem.success) {
                $UpdateMessagesStore = true;
            };

            if (responseItem.error) {
                console.log("failed to save message");
            };
        } catch (error) {
            console.log(error);
        };
    };


    $: if (saveClicked) {
        // save the message in the database
        handleSaveMessageClicked();
        // get updated messages
        saveClicked = false;
    };

    let attachDocumentClicked: boolean = documentID ? true : false;
    let attachImageClicked: boolean = imageID ? true : false;

    $: if (!attachImageClicked) {
        imageFileInputValue = "";
        image = "";
    };

    $: if (!attachDocumentClicked) {
        documentFileInputValue = "";
        document = "";
    };

    let saveClicked: boolean = false;
    let disableSaveButton: boolean = false;

    $: if ((subjectInputValue !== "" || messageInputValue !== "") && selectedContactID) {
        disableSaveButton = false;
    } else {
        disableSaveButton = true;
    };

</script>
{#if pendingGetMessage}
    <LoadingSpinner />
{:else}
    <form class="send_message_form" on:submit|preventDefault={handleSendMessageSubmit}> 
        <h3>{#if reply}reply{:else}create{/if}</h3>
    
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
                {#if !attachDocumentClicked && !document}
                    <AttachDocumentButton bind:attachDocumentClicked={attachDocumentClicked} />
                {:else if (attachDocumentClicked)}
                    {#if !document}
                        <div class="close_button_container">
                            <CloseButton bind:closeButtonClicked={attachDocumentClicked}/>
                        </div>
                    {/if}
                    <div class="input_container_toggle">
                        <DocumentFileInput
                            inputLabel={true}
                            bind:documentFileInputValue={documentFileInputValue}
                            bind:document={document}
                            placeholder="/project-brief.pdf"
                            inputName="project_document_file"
                            inputID="project_document_file"
                            bind:files={documentInputFiles}
                            bind:documentFileInputElement={documentInputElement}
                            bind:isValid={documentFileIsValid}
                            bind:deleteDocument
                            required={false}
                            documentFileInputErrorMessage="document file required"
                        >
                            document file
                        </DocumentFileInput>
                    </div>
                {/if}
            </div>
            <div class="attach_image">
                {#if (!attachImageClicked && !image)}
                    <AttachImageButton bind:attachImageClicked={attachImageClicked}/>
                {:else if (attachImageClicked || image)}
                    {#if !image}
                        <div class="close_button_container">
                            <CloseButton bind:closeButtonClicked={attachImageClicked}/>
                        </div>
                    {/if}
                    <div class="input_container_toggle">
                        <ImageFileInput
                            inputLabel={true}
                            bind:imageFileInputValue={imageFileInputValue}
                            bind:image={image}
                            placeholder="/image.jpg"
                            inputName="project_image_file"
                            inputID="project_image_file"
                            bind:files={imageInputFiles}
                            bind:imageFileInputElement={imageInputElement}
                            bind:isValid={imageFileIsValid}
                            bind:deleteImage
                            required={false}
                            imageFileInputErrorMessage="image file required"
                        >
                            image file
                        </ImageFileInput>
                    </div>                
                {/if}
            </div>
        </div>
        <div class="send_button">
            <SaveButton bind:saveClicked bind:disable={disableSaveButton}>
                save
            </SaveButton>
            <SubmitButton02 disable={disableCreateMessageButton}>
                send
            </SubmitButton02>
        </div>
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
    </form>
    
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
        position: relative;
    }

    .attach_document {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .close_button_container {
        position: absolute;
        right: 0;
        top: 0;
    }

    .input_container_toggle {
        width: 100%;
        padding: 2rem 0 0 0;
    }

    @media screen and (max-width: 1080px) {
        .attach_items {
            flex-direction: column;
            width: 100%;
            align-items: center;
        }

        .attach_image {
            width: 100%;
        }

        .attach_document {
            width: 100%;
        }
        
    }

</style>