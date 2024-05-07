<script lang="ts">

</script>

<div class="error_icon_container">

    <p>!</p>

</div>

<style>

    .error_icon_container {
        border: 3px solid #9F1D20;
        color: #9F1D20;
        font-weight: 600;
        background-color: #E4C5B9;
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        padding: 0.5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 1440px) {

        .error_icon_container {
            border: 2px solid #9F1D20;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 1.25rem;
            padding: 0.4rem;
        }
        
    }

    @media (max-width: 720px) {

        .error_icon_container {
            border: 2px solid #9F1D20;
            width: 2rem;
            height: 2rem;
            border-radius: 1rem;
            padding: 0.3rem;
        }
        
    }

</style>