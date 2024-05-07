<script lang="ts">
    import Checkmark from '$lib/images/icons/checkmark.svg?raw';

</script>

<div class="checkmark_container">
    {@html Checkmark} 
</div>

<style>

    .checkmark_container {
        border: 3px solid #7BC83F;
        fill: #7BC83F;
        background-color: #D8EAC5;
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 1440px) {

        .checkmark_container {
            border: 2px solid #7BC83F;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 1.25rem;
            padding: 0.4rem;
        }

    }

    @media (max-width: 720px) {

        .checkmark_container {
            border: 2px solid #7BC83F;
            width: 2rem;
            height: 2rem;
            border-radius: 1rem;
            padding: 0.3rem;
        }
        
    }

</style>