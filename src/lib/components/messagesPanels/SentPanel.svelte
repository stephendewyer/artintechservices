<script lang="ts">
    // import SearchInput from "../inputs/SearchInput.svelte";
    import SentCard from "../cards/SentCard.svelte";
    import SentMessageForm from "../forms/SentMessageForm.svelte";

    export let panel_data;
    // console.log("panel_data: ", panel_data);

    // let searchContactInputValue: string = "";
    // let searchContactValueChange: boolean = false;
    // order received message from latest to earliest times sent

    const sortedMessages: MessageWithContact[] = panel_data.sort((a: any, b: any) => a.date_sent - b.date_sent);

    let selectedMessageID: number | null = sortedMessages[0].message_ID;

</script>

<section class="inbox">
    <div class="search_and_select_messages">
        <h3 style="text-align: center">conversations</h3>
        <ul class="inbox_cards">
            {#each sortedMessages as message, index}
                <li class={ selectedMessageID === message.message_ID ? "message_active" : "message_inactive"} >
                    <SentCard 
                        message={message} 
                        bind:selectedMessageID
                    />
                </li>
            {/each}
        </ul>
    </div>
    <div class="received_message_form_container">
        {#each sortedMessages as message, index}
            {#if message.message_ID === selectedMessageID}
                {#key message}
                    <SentMessageForm message={message} />
                {/key}
            {/if}
        {/each}
    </div>
</section>
<style>

    .inbox {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
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
        max-width: 60rem;
    }
    

    .inbox_cards {
        position: relative;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        height: auto;
        max-height: 40rem;
        overflow: auto;
    }

    .inbox_cards > li {
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
        .inbox {
            flex-direction: column;
        }


        .inbox_cards {
            max-height: 15rem;
        }

         .search_and_select_messages {
            width: 100%;
            max-width: 100%;
        }
    }


</style>