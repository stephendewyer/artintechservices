<script lang="ts">
    import ErrorIcon from "$lib/components/flashIcons/ErrorIcon.svelte";
</script>

<div class="error_message">
    <div class="error_icon_container">
        <ErrorIcon />
    </div>
    <slot />
</div>

<style>
    .error_message {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        color: #9F1D20;
        font-size: 1.5rem;
        padding: 0.25rem 1rem;
        hyphens: auto;
    }

    .error_icon_container {
        width: 3rem;
    }

    @media (max-width: 1440px) {
        .error_message {
            font-size: 1.25rem;
            padding: 0.25rem 1rem;
        }

        .error_icon_container {
            width: 2.5rem;
        }
    }

    @media (max-width: 720px) {
        .error_message {
            font-size: 1rem;
            padding: 0.25rem 1rem;
        }

        .error_icon_container {
            width: 2rem;
        }
    }
</style>