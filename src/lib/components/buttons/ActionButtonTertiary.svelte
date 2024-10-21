<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw"
    export let parentControlled: boolean = false;
    export let hovered: boolean = false;

    const buttonHoveredHandler = () => {
        if (!parentControlled) {
            hovered = true;
        } else {
            hovered = hovered;
        };
    };

    const buttonExitedHandler = () => {
        if (!parentControlled) {
            hovered = false;
        } else {
            hovered = hovered;
        };
    };

</script>

<button 
    type="button"
    id="box_button"
    class={hovered ? "box_button_active" : "box_button_inactive"} 
    on:focus={buttonHoveredHandler}
    on:mouseenter={buttonHoveredHandler}
    on:mouseover={buttonHoveredHandler}
    on:mouseleave={buttonExitedHandler}
    on:mouseout={buttonExitedHandler}
    on:blur={buttonExitedHandler}
>
    <slot />
    <div 
        id="arrow"
        class={hovered ? "arrow_active" : "arrow_inactive"}
    >
        {@html Arrow}
    </div>
</button>

<style>
    #box_button {
        display:inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border: none;
        text-decoration: none;
        background: none;
        text-align: left;
        cursor: pointer;
        outline: none;
        transition: color 0.2s ease-in-out, margin-right 0.2s ease-in-out;
        will-change: color margin-right;
    }

    .box_button_active {
        color:#838B6A;
        margin-right: 0;
    }

    .box_button_inactive {
        color: #424635;
        margin-right: 0.5rem;
    }

    #arrow {
        width: 0.75rem;
        min-width: 0.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        will-change: margin-left, fill;
        transition: margin-left 0.2s ease-in-out, fill 0.2s ease-in-out;
    }

    .arrow_active {
        margin-left: 0.5rem;
        fill: #838B6A;
    }

    .arrow_inactive {
        margin-left: 0;
        fill: #424635;
    }

    @media screen and (max-width: 1440px) {
        #box_button {
            font-size: 1.25rem;
        }
    }

    @media screen and (max-width: 1080px) {
        #box_button {
            font-size: 1rem;
        }
    }

    @media screen and (max-width:750px){
        #box_button {
            font-size: 0.85rem;
        }
    }

</style>