<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw";

    let buttonHovered = false;

</script>

<button 
    id="next_button"
    class={buttonHovered ? "button_hovered" : "button_inactive"}
    on:mouseover={() => {
        buttonHovered = true;
    }} 
    on:focus={() => {
        buttonHovered = true;
    }}
    on:blur={() => {
        buttonHovered = false;
    }}
    on:mouseout={() => {
        buttonHovered = false;
    }}
>
    <div class="button_labels">
        <div class="top_label">
            next case study
        </div>
        <div class="bottom_label">
            <slot/>
        </div>
    </div>
    <div 
        id="arrow_container"
        class={ (buttonHovered) ? 'arrow_container_hovered' : 'arrow_container_inactive'}
    >
        {@html Arrow}
    </div>
</button>

<style>

    #next_button {
        padding: 0;
        display: inline-flex;
        flex-direction: row;
        background: none;
        border: none;
        cursor: pointer;
        gap: 1rem;
        will-change: margin-right, color;
        transition: margin-right 0.33s ease-out, color 0.33s ease-out;
    }

    .button_hovered {
        margin: 0 0 0 0;
        color: #7D7E8D;
    }

    .button_inactive {
        margin: 0 1rem 0 0;
    }

    .button_labels {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .top_label {
        font-size: 1.25rem;
        text-align: right;
        width: 100%;
    }

    .bottom_label {
        font-size: 1.75rem;
        text-align: right;
        width: 100%;
    }

    #arrow_container {
        width: 1rem;
        min-width: 1rem;
        will-change: margin-left, color;
        transition: margin-left 0.33s ease-out, fill 0.33s ease-out;
    }

    .arrow_container_inactive {
        margin: auto auto auto 0;
    }

    .arrow_container_hovered {
        margin: auto auto auto 1rem;
        fill: #7D7E8D;
    }

@media screen and (max-width: 1440px) {
    .top_label {
        font-size: 1.125rem;
    }

    .bottom_label {
        font-size: 1.625rem;
    }

    #arrow_container {
        width: 0.9rem;
        min-width: 0.9rem;
    }

    .button_inactive {
        margin-right: 0.75rem;
    }

    .arrow_container_hovered {
        margin: auto auto auto 0.75rem;
    }
}

@media screen and (max-width: 1080px) {
    .top_label {
        font-size: 1.075rem;
    }

    .bottom_label {
        font-size: 1.5rem;
    }

    #arrow_container {
        width: 0.8rem;
        min-width: 0.8rem;
    }

    .button_inactive {
        margin-right: 0.625rem;
    }

    .arrow_container_hovered {
        margin: auto auto auto 0.625rem;
    }
}

@media (max-width: 750px) {
    .top_label {
        font-size: 1rem;
    }

    .bottom_label {
        font-size: 1.175rem;
    }

    #arrow_container {
        width: 0.7rem;
        min-width: 0.7rem;
    }

    .button_inactive {
        margin-right: 0.5rem;
    }

    .arrow_container_hovered {
        margin: auto auto auto 0.5rem;
    }

}
</style>