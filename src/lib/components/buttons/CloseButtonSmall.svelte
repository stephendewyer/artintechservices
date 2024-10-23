<script lang="ts">
    import CloseIcon from "$lib/images/icons/close_icon.svg?raw";
    export let closeButtonClicked: boolean = false;

</script>

<button 
    on:click={() => closeButtonClicked = true}
    on:keyup={() => closeButtonClicked = true}
    class="cancel_button"
>
    {@html CloseIcon}
</button>
<style>
    .cancel_button {
        cursor: pointer;
        fill: #36261E;
        width: 1.25rem;
        min-width: 1.25rem;
        margin: 0 0.5rem 0 0;
        background-color: transparent;
        border: none;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        padding: 0;
        transition: fill 0.3s linear;
    }

    .cancel_button:hover {
        fill: #CB6D44;
    }

    @media screen and (max-width: 720px) {

    }
</style>