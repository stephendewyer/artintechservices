<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw";

    export let service: ServiceWithID;

</script>
<a href={service.pathname}>
    <button class="service_button">
        <div class="icon_and_label">
            <div class="service_icon_container">
                {@html service.image}
            </div>
            <h3 class="service_label">
                {service.label}
            </h3> 
        </div>
        <div class="arrow_container">
            {@html Arrow}
        </div>
    </button>
</a>

<style>

    .service_button {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: transparent;
        border: none;
        gap: 1rem;
        padding: 0 1rem 0 0;
        transition: padding 0.3s ease-out;
        cursor: pointer;
    }

    .service_button:hover {
        padding: 0;
    }
    
    .icon_and_label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .service_button:hover > .icon_and_label > .service_label {
        color: #d79679;
    }

    .service_button:hover > .arrow_container {
        margin: 0 0 0 1rem;
        fill: #d79679;
    }

    .service_icon_container {
        width: 6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #36261E;
        fill: #36261E;
    }

    .service_label {
        color: #838b6a;
        transition: color 0.3s linear;
    }

    .arrow_container {
        width: 1.5rem;
        fill: #838b6a;
        transition: margin 0.3s ease-out, fill 0.3s linear;
    }

    @media screen and (max-width: 1080px) {

        .arrow_container {
            width: 1.25rem;
        }

        .service_icon_container {
            width: 5rem;
        }

    }

    @media screen and (max-width: 720px) {

        .service_button {
            gap: 0.5rem;
        }
        .service_button:hover {
            padding: 0 0.5rem 0 0;
        }

        .icon_and_label {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .service_button:hover > .arrow_container {
            margin: 0 0 0 0.5rem;
        }

        .service_label {
            width: auto;
            font-size: 0.75rem;
        }

        .service_icon_container {
            width: 4rem;
        }

        .arrow_container {
            width: 1rem;
            min-width: 0.8rem;
        }

    }
</style>