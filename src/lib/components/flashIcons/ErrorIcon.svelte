<script lang="ts">

</script>

<div class="error_icon_container">

    <p>!</p>

</div>

<style>

    .error_icon_container {
        border: none;
        color: #FDDFD2;
        font-weight: 600;
        background-color: #914732;
        min-height: 3rem;
        min-width: 3rem;
        width: 3rem;
        height: 3rem;
        border-radius: 3rem;
        padding: 0.5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 1440px) {

        .error_icon_container {
            width: 2.5rem;
            min-width: 2.5rem;
            height: 2.5rem;
            min-height: 2.5rem;
            border-radius: 1.25rem;
            padding: 0.5rem;
        }
        
    }

    @media (max-width: 720px) {

        .error_icon_container {
            min-width: 2rem;
            width: 2rem;
            min-height: 2rem;
            height: 2rem;
            border-radius: 1rem;
            padding: 0.5rem;
        }
        
    }

</style>