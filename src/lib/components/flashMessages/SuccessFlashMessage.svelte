<div class="success_flash_message_container">
    <div class="success_flash_message">
        <p><slot/></p>
    </div>
</div>

<style>

    .success_flash_message_container {
        padding: 0 1rem 1rem 1rem;
        width: 100%;
    }

    .success_flash_message {
        background-color: #D1E9D1;
        color: #545D50;
        border: 2px solid #545D50;
        width: 100%;
        padding: 0.5rem 1rem;
        text-align: center;
    }
    
</style>