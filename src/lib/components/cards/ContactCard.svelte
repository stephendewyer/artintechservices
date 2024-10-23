<script lang="ts">
    import AdminProfile from "$lib/images/team/stephen_garrett_dewyer/stephen_dewyer_10_cropped_square.jpg";
    import CloseButtonSmall from "../buttons/CloseButtonSmall.svelte";

    export let selected: boolean = false;
    export let closeContactClicked: boolean = false;

    const clickCardHandler = () => {
        if (selected === false && closeContactClicked === false) {
            selected = true;
        } else {
            closeContactClicked = false;
        };
        
    };

    $: if (closeContactClicked) {
        selected = false;
    };

</script>

<button class="contact_card" on:click={clickCardHandler}>
    <div class="profile_photo_container">
        <img src={AdminProfile} alt="contact profile"/>
    </div>
    <div class="profile_message_name_and_history">
        <h4 class="profile_name">
            contact name
        </h4>
        <p class="date_sent">
            yesterday, 23 September 2024
        </p>
        <p class="starting_subject">
            I need help with...
        </p>
    </div>
    {#if selected}
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
        font-weight: 600;
        font-size: 1rem;
    }

    .starting_subject {
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

        .starting_subject {

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

        .starting_subject {

            font-size: 0.8rem;
        }
    }


</style>