<div class="pending_flash_message_container">
    <div class="pending_flash_message">
        <p><slot/></p>
    </div>
</div>


<style>

    .pending_flash_message_container {
        padding: 0 1rem 1rem 1rem;
        width: 100%;
    }

    .pending_flash_message {
        background-color: #E1E4E9;
        color: #15060B;
        border: 2px solid #15060B;
        width: 100%;
        padding: 0.5rem 1rem;
        text-align: center;
    }
    
</style>