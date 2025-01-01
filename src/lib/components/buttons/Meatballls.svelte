<script lang="ts">
    import MeatBalls from "$lib/images/icons/meaballs.svg?raw";
    export let hovered: boolean = false;
    export let clicked: boolean = false;
</script>
<button 
    class="meatballs"
    on:click={() => clicked = true}
    style={hovered ? "fill: #d79679;": "fill: #36261E;"}
    on:keyup={() => clicked = true}
>
    {@html MeatBalls}
</button>
<style>

    .meatballs {
        width: 2.5rem;
        top: 0;
        right: 0;
        margin: 1rem;
        fill: #838B6A;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    @media screen and (max-width: 1920px) {
        .meatballs {
            width: 2rem;
            margin: 1rem;
        }
    }

    @media screen and (max-width: 750px) {
        .meatballs {
            width: 2rem;
            margin: 0.5rem;
        }
    }

</style>