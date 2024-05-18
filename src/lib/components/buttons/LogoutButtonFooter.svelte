<script lang="ts">
    import { signOut } from "@auth/sveltekit/client";
    import LogoutIcon from "$lib/images/icons/logout.svg?raw";
    export let callbackUrl: string;

</script>

<button 
    on:click={() => signOut({
        redirect: true,
        callbackUrl: `${callbackUrl}`
    })}
    class="button_external_link"
>
    <div class="external_link_icon" >
        {@html LogoutIcon}
    </div>
    <slot />
</button>

<style>
    .button_external_link {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        margin: 0;
        border-radius: 2em;
        border: solid 2px #FAE6D8;
        box-sizing: border-box;
        text-decoration: none;
        font-weight: 300;
        color: #FAE6D8;
        background: none;
        text-align: center;
        transition: all 0.2s ease-in-out;
        will-change: color;
        cursor: pointer;
    }

    .button_external_link > .external_link_icon {
        fill: #FAE6D8;
        will-change: fill;
        transition: fill 0.2s ease-in-out;
    }

    .button_external_link:hover > .external_link_icon {
        fill: #CFF5F8;
        will-change: fill;
        transition: fill 0.2s ease-in-out;
    }

    .button_external_link:hover {
        color: #CFF5F8;
        border: solid 2px #CFF5F8;
    }

    .external_link_icon {
        width: 20px;
    }

    @media screen and (max-width: 1080px) {
        .button_external_link {
            padding: 0.5rem 1rem;
            border: solid 1px #FAE6D8;
        }

        .button_external_link:hover {
            border: solid 1px #CFF5F8;
        }
    }

    @media screen and (max-width: 750px) {

        .external_link_icon {
            width: 15px;
        }

    }
</style>