<script lang="ts">
    import SearchInput from "../inputs/SearchInput.svelte";
    import ContactCard from "../cards/ContactCard.svelte";
    import CreateMessageForm from "../forms/CreateMessageForm.svelte";
    import { onMount } from "svelte";
    import LoadingSpinner from "../loadingSpinners/LoadingSpinner.svelte";

    let searchContactInputValue: string = "";
    let searchContactValueChange: boolean = false;

    // get administrators' contact information

    let pendingAdministratorsContactInfo: boolean = false;

    let getAdministratorsContactInfoSuccess: boolean = false;

    let administratorsContactInfo: Contact[] = [];

    const getAdministratorsContactInfo = async () => {

        pendingAdministratorsContactInfo = true;

        try {

            const response = await fetch("/authenticated-client/api/getAdministratorsContactInfo");

            administratorsContactInfo = [...await response.json()];

            if (response.ok) {
                pendingAdministratorsContactInfo = false;
                getAdministratorsContactInfoSuccess = true;
            } else if (!response.ok) {
                pendingAdministratorsContactInfo = false;
                getAdministratorsContactInfoSuccess = false;
            };
        } catch(err) {
            pendingAdministratorsContactInfo = false;
            getAdministratorsContactInfoSuccess = false;
            console.log(err);
        };
        
    };

    onMount(() => {
        getAdministratorsContactInfo();
    });

    let selectedContactID: number | null = null;

    let selectedContact: Contact;

    $: administratorsContactInfo.forEach((administratorContact => {
        if (administratorContact.ID === selectedContactID) {
            selectedContact = administratorContact;
        };
    }));

</script>
<section class="create_message">
    <div class="search_and_select_contact">
        <form class="search_and_select_contact_form">
            <!-- <SearchInput
                placeholder="firstname lastname"
                inputID="contact_or_subject_search"
                inputName="contact_or_subject_search"
                inputLabel={true}
                bind:searchInputValue={searchContactInputValue}
                bind:searchInputValueChange={searchContactValueChange}
            >
                contact
            </SearchInput> -->
            <h3 style="text-align: center">contacts</h3>
            {#if pendingAdministratorsContactInfo}
                <LoadingSpinner />
            {:else}
                <ul class="selected_contacts">
                    {#each administratorsContactInfo as administrator, index}
                        <li class={ selectedContactID === administrator.ID ? "contact_active" : "contact_inactive"}>
                            <ContactCard contact={administrator} bind:selectedContactID={selectedContactID} />
                        </li>
                    {/each}
                </ul>
            {/if}
        </form>
    </div>
    <div class="send_message_form_container">
        <CreateMessageForm reply={false} forward={false} contact={selectedContact}/>
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
        width: 100%;
    }
    
    .search_and_select_contact_form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .selected_contacts {
        position: relative;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .selected_contacts > li {
        position: relative;
        padding: 0 0 0 1rem;
    }

    .contact_active::before {
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


    @media screen and (max-width: 720px) {
        .create_message {
            flex-direction: column;
        }

        .search_and_select_contact {
            width: 100%;
        }
    }

</style>