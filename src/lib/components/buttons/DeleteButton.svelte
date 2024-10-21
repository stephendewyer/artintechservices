<script lang="ts">
    import DeleteIcon from "$lib/images/icons/delete_icon.svg?raw";

    export let clicked: boolean = false;

</script>
<button 
    class="delete_button"
    on:click={() => clicked = true}
    on:keyup={() => clicked = true}
>
    <slot />
    <div class="delete_icon_container">
        {@html DeleteIcon}
    </div>
</button>

<style>
    .delete_button {
        display: inline-flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
        border: none;
        background: none;
        cursor: pointer;
        color: #424635;
        transition: color 0.2s linear;
        font-weight: bold;
    }

    .delete_button:hover {
        color: #838B6A;
    }

    .delete_button:hover > .delete_icon_container {
        fill: #838B6A;
    }

    .delete_icon_container {
        width: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        fill: #424635;
        transition: fill 0.2s linear;
    }
</style>