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
    type="button"
>
    <div class="close_icon">
        {@html CloseIcon}    
    </div>
</button>
<style>
    
    .close_button {
        outline: none;
        background-color: #E4C5B9;
        border-radius: 100%;
        border: solid 2px #4C4239;
        transition: border-color 0.2s linear;
        padding: 0.75rem;
        margin: 1rem;
        cursor: pointer;
        display: inline-flex;
    }

    .close_button:hover {
        border-color: #9F1D20;
    }

    .close_icon {
        width: 2rem;
        height: 2rem;
        fill: #4C4239;
        transition: fill 0.2s linear;
    }

    .close_button:hover > .close_icon {
        fill: #9F1D20;
    }

    @media screen and (max-width: 1440px) {
        .close_icon {
            width: 1.75rem;
            height: 1.75rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .close_icon {
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    @media screen and (max-width: 720px) {
        .close_icon {
            width: 1.25rem;
            height: 1.25rem;
        }
    }


</style>