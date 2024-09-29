<script lang="ts">
    import ArrowLeft from "$lib/images/arrows/arrow_left.svg?raw";

    export let prevBtnEnabled: boolean = true;
    export let arrowPrevClicked: boolean = false;

    const scrollPreviousClickHandler = () => {
        arrowPrevClicked = true;
    }

</script>

<button
    id="arrow_left_button"
    on:click={() => scrollPreviousClickHandler()} 
    on:keyup={() => scrollPreviousClickHandler()} 
    disabled={!prevBtnEnabled} 
    class={prevBtnEnabled ? "arrow_button_active" : "arrow_button_disabled"}
>
    <div class="arrow_container">
        {@html ArrowLeft}
    </div>
</button>

<style>

    #arrow_left_button {
        position: relative;
        padding: 1rem;
        color: #838b6a;
        fill: #838b6a;
        background: rgb(244,254,242);
        background: linear-gradient(90deg, rgba(244,254,242,1) 0%, rgba(244,254,242,1) 65%, rgba(244,254,242,0) 100%);
        border-radius: 50%;
        border: none;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        margin: 0;
        transition: opacity 0.2s linear, box-shadow 0.2s linear;
    }

    #arrow_left_button:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .arrow_button_disabled {
        display: none;
    }

    .arrow_button_active {
        display: flex;
        opacity: 100%;
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