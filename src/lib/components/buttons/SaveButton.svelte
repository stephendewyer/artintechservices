<script lang="ts">
    export let disable: boolean = false;
    export let saveClicked: boolean = false;

    const saveClickedHandler = () => {
        saveClicked = !saveClicked;
    };
    
</script>
<button 
    class={ disable ? "save_button_disabled" : "save_button" }
    type="button"
    on:click={saveClickedHandler}
    on:keyup={saveClickedHandler}
    disabled={disable}
>
    <div class="label">
        <slot/>
    </div>
</button>
<style>

    .save_button {
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

    .save_button_disabled {
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
        font-size: 1.5rem;
        border: 2px solid #7D7E8D;
        background-color: transparent;
        opacity: 50%;
    }

    .save_button:hover {
        color: #FFECEC;
        border-color: #B2A1A1;
        background-color: #B2A1A1;
    }

    .save_button:active {
        color:#D89679;
        border-color:#D89679;
    }

    @media all and (max-width: 751px){

        .save_button {
            margin: 0.2em auto;
            font-size: 18px;
        }

        .save_button_disabled {
            margin: 0.2em auto;
            font-size: 18px;
        }

    }

</style>