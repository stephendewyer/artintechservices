<script lang="ts">
    import ProfilePhotoDefault from "$lib/images/default/default_profile_photo.jpg";
    import OpenedButton from "../buttons/OpenedButton.svelte";
    import { page } from "$app/stores";
    import { MessagesStore } from "$lib/stores/MessagesStore";

    export let message: MessageWithContact;
    export let selectedMessageID: number | null = null;

    const sessionEmail = $page.data.streamed.user?.email;

    let opened: boolean = false;

    const clickCardHandler = () => {
        selectedMessageID = message.message_ID;

        if (!message.opened) {
            // update the message in database to show opened

            let updateMessageOpenedResponse;
            const updateMessageOpened = async (messageID: number | null, sessionEmail: string) => {
                const response = await fetch("/authenticated-client/api/updateMessageOpened", {
                    method: "PATCH",
                    body: JSON.stringify({
                        messageID,
                        sessionEmail
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                updateMessageOpenedResponse = await response.json();

                if (updateMessageOpenedResponse.ok) {
                    // update the message opened as opened in $MessagesStore
                    $MessagesStore.forEach((message: Message, index: number) => {
                        if (message.message_ID === selectedMessageID) {
                            $MessagesStore[index].opened = 1;
                        };
                    });
                };
                return updateMessageOpenedResponse;
            };

            try {
                updateMessageOpened(message.message_ID, sessionEmail)
            } catch(error) {
                console.log(error);
            };
        };

    };

    $: if (message.opened || message.message_ID === selectedMessageID) {
        opened = true;
    } else if (!message.opened) {
        opened = false;
    };

</script>

<button class="contact_card" on:click={clickCardHandler}>
    <div class="profile_photo_container" >
        <img 
            src={message.contact.image_URL ? message.contact.image_URL : ProfilePhotoDefault} 
            alt="contact profile"
        />
    </div>
    <div class="profile_message_name_and_history">
        <h4 class="profile_name">
            <span style="font-weight: normal">from: </span>{`${message.contact.name_first} ${message.contact.name_last}`}
        </h4>
        <p class="subject">
            subject: <span style="font-weight: bold">{message.subject.length > 8 ? `${message.subject.slice(0, 8)}...` : message.subject}</span>
        </p>
        <p class="date_sent">
            date sent: 
            <span style="font-weight: bold">
                {`${new Date(message.date_sent).toUTCString().split(',')[0]}., ${new Date(message.date_sent).toLocaleString().split(',')[0]}`}
            </span>
        </p>
         <p class="date_sent">
            time sent: 
            <span style="font-weight: bold">
                {new Date(message.date_sent).toLocaleString().split(',')[1].slice(1,13)}
            </span>
        </p>
    </div>
    <div class="close_button_container">
        <OpenedButton bind:opened />
    </div>
</button>

<style>

    .contact_card {
        position: relative;
        width: 100%;
        max-width: 30rem;
        padding: 0;
        margin: 0;
        border: none;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0 2rem 0 0;
        cursor: pointer;
        background-color: #F2F8E9;
        border-radius: 1rem;
        overflow: hidden;
        transition: box-shadow 0.2s linear;
    }

    .contact_card:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .profile_photo_container {
        width: 6rem;
        min-width: 6rem;
        height: 6rem;
    }

    .profile_photo_container > img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    .profile_message_name_and_history {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        padding-right: 1.5rem;
    }

    .profile_name {
        font-size: 1.2rem;
        text-align: left;
    }

    .subject {
        text-align: left;
        padding: 0;
        margin: 0;
        font-size: 1rem;
    }

    .date_sent {
        text-align: left;
        padding: 0;
        margin: 0;
        font-size: 0.9rem;
    }

    .close_button_container {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    }

    @media screen and (max-width: 1440px) {
        .profile_name {
            font-size: 1.1rem;
        }

        .date_sent {
            font-size: 0.8rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .profile_name {
            font-size: 1rem;
        }

        .subject {
            font-size: 0.9rem;
        }

        .date_sent {
            font-size: 0.8rem;
        }

    }


</style>