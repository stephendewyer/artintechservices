<script lang="ts">
    // import SearchInput from "../inputs/SearchInput.svelte";
    import InboxCard from "../cards/InboxCard.svelte";
    import ReceivedMessageForm from "../forms/ReceivedMessageForm.svelte";

    export let panel_data;
    // console.log("panel_data: ", panel_data);

    // let searchContactInputValue: string = "";
    // let searchContactValueChange: boolean = false;

    const fakeMessages: MessageWithContact[] = [
        {
            message_ID: 1,
            client_sender_ID: null,
            client_recipient_ID: 29,
            administrator_sender_ID: 1,
            administrator_recipient_ID: null,
            sender_role: 'administrator',
            receiver_role: 'client',
            date_created: '2025-05-09T01:09:50.000Z',
            date_sent: '2025-05-09T01:09:50.000Z',
            subject: 'test 1',
            body: 'test 1',
            document_attachment_ID: 21,
            image_attachment_ID: 48,
            status: 'sent',
            conversation_ID: 0,
            opened: 0,
            image_attachment_URL: 'https://res.cloudinary.com/dj1pzr9gj/image/upload/v1746749388/messages/xzm1tjbyb4n0caisw0xc.jpg',
            image_attachment_public_ID: 'messages/xzm1tjbyb4n0caisw0xc',
            document_attachment_URL: 'https://res.cloudinary.com/dj1pzr9gj/image/upload/v1746749389/messages/moqs5u5py83mpfxynov9.pdf',
            document_attachment_public_ID: 'messages/moqs5u5py83mpfxynov9',
            contact: {
                ID: 1,
                email: 'sdewyer@artintechservices.com',
                name_first: 'stephen',
                name_last: 'dewyer',
                city: 'Tucson',
                state: 'Arizona',
                role: "administrator",
                profile_image_ID: 36,
                image_URL: 'https://res.cloudinary.com/dj1pzr9gj/image/upload/v1730502908/profile_images_administrators/efpwdeqilhbedifsnqhy.jpg',
                public_ID: 'profile_images_administrators/efpwdeqilhbedifsnqhy'
            }
        },
            {
            message_ID: 2,
            client_sender_ID: null,
            client_recipient_ID: 29,
            administrator_sender_ID: 1,
            administrator_recipient_ID: null,
            sender_role: 'administrator',
            receiver_role: 'client',
            date_created: '2025-05-09T01:09:50.000Z',
            date_sent: new Date(),
            subject: 'test 2ddddddddddddddddddddddddd',
            body: 'test 2',
            document_attachment_ID: 21,
            image_attachment_ID: 48,
            status: 'sent',
            conversation_ID: 0,
            opened: null,
            image_attachment_URL: 'https://res.cloudinary.com/dj1pzr9gj/image/upload/v1746749388/messages/xzm1tjbyb4n0caisw0xc.jpg',
            image_attachment_public_ID: 'messages/xzm1tjbyb4n0caisw0xc',
            document_attachment_URL: 'https://res.cloudinary.com/dj1pzr9gj/image/upload/v1746749389/messages/moqs5u5py83mpfxynov9.pdf',
            document_attachment_public_ID: 'messages/moqs5u5py83mpfxynov9',
            contact: {
                ID: 1,
                email: 'sdewyer@artintechservices.com',
                name_first: 'stephen',
                name_last: 'dewyer',
                city: 'Tucson',
                state: 'Arizona',
                role: "administrator",
                profile_image_ID: 36,
                image_URL: 'https://res.cloudinary.com/dj1pzr9gj/image/upload/v1730502908/profile_images_administrators/efpwdeqilhbedifsnqhy.jpg',
                public_ID: 'profile_images_administrators/efpwdeqilhbedifsnqhy'
            }
        }
    ];

    // order received message from latest to earliest times sent

    const sortedMessages: MessageWithContact[] = fakeMessages.sort((a: any, b: any) => a.date_sent - b.date_sent);

    let selectedMessageID: number | null = sortedMessages[0].message_ID;

</script>

<section class="inbox">
    <div class="search_and_select_messages">
        <h3 style="text-align: center">conversations</h3>
        <ul class="inbox_cards">
            {#each sortedMessages as message, index}
                <li class={ selectedMessageID === message.message_ID ? "message_active" : "message_inactive"} >
                    <InboxCard 
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
                    <ReceivedMessageForm message={message} />
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

         .search_and_select_messages {
            width: 100%;
            max-width: 100%;
        }

        .inbox_cards {
            max-height: 15rem;
        }
    }


</style>