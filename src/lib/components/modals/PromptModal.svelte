<script lang="ts">
    import { PromptStore } from '$lib/stores/PromptStore';
    import { ModalOpenStore } from '$lib/stores/ModalOpenStore';
    import CloseIcon from '$lib/images/icons/close_icon.svg?raw';

    const closeClickHandler = () => {

        $ModalOpenStore = false;

        $PromptStore = {message: null, data: null};

    }; 

    let promptOpen: boolean = false;

    $: if ($ModalOpenStore && ($PromptStore.message !== null)) {

        promptOpen = true;

    } else {

        promptOpen = false;

    };


</script>

<dialog open={promptOpen}
    class={(promptOpen) ? "dialog_open" : "dialog_closed"}
    aria-hidden={ (promptOpen) ? 'false' : 'true'}
>
    <div class="close_button_container">
        <button 
            class="close_button"
            on:click={() => closeClickHandler()}
            on:keyup={() => closeClickHandler()}
        >
            {@html CloseIcon}
        </button>
    </div>
    <div class="info_container">
        <h1 class="modal_heading">
            {$PromptStore.message}
        </h1>
        <h2 class="modal_heading_02">
            {$PromptStore.data}
        </h2>
    </div>
</dialog>

<style>

    dialog {
        z-index: 52;
        border: none;
        position: fixed;
        background-color: #F4F5FB;
        width: 100%;
        max-width: 40rem;
        margin: 0;
        padding: 1rem;
        top: 50%;
        left: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        flex-direction: column;
    }

    .dialog_open {
        display: flex;
    }

    .dialog_closed {
        display: none;
    }

    .close_button_container {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        display: flex;
        background-color: #F4F5FB;
        justify-content: flex-end;
    }

    .close_button {
        outline: none;
        border: none;
        background-color: transparent;
        fill: #838B6A;
        transition: fill 0.2s linear;
        width: 3rem;
        margin: 1rem;
        cursor: pointer;
    }

    .close_button:hover {
        fill: #706362;
    }

    .info_container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0 1rem;
    }

    .modal_heading{
        margin: 0;
        text-align: center;
    }

    .modal_heading_02 {
        margin: 0;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    
    @media (max-width: 1140px) {

        .close_button {
            width: 2rem;
            margin: 1rem;
        }

    }

    @media (max-width: 720px) {

    }

</style>