<script lang="ts">
    import ActionButtonTertiary from "$lib/components/buttons/ActionButtonTertiary.svelte";
    export let card: HowToWorkWithUsCard;
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import type Player from "video.js/dist/types/player";
    import { onDestroy, onMount } from "svelte";

    let player: Player;

    onMount(() => {
        player = videojs("player", {fluid: true});
    });

    onDestroy(() => {
        if (player) {
            player.dispose();
        };
    });
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
            {#if card.video !== null}
                <div class="video_container">
                    <video 
                        class="video-js"
                        controls 
                        id="player"
                        muted={true}
                        autoplay={true}
                        playsinline={true}
                        poster={card.video_poster}
                        loop={true}
                    >
                        <track kind="captions">
                        <source src={card.video} type="video/mp4"/>
                    </video>
                </div>
            {/if}
            <div class="card_paragraphs">
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
</div>

<style>

    .card_container {
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
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background: rgb(255,255,255, 0.75);
        height: 100%;
        gap: 1rem;
    }

    .video_container {
        width: 100%;
    }

    .card_paragraphs {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        width: 100%;
    }

    @media screen and (max-width: 720px) {

        .icon_container {
            width: 3rem;
        }
    }

</style>