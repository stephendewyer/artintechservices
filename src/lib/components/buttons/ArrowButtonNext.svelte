<script lang="ts">
        import ArrowRight from "$lib/images/arrows/arrow_right.svg?raw";

        export let nextBtnEnabled: boolean = true;
        export let arrowNextClicked: boolean = false;

        const scrollNextClickHandler = () => {
            arrowNextClicked = true;
        }

</script>

<button
    id="arrow_right_button"
    on:click={() => scrollNextClickHandler()} 
    on:keyup={() => scrollNextClickHandler()} 
    disabled={!nextBtnEnabled} 
    class={nextBtnEnabled ? "arrow_button_active": "active_button_disabled"}
>
    <div class="arrow_container">
        {@html ArrowRight}
    </div>
</button>

<style>
    #arrow_right_button {
        margin: 0;
        transition: opacity 0.2s linear, box-shadow 0.2s linear;
        position: relative;
        padding: 1rem;
        color: #838b6a;
        fill: #838b6a;
        background: rgb(244,254,242);
        background: linear-gradient(90deg, rgba(244,254,242,0) 0%, rgba(244,254,242,1) 35%, rgba(244,254,242,1) 100%);
        border: none;
        border-radius: 50%;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        pointer-events: all;
    }

    #arrow_right_button:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .arrow_button_active {
        display: inline-flex;
    }

    .active_button_disabled {
        display: none;
    }

    .arrow_container {
        width: 1rem;
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: color 0.3s linear, fill 0.3s linear;
    }

    .arrow_button_active:hover > .arrow_container {
        color: #d79679;
        fill: #d79679;
    }

    @media screen and (max-width: 720px) {
        .arrow_button_active {
            padding: 0.75rem;
        }

        .arrow_container {
            min-width: 0.75rem;
        }
    }
</style>