<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw";
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
    <div class="arrow">
        {@html Arrow}
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
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        will-change: color, background-color, margin;
        transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, margin-right 0.2s ease-in-out;
        margin-right: 0.5rem;
    }

    .call_to_action_button:hover {
        color: #DEDDD5;
        background-color: #706362;
        margin-right: 0;
    }

    .label {
        font-size: 1.5rem;
        text-align: left;
        font-weight: bold;
        
    }

    .arrow {
        margin-left: 0;
        width: 0.75rem;
        min-width: 0.75rem;
        will-change: margin, fill;
        transition: margin 0.2s ease-in-out, fill 0.2s ease-in-out;
        display: flex;
        flex-direction: column;
        align-items: center;
        fill: #FAE6D8;
    }

    .call_to_action_button:hover > .arrow {
        margin-left: 0.5rem;
        fill: #DEDDD5;
    }

    button[disabled] {
        pointer-events: none;
        opacity: 50%;
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