<script lang="ts">
    import CloseIcon from "$lib/images/icons/close_icon.svg?raw";

    export let closeButtonClicked:boolean = false;

    const closeClickHandler = () => {
        closeButtonClicked = !closeButtonClicked;
    };

</script>
<button 
    class="close_button"
    on:click={() => closeClickHandler()}
    on:keyup={() => closeClickHandler()}
>
    {@html CloseIcon}
</button>
<style>
    
    .close_button {
        outline: none;
        border: none;
        background-color: transparent;
        fill: #4C4239;
        transition: fill 0.2s linear;
        width: 3rem;
        margin: 1rem;
        cursor: pointer;
    }

    .close_button:hover {
        fill: #CB6D44;
    }

    @media screen and (max-width: 1080px) {

        .close_button {
            width: 2rem;
            margin: 1rem;
        }
    }


</style>