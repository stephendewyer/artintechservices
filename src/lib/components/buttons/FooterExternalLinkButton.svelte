<script lang="ts">
    import ExternalLinkIcon from "$lib/images/icons/external_link_icon.svg?raw";
</script>

<button class="button_external_link">
    <slot />
    <div class="external_link_icon" >
        {@html ExternalLinkIcon}
    </div>
</button>

<style>
    .button_external_link {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
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
        margin-left: 8px;
    }

    @media screen and (max-width: 1080px) {
        .button_external_link {
            padding: 0.5rem 1rem;
            border: solid 1px #FAE6D8;
        }
    }

    @media screen and (max-width: 750px) {

        .external_link_icon {
            width: 15px;
            margin-left: 6px;
        }

    }
</style>
