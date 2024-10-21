<script lang="ts">
    export let clicked = false;
    export let disable: boolean = false;

</script>
<button 
    on:click={() => clicked = true}
    on:keyup={() => clicked = true}
    class="call_to_action_button"
    type="submit"
    disabled={disable}
>
    <div class="label">
        <slot />
    </div>
</button>

<style>
    .call_to_action_button {
        border: none;
        color: #FAE6D8;
        background: #838B6A;
        position: relative;
        padding: 1rem 1.75rem;
        border-radius: 2rem;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        will-change: color, background-color;
        transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    }

    .call_to_action_button:hover {
        color: #DEDDD5;
        background-color: #706362;
    }

    .label {
        font-size: 1.5rem;
        text-align: left;
        font-weight: bold;
        
    }

    button[disabled] {
        opacity: 50%;
        pointer-events: none;
    }

    @media screen and (max-width: 1440px) {
        .label {
            font-size: 1.35rem;
            width: 100%;
            max-width: 14rem;     
        }
    }

    @media screen and (max-width: 1080px) {
        .label {
            font-size: 1.2rem;    
            max-width: 12rem;             
        }
    }

    @media screen and (max-width: 720px) {
        .label {
            font-size: 1.05rem;     
            max-width: 10rem;            
        }
    }

</style>