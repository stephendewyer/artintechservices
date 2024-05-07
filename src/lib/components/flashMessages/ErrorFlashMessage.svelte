<div class="error_flash_message_container">
    <div class="error_flash_message">
        <p><slot/></p>
    </div>
</div>

<style>

    .error_flash_message_container {
        padding: 0 1rem 1rem 1rem;
        width: 100%;
    }

    .error_flash_message {
        background-color: #E4C5B9;
        color: #9F1D20;
        border: 2px solid #9F1D20;
        width: 100%;
        padding: 0.5rem 1rem;
        text-align: center;
    }

</style>