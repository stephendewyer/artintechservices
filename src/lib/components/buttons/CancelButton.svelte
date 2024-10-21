<script lang="ts">
    export let disable: boolean = false;
    export let cancelClicked: boolean = false;

    const cancelClickedHandler = () => {
        cancelClicked = !cancelClicked;
    };
    
</script>
<button 
    class="cancel_button" 
    type="button"
    on:click={cancelClickedHandler}
    on:keyup={cancelClickedHandler}
    disabled={disable}
>
    <div class="label">
        <slot/>
    </div>
</button>
<style>

    .cancel_button {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        border-radius: 2rem;
        color:#7D7E8D;
        text-align: center;
        font-weight: bold;
        transition: color 0.2s linear, background-color 0.2s linear, border-color 0.2s linear, margin-left 0.2s ease-out;
        cursor: pointer;
        font-size: 1.5rem;
        border: 2px solid #7D7E8D;
        background-color: transparent;
    }

    .cancel_button:hover {
        color: #FFECEC;
        border-color: #B2A1A1;
        background-color: #B2A1A1;
    }

    .cancel_button:active {
        color:#D89679;
        border-color:#D89679;
    }

    @media all and (max-width: 751px){

        .cancel_button {
            margin: 0.2em auto;
            font-size: 18px;
        }

    }

</style>