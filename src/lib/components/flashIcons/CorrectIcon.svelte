<script lang="ts">
    import Checkmark from '$lib/images/icons/checkmark.svg?raw';

</script>

<div class="checkmark_container">
    {@html Checkmark} 
</div>

<style>

    .checkmark_container {
        border: none;
        fill: #FAE6D8;;
        background-color: #838B6A;
        width: 3rem;
        min-width: 3rem;
        height: 3rem;
        min-height: 3rem;
        border-radius: 3rem;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 1440px) {

        .checkmark_container {
            width: 2.5rem;
            min-width: 2.5rem;
            height: 2.5rem;
            min-height: 2.5rem;
            border-radius: 2.5rem;
            padding: 0.5rem;
        }

    }

    @media (max-width: 720px) {

        .checkmark_container {
            width: 2rem;
            min-width: 2rem;
            height: 2rem;
            min-height: 2rem;
            border-radius: 2rem;
            padding: 0.5rem;
        }
        
    }

</style>