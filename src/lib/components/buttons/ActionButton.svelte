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
        background-color: #171F29;
        border: none;
        cursor: pointer;
        margin: 0 1rem 0 0;
        transition: margin 0.3s ease-out;
        border-radius: 3rem;
        padding: 1rem 2rem;
    }

    .action_button:hover {
        margin: 0;
    }

    .action_button:hover > .arrow_container {
        margin: 0 0 0 1rem;
        fill: #CCD9D3;
    }

    .action_button:hover > .action_image_and_label > .label_container {
        color: #CCD9D3;
    }

    .action_button:hover > .action_image_and_label > .image_container {
        fill: #CCD9D3;
    }

    .action_image_and_label {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    .image_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 5.5rem;
        width: 5.5rem;
        padding: 0.5rem;
        color: #D79679;
        fill: #D79679;
        transition: fill 0.3s ease-out;
    }

    .label_container {
        color: #D79679;
        transition: color 0.3s ease-out;
        text-align: left;
        width: 14rem;
    }

    .arrow_container {
        width: 1.5rem;
        fill: #D79679;
        transition: margin 0.3s ease-out, fill 0.3s linear;
    }

    @media screen and (max-width: 1440px) {

        .image_container {
            height: 5rem;
            width: 5rem;
        }

        .label_container {
            width: 10rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .image_container {
            height: 4.5rem;
            width: 4.5rem;
        }

        .label_container {
            width: 8rem;
        }

        .arrow_container {
            width: 1.25rem;
        }

    }

    @media screen and (max-width: 720px) {

        .action_button {
            padding: 0.5rem 1rem;
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
            width: 6rem;
        }

        .image_container {
            height: 4rem;
            width: 4rem;
        }

        .arrow_container {
            width: 1rem;
            min-width: 1rem;
        }

    }

</style>
