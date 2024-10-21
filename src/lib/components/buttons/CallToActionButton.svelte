<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw";
</script>
<button class="call_to_action_button">
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
        padding: 0.75rem 1.5rem;
        border-radius: 2rem;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        will-change: color, margin, background-color;
        transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, margin 0.2s ease-in-out;
        margin-right: 0.75rem;
    }

    .call_to_action_button:hover {
        color: #DEDDD5;
        background-color: #706362;
        margin-right: 0rem;
    }

    .label {
        font-size: 1.5rem;
        text-align: left;
        font-weight: bold;
        
    }

    .arrow {
        fill: #FAE6D8;
        min-width: 1rem;
        width: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 0;
        will-change: fill, margin;
        transition: fill 0.2s ease-in-out, margin 0.2s ease-in-out;
    }

    .call_to_action_button:hover > .arrow {
        margin-left: 0.75rem;
        fill: #DEDDD5;
    }

    @media screen and (max-width: 1440px) {
        .label {
            font-size: 1.35rem;
            width: 100%;
            max-width: 14rem;     
        }

        .arrow {
            min-width: 0.8rem;
            width: 0.8rem;
        }

        .call_to_action_button:hover > .arrow {
            margin-left: 0.625rem;
        }

        .call_to_action_button {
            margin-right: 0.625rem;
        }

        .call_to_action_button:hover {
            margin-right: 0rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .label {
            font-size: 1.2rem;    
            max-width: 12rem;             
        }

        .arrow {
            min-width: 0.7rem;
            width: 0.7rem;
        }

        .call_to_action_button:hover > .arrow {
            margin-left: 0.5rem;
        }

        .call_to_action_button {
            margin-right: 0.5rem;
        }
    }

    @media screen and (max-width: 720px) {
        .label {
            font-size: 1.05rem;     
            max-width: 10rem;            
        }
        .arrow {
            min-width: 0.6rem;
            width: 0.6rem;
        }
    }

</style>