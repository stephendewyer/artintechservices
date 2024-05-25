<script lang="ts">
    import { DeleteConfirmationStore } from '$lib/stores/DeleteConfirmationStore';
    import { DeleteConfirmedStore } from '$lib/stores/DeleteConfirmedStore';
    import { ModalOpenStore } from '$lib/stores/ModalOpenStore';
    import SubmitButton02 from '../buttons/SubmitButton02.svelte';
    import CloseIcon from '$lib/images/icons/close_icon.svg?raw';

    const closeClickHandler = () => {

        $ModalOpenStore = false;

        $DeleteConfirmationStore = {message: null, data: null};

    };    

    const deleteSubmitHandler = async () => {
        // confirm delete in store
        if ($DeleteConfirmationStore === null) {

            return;

        };

        $DeleteConfirmedStore = true;

        $ModalOpenStore = false;

        $DeleteConfirmationStore = {message: null, data: null};

    };

    let deleteConfirmationModalOpen: boolean = false;

    $: if ($ModalOpenStore && ($DeleteConfirmationStore.message !== null)) {

        deleteConfirmationModalOpen = true;

    } else {

        deleteConfirmationModalOpen = false;

    };


</script>

<dialog open={deleteConfirmationModalOpen}
    class={(deleteConfirmationModalOpen) ? "dialog_open" : "dialog_closed"}
    aria-hidden={ (deleteConfirmationModalOpen) ? 'false' : 'true'}
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
        <h1 class="modal_heading">confirm delete</h1>
        <h2 class="modal_heading_02">do you want to delete {$DeleteConfirmationStore?.message}?</h2>
        <form on:submit|preventDefault={deleteSubmitHandler}>
            <SubmitButton02 
                disable={false}
            >
                delete
            </SubmitButton02>
        </form>
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