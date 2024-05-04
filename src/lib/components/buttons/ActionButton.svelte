<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw";

    export let action: Action;

</script>

<a href={action.pathname}>
    <button class="action_button">
        <div class="action_image_and_label">
            <div class="image_container">
                {@html  action.image}
            </div>
            <h3 class="label_container">
                {action.label} 
            </h3>
        </div>
        <div class="arrow_container">
            {@html Arrow}
        </div>
    </button>
</a>

<style>
    .action_button {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin: 0 1rem 0 0;
        transition: margin 0.3s ease-out;
    }

    .action_button:hover {
        margin: 0;
    }

    .action_button:hover > .arrow_container {
        margin: 0 0 0 1rem;
        fill: #81D0D9;
    }

    .action_button:hover > .action_image_and_label > .label_container {
        color: #81D0D9;
    }

    .action_image_and_label {
        width: 10rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .image_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 10rem;
        width: 100%;
        color: #36261E;
        fill: #36261E;
    }

    .label_container {
        width: 100%;
        transition: color 0.3s ease-out;
    }

    .arrow_container {
        width: 2.5rem;
        fill: #D79679;
        transition: margin 0.3s ease-out, fill 0.3s linear;
    }

    @media screen and (max-width: 1080px) {

        .arrow_container {
            width: 1.75rem;
        }

    }

    @media screen and (max-width: 720px) {

        .action_button {
            gap: 0.5rem;
        }
        .action_button:hover {
            margin: 0 0.5rem 0 0;
        }

        .action_image_and_label {
            gap: 0.5rem;
        }

        .action_button:hover > .arrow_container {
            margin: 0 0 0 0.5rem;
        }

        .label_container {
            width: auto;
        }

        .arrow_container {
            width: 1.25rem;
            min-width: 1.25rem;
        }

    }

</style>
