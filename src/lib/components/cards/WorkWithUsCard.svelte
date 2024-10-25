<script lang="ts">
    import ActionButtonTertiary from "$lib/components/buttons/ActionButtonTertiary.svelte";
    export let card: HowToWorkWithUsCard;

</script>

<div class="card_container">
    <div class="background_image_container">
        <img 
            class="background_image"
            src={card.image} 
            alt={card.altText} 
        />
    </div>
    <div class="card_info_container">
        <div 
            class="card_info"
        >
            <div class="card_icon_and_heading">
                <div class="icon_container">
                    {@html card.icon}
                </div>
                <h3 style="text-align: center;">
                    {card.header}
                </h3>
            </div>
            
            <p>
                {card.paragraph}
            </p>
            {#each card.pathname as path, index}
                <a href={path.path}>
                    <ActionButtonTertiary parentControlled={false} >
                        {path.label}
                    </ActionButtonTertiary>
                </a>
                {#if (card.pathname.length > 1) && (index !== (card.pathname.length - 1))}
                    or 
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>

    .card_container {
        height: 28rem;
        width: 100%;
        position: relative;
    }

    .background_image_container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .background_image {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    .card_info_container {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .card_icon_and_heading {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        margin: 0 auto;
    }

    .icon_container {
        width: 4rem;
        fill: #2d3530;
    }

    .card_info {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background: rgb(255,255,255, 0.75);
        height: 100%;
    }

    @media screen and (max-width: 1440px) {
        .card_container {
            height: 24rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .card_container {
            height: 20rem;
        }
    }

    @media screen and (max-width: 720px) {
        .card_container {
            height: 16rem;
        }

        .icon_container {
            width: 3rem;
        }
    }

</style>