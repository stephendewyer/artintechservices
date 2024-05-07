<script lang="ts">
    import CorrectIcon from '$lib/components/flashIcons/CorrectIcon.svelte';

</script>

<div class="passwords_match_container">
    <CorrectIcon />
    <slot />
</div>

<style>
    .passwords_match_container {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
        color: #545D50;
        font-size: 1.5rem;
        padding: 0 1rem;
    }

    @media (max-width: 1440px) {
        .passwords_match_container {
            font-size: 1.25rem;
        }
    }

    @media (max-width: 720px) {
        .passwords_match_container {
            font-size: 1rem;
        }
    }
</style>