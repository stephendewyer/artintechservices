<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_left.svg?raw";
</script>
<button class="cancel_button" type="button">
    <div class="arrow">
        {@html Arrow}
    </div>
    <div class="label">
        <slot/>
    </div>
</button>
<style>

    .cancel_button {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 2rem;
        border-radius:2em;
        color:#7D7E8D;
        text-align: center;
        transition: color 0.2s linear, background-color 0.2s linear, border-color 0.2s linear, margin-left 0.2s ease-out;
        cursor: pointer;
        font-size: 1.5rem;
        border: 0.16em solid #7D7E8D;
        background-color: transparent;
        margin-left: 0.5rem;
    }

    .cancel_button:hover {
        color: #FFECEC;
        border-color: #B2A1A1;
        background-color: #B2A1A1;
        margin-left: 0;
    }

    .cancel_button:active {
        color:#D89679;
        border-color:#D89679;
    }

    .arrow {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 0.75rem;
        min-width: 0.75rem;
        fill: #7D7E8D;
        transition: fill 0.2s linear, margin 0.2s ease-out;
        margin-right: 0;
    }

    .cancel_button:hover > .arrow {
        fill: #FFECEC;
        margin-right: 0.5rem;
    }

    @media all and (max-width: 751px){

        .cancel_button {
            margin: 0.2em auto;
            font-size: 18px;
        }

    }

</style>