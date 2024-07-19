<script lang="ts">
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    export let card;

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
        <div class="card_info">
            <h3 style="text-align: center;">
                {card.header}
            </h3>
            <p>
                {card.paragraph}
            </p>
            {#each card.pathname as path, index}
                <a href={path.path}>
                    <ActionButtonSecondary>
                        {path.label}
                    </ActionButtonSecondary>
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
        height: 36rem;
        width: 24rem;
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
        padding: 1rem;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .card_info {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgb(255,255,255, 0.75);
    }

    @media screen and (max-width: 720px) {
        .card_container {
            height: 24rem;
            width: 100%;
        }
    }

</style>