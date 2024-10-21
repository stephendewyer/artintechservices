<script lang="ts">
    import ExternalLinkIcon from "$lib/images/icons/external_link_icon.svg?raw";

</script>
<button class="button_external_link">
    <div class="label_and_icon">
        <div class="label">
            <slot/>
        </div>
        <div class="icon">
            {@html ExternalLinkIcon}
        </div>
    </div>
</button>

<style>
    .button_external_link {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 2em;
        color: #F7EAE4;
        background-color: #171F29;
        text-align: center;
        transition: background-color 0.2s linear;
        cursor: pointer;
    }

    .label_and_icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .icon {
        fill: #F7EAE4;
        width: 2rem;
        height: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .button_external_link:hover {
        background-color: #79A5D8;
    }

    @media screen and (max-width: 720px) {

        .label_and_icon {
            gap: 0.5rem;
        }
        
        .icon {
            fill: #F7EAE4;
            width: 1.5rem;
            height: 1.5rem;
        }
    }
</style>