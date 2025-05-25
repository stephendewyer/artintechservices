<script lang="ts">
    import ClosedEye from "$lib/images/icons/closed_eye_icon.svg?raw";
    import OpenEye from "$lib/images/icons/open_eye_icon.svg?raw";
    import OpenedMail from "$lib/images/icons/open_mail_icon.svg?raw";
    import UnopenedMail from "$lib/images/icons/email_icon.svg?raw";

    export let opened: boolean = false;

</script>    
<button 
    class="toggle_password_visibility_button"
    on:click={() => opened = !opened}
    on:keyup={() => opened = !opened}
    type="button"
>
    {#if (opened)}
        {@html OpenedMail}
    {:else}
        {@html UnopenedMail}
    {/if}
</button>

<style>
    .toggle_password_visibility_button {
        position: relative;
        height: 100%;
        width: 3.5rem;
        padding: 0.25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        fill: #36261E;
        transition: fill 0.3s linear;
        background: none;
        border: none;
        cursor: pointer;
    }

    .toggle_password_visibility_button:hover {
        fill: #838B6A;
    }
</style>