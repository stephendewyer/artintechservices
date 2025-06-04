<script lang="ts">
    import CloseButtonSmall from "../buttons/CloseButtonSmall.svelte";
    import ProfilePhotoDefault from "$lib/images/default/default_profile_photo.jpg";

    export let contact: Contact;
    export let selected: boolean = false;
    export let closeContactClicked: boolean = false;
    export let selectedContactID: number | null = null;
    export let disableClose: boolean = false;
    export let messageID: number | null = null;
    export let selectedMessageID: number | null = null;
    export let subject: string = "";

    const clickCardHandler = () => {

        // handle if no message saved

        if (messageID === null) {
            if (
                selected === false && 
                closeContactClicked === false && 
                selectedContactID !== contact.ID
            ) {
                selected = true;
                selectedContactID = contact.ID;
                selectedMessageID = messageID;
            } else {
                closeContactClicked = false;
            };
        } else if (messageID) {
            // handle if message saved
            selected = false;
            
            if (
                selected === false && 
                closeContactClicked === false && 
                selectedMessageID !== messageID
            ) {
                selected = true;
                selectedContactID = contact.ID;
                selectedMessageID = messageID;
            } else {
                closeContactClicked = false;
            };

        }; 
        
    };

    $: if (selectedContactID === null) {
        selected = false;
    };

    $: if (closeContactClicked) {
        selected = false;
        selectedContactID = null;
    };

</script>

<button class="contact_card" on:click={clickCardHandler}>
    <div class="profile_photo_container">
        <img src={contact.image_URL ? contact.image_URL : ProfilePhotoDefault} alt="contact profile"/>
    </div>
    <div class="profile_message_name_and_history">
        <p class="subject">
            subject: <span style="font-weight: bold">{subject.length > 8 ? `${subject.slice(0, 8)}...` : subject}</span>
        </p>
        <h4 class="profile_name">
            {`${contact.name_first} ${contact.name_last}`}
        </h4>
        <p class="date_sent">
            role: <span style="font-weight: bold">{contact.role}</span>
        </p>
        <p class="date_sent">
            {`${contact?.city}, ${contact?.state}`}
        </p>
    </div>
    {#if selected && !disableClose}
        <div class="close_button_container">
            <CloseButtonSmall bind:closeButtonClicked={closeContactClicked} />
        </div>
    {/if}
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

    .subject {
        text-align: left;
        padding: 0;
        margin: 0;
        font-size: 1rem;
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

    .date_sent {
        text-align: left;
        padding: 0;
        margin: 0;
        font-size: 1rem;
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
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .profile_name {
            font-size: 1rem;
        }

        .date_sent {
            font-size: 0.8rem;
        }

    }


</style>