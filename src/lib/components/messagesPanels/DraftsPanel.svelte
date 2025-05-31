<script lang="ts">
    import { onMount } from "svelte";
    import ContactCard from "../cards/ContactCard.svelte";
    // import SearchInput from "../inputs/SearchInput.svelte";
    import CreateMessageForm from "../forms/CreateMessageForm.svelte";

    export let panel_data;

    // order saved messages from latest to earliest times sent

    let sortedMessages: MessageWithContact[] = [];

    $: sortedMessages = panel_data.length > 0 ? panel_data.sort((a: any, b: any) => a.date_sent - b.date_sent) : [];

    let selectedContact: Contact;
    let selectedMessageID: number | null  = null;

    onMount(() => {
        selectedContact = sortedMessages[0]?.contact;

        selectedMessageID = sortedMessages[0]?.message_ID;
    });

    $: sortedMessages.forEach((message: MessageWithContact) => {
        if (message.message_ID === selectedMessageID) {
            selectedContact = message.contact;
        };
    });

</script>

<section class="drafts">
    <div class="search_and_select_messages">
        <h3 style="text-align: center">drafts</h3>
        <ul class="drafts_cards">
            {#each sortedMessages as message, index}
                <li class={ selectedMessageID === message.message_ID ? "message_active" : "message_inactive"} >
                    <ContactCard 
                        contact={message.contact} 
                        bind:selectedMessageID
                        messageID={message.message_ID}
                        disableClose={true}
                    />
                </li>
            {/each}
        </ul>
    </div>
    <div class="received_message_form_container">
        {#each sortedMessages as message, index}
            {#if message.message_ID === selectedMessageID}
                {#key message}
                    <CreateMessageForm 
                        message={message}
                        reply={false} 
                        selectedContactID={selectedContact.ID}
                        contact={message.contact}
                    />
                {/key}
            {/if}
        {/each}
    </div>
</section>
<style>

    .drafts {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .search_and_select_messages {
        width: 50%;
        max-width: 30rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .received_message_form_container {
        width: 100%;
    }

    .drafts_cards {
        position: relative;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 40rem;
        overflow: auto;
    }

    .drafts_cards > li {
        position: relative;
        padding: 0 0 0 1rem;
    }

    .message_active::before {
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


    @media screen and (max-width: 1080px) {
        .drafts {
            flex-direction: column;
        }

        .drafts_cards {
            max-height: 15rem;
        }

         .search_and_select_messages {
            width: 100%;
            max-width: 100%;
        }
    }


</style>