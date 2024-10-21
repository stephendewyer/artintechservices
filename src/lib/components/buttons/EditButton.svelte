<script lang="ts">
    import EditIcon from "$lib/images/icons/edit_icon.svg?raw";

    export let editClicked: boolean = false;

    const editClickedHandler = () => {
        editClicked = !editClicked;
    };

</script>

<button 
    type="button"
    class="box_button"
    on:click={editClickedHandler}
    on:keyup={editClickedHandler}
>
    <slot />
    <div 
        class="edit_icon"
    >
        {@html EditIcon}
    </div>
</button>

<style>
    .box_button {
        display:inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border: 2px solid #424635;
        text-decoration: none;
        color: #424635;
        background-color: #EFD5C9;
        text-align: center;
        cursor: pointer;
        outline: none;
        transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out, background-color 0.2s ease-in-out, margin-right 0.2s ease-in-out;
        will-change: color border-color background-color margin-right;
    }

    .box_button:hover {
        color:#838B6A;
        border-color:#838B6A;
        background-color: #EFD5C9;
    }

    .box_button:hover > .edit_icon {
        fill: #838B6A;
    }

    .box_button:active {
        color:#D89679;
        border-color:#D89679;
    }

    .edit_icon {
        width: 1.25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        fill: #424635;
        margin-left: 0;
        will-change: margin-left, fill;
        transition: margin-left 0.2s ease-in-out, fill 0.2s ease-in-out;
    }

@media screen and (max-width:750px){
    .box_button {
        border: 1px solid #424635;
    }

    .box_button:hover {
        border: 1px solid #838B6A;
    }
}

</style>