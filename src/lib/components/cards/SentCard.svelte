<script lang="ts">
    import ProfilePhotoDefault from "$lib/images/default/default_profile_photo.jpg";
    import OpenedButton from "../buttons/OpenedButton.svelte";
    import SentIcon from "$lib/images/icons/send_icon.svg?raw";

    export let message: MessageWithContact;
    export let selectedMessageID: number | null = null;

    let opened: boolean = message.opened === 1 ? true : false;

    console.log(message)

    const clickCardHandler = () => {
        selectedMessageID = message.message_ID;
    };

</script>

<button class="contact_card" on:click={clickCardHandler}>
    <div class="profile_photo_container">
        <img src={message.contact.image_URL ? message.contact.image_URL : ProfilePhotoDefault} alt="contact profile"/>
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
        <div class="sent_icon_container">
            <div class="sent_icon">
                {@html SentIcon}
            </div>
        </div>
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

    .sent_icon_container{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .sent_icon {
        width: 1.5rem;
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