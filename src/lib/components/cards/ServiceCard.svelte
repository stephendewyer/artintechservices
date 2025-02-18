<script lang="ts">
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import NavArrow from "$lib/images/arrows/nav_arrow.svg?raw";

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
    <div class="arrow_container">
        <div 
            id="arrow" 
            class={flipCard ? "arrow_active" : "arrow_inactive"}
            on:click={() => flipCard = !flipCard}
            on:keyup={() => flipCard = !flipCard}
            role="button"
            tabindex={service_data.index}
        >
            {@html NavArrow}
        </div>
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

    .arrow_container {
        position: absolute;
        top: 0.5rem;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    #arrow {
        position: relative;
        width: 2rem;
        fill: #2D3530;
        transition: transform 0.3s linear;
        cursor: pointer;
        pointer-events: none;
    }

    .arrow_active {
        transform: rotateX(0);
    }

    .arrow_inactive {
        transform: rotateX(180deg);
    }

    @media screen and (max-width: 1920px) {
        .service_card {
            width: 20rem;
            height: 20rem;
        }

        .skills > li {
            font-size: 1.25rem;
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
            pointer-events: none;
        }

        #arrow {
            pointer-events:all;
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

    }
</style>