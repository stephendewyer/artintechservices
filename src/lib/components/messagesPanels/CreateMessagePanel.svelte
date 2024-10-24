<script lang="ts">
    import SearchInput from "../inputs/SearchInput.svelte";
    import ContactCard from "../cards/ContactCard.svelte";
    import SendMessageForm from "../forms/SendMessageForm.svelte";

    let searchContactInputValue: string = "";
    let searchContactValueChange: boolean = false;

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
        <SendMessageForm reply={false} forward={false}/>
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