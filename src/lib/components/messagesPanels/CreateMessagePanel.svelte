<script lang="ts">
    import SearchInput from "../inputs/SearchInput.svelte";
    import TextInput from "../inputs/TextInput.svelte";
    import TextArea from "../inputs/TextArea.svelte";
    import AttachDocumentButton from "../buttons/AttachDocumentButton.svelte";
    import AttachImageButton from "../buttons/AttachImageButton.svelte";
    import SubmitButton02 from "../buttons/SubmitButton02.svelte";
    import PendingFlashMessage from "../flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "../flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "../flashMessages/SuccessFlashMessage.svelte";
    import ContactCard from "../cards/ContactCard.svelte";
  import ConsultationCard from "../cards/ConsultationCard.svelte";

    let searchContactInputValue: string = "";
    let searchContactValueChange: boolean = false;

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
<section class="create_message">
    <div class="search_and_select_contact">
        <form class="search_and_select_contact_form">
            <SearchInput
                placeholder="firstname lastname"
                inputID="contact_or_subject_search"
                inputName="contact_or_subject_search"
                inputLabel={true}
                bind:searchInputValue={searchContactInputValue}
                bind:searchInputValueChange={searchContactValueChange}
            >
                contact
            </SearchInput>
            <ul class="selected_contacts">
                <li>
                    <ContactCard />
                </li>
            </ul>
            <ul class="contacts_in_search">
                <li>
                    <ContactCard />
                </li>
            </ul>
        </form>
    </div>
    <div class="send_message_form_container">
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
                    send
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
    </div>
</section>
<style>

    .create_message {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .search_and_select_contact {
        width: 50%;
        max-width: 30rem;
    }

    .send_message_form_container {
        background-color: #F2F9F2;
        width: 100%;
        padding: 1rem;
    }

    .send_message_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
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

    .search_and_select_contact_form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .selected_contacts {
        position: relative;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .selected_contacts > li {
        position: relative;
        padding: 0 0 0 1rem;
    }

    .selected_contacts > li::before {
        --size: 6px;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom:0;
		border: var(--size) solid transparent;
		border-left: 6px solid #3D3832;
		overflow: visible;
    }

    .contacts_in_search {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .contacts_in_search > li {
        position: relative;
        padding: 0 0 0 1rem;
    }

    @media screen and (max-width: 720px) {
        .create_message {
            flex-direction: column;
        }

        .search_and_select_contact {
            width: 100%;
        }
    }

</style>