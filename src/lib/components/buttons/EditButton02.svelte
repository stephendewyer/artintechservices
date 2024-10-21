<script lang="ts">
    import EditIcon from "$lib/images/icons/edit_icon.svg?raw";

    export let clicked: boolean = false;
</script>
<button 
    on:click={() => clicked = !clicked}
    on:keyup={() => clicked = !clicked}
>
    <slot />
    <div class="edit_icon">
        {@html EditIcon}
    </div>
</button>
<style>

    button {
        border: none;
        background: none;
        display: flex;
        margin: 0;
        padding: 0;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-weight: bold;
        font-size: 1.25rem;
        transition: color 0.2s linear;
        color: #424635;
        display: inline-flex;
    }

    button:hover {
        color: #838B6A;
    }

    .edit_icon {
        width: 1.5rem;
        transition: fill 0.2s linear;
        fill: #424635;
    }

    button:hover > .edit_icon {
        fill: #838B6A;
    }
</style>