<script lang="ts">
    import MeatBalls from "$lib/images/icons/meaballs.svg?raw";
    import CloseIcon from "$lib/images/icons/close_icon.svg?raw";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";

    export let service_data;

    let flipCard: boolean = false;

</script>

<button 
    class="service_card"
    on:mouseover={() => flipCard = true}
    on:mouseenter={() => flipCard = true}
    on:mouseleave={() => flipCard = false}
    on:mouseout={() => flipCard = false}
    on:focus={() => flipCard = true}
    on:blur={() => flipCard = false}
    type="button"
>
    <div id="service_card_front" class={flipCard ? "service_card_front_active" : "service_card_front_inactive"}>
        <button 
            class="meatballs"
            on:click={() => flipCard = true}
            on:keyup={() => flipCard = true}
        >
            {@html MeatBalls}
        </button>
        <div class="label_and_image">
            <div class="service_image">
                {@html service_data.tabImageSrc}
            </div>
            <h3 class="service_name">
                {service_data.label}
            </h3>    
        </div>    
    </div>
    <div id="service_card_back" class={flipCard ? "service_card_back_inactive" : "service_card_back_active"}>
        <button 
            class="close_button"
            on:click={() => flipCard = false}
            on:keyup={() => flipCard = false}
        >
            {@html CloseIcon}
        </button>
        {#each service_data.data as serviceData, index}
            <ul class="skills">
                {#each serviceData.skills as skill, index}
                    <li>
                        {skill}
                    </li>
                {/each}
            </ul>
            <a href={serviceData.pathname}>
                <ActionButtonSecondary>
                    learn and shop
                </ActionButtonSecondary>
            </a>
        {/each}
    </div>
</button>

<style>
    .service_card {
        position: relative;
        background-color: rgb(244,254,242, 0.75);
        width: 24rem;
        height: 24rem;
        padding: 1rem;
        overflow: hidden;
        border: none;
        text-align: left;
    }

    #service_card_front {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        transition: transform 0.3s ease-out;
    }

    .service_card_front_active {
        transform: translateY(-100%);
    }

    .service_card_front_inactive {
        transform: translateY(0);
    }

    #service_card_back {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        transition: transform 0.3s ease-out;
    }

    .service_card_back_active {
        transform: translateY(0);
    }

    .service_card_back_inactive {
        transform: translateY(-100%);
    }

    .meatballs {
        position: absolute;
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

    .close_button {
        display: none;
    }

    .label_and_image {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
    }

    .service_image {
        width: 6rem;
        height: auto;
        fill: #2D3530;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .service_name {
        color: #2D3530;
        text-align: left;
    }

    .skills {
        padding: 1rem;
        margin: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .skills > li {
        font-size: 1.5rem;
    }

    @media screen and (max-width: 1920px) {
        .service_card {
            width: 20rem;
            height: 20rem;
        }

        .skills > li {
            font-size: 1.25rem;
        }

        .meatballs {
            width: 2rem;
            margin: 1rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .service_card {
            min-width: 20rem;
        }

    }

    @media screen and (max-width: 750px) {
        .service_card {
            min-width: 18rem;
            width: 18rem;
            height: 18rem;
            padding: 0.5rem;
        }

        .service_image {
            width: 3.5rem;
        }

        .skills {
            padding: 1rem;
        }

        .skills > li {
            font-size: 1rem;
        }

        .meatballs {
            width: 2rem;
            margin: 0.5rem;
        }

        .close_button {
            display: block;
            position: absolute;
            width: 2rem;
            top: 0;
            right: 0;
            margin: 0.5rem;
            fill: #838B6A;
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
        }
    }
</style>