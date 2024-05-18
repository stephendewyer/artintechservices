<script lang="ts">
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import { onDestroy, onMount } from "svelte";
    import type Player from "video.js/dist/types/player";
    import AboutVideo from "$lib/videos/expertise_video_web.mp4";
    import AboutVideoPoster from "$lib/videos/expertise_video_poster_video.jpg";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import USMap from "$lib/images/maps/Tucson,_AZ.svg"
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";

    let player: Player;

    onMount(() => {
        player = videojs("player", {fluid: true});
    });

    onDestroy(() => {
        if (player) {
            player.dispose();
        };
    });

    const values: string[] = [
        "source locally",
        "overcome obstacles",
        "operate with integrity",
        "continually learn by investing in research and development of products and staff",
        "effectively communicate",
        "demonstrate excellence",
        "implement fairness",
        "design for humans"
    ];

</script>
<svelte:head>
    <title>Art in Tech Services - story</title>
    <meta name="description" content="story" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <h1 style="padding-bottom: 1rem;">story</h1>
    <div class="video_container">
        <video 
            class="video-js"
            controls 
            id="player"
            muted={true}
            autoplay={true}
            poster={AboutVideoPoster}
        >
            <track kind="captions">
            <source src={AboutVideo} type="video/mp4"/>
        </video>
    </div>
    <div class="story_sections">
        
        <div class="story_section">
            <h2>vision</h2>
            <p class="paragraph">
                Art has always envisioned groundbreaking technological discoveries. By combining world-class artistic vision and digital technology expertise, Art in Tech Services will create groundbreaking digital products.
            </p>
        </div>
        <div class="story_section">
            <h2>mission</h2>
            <p class="paragraph">
                Use advancements in art and digital technology to improve design for the public and businesses.   Deliver state-of-the-art digital products that improve human experiences of technology.
            </p>
        </div>
        <div class="story_section">
            <h2>history</h2>
            <table>
                <colgroup>
                    <col class="left_column">
                    <col class="right_column">
                </colgroup>
                <tr>
                    <td>
                        2021
                    </td>
                    <td>
                        Art in Tech Services Inc. launches
                    </td>
                </tr>
                <tr>
                    <td>
                        2024
                    </td>
                    <td>
                        begin research and development in AI applications
                    </td>
                </tr>
            </table>
        </div>
        <div class="process">

        </div>
        <div class="story_section">
            <h2>
                location
            </h2>
            <div class="map_container">
                <img src={USMap} alt="map of U.S. showing Art in Tech Services headquarters location" />
            </div>
            <p class="paragraph">
                Art in Tech Services works across the United States and is moving its headquarters to Tucson, Arizona.
            </p>
        </div>
        <div class="story_section">
            <h2>
                people
            </h2>
            <p class="paragraph">
                Our staff are some of the best in the fields of art and digital technology.
            </p>
            <a href="/team">
                <ActionButtonSecondary >
                    our staff
                </ActionButtonSecondary>
            </a>            
        </div>
        <div class="story_section">
            <h2>
                how we work
            </h2>
            <p class="paragraph">
                Our process has been tried and tested to produce the best results.
            </p>
            <a href="/process">
                <ActionButtonSecondary >
                    our process
                </ActionButtonSecondary>
            </a>       
        </div>
        <div class="story_section">
            <h2>
                values
            </h2>
            <p class="paragraph">
                Values that guide our operations and define our business:
            </p>
            <ul class="values">
                {#each values as value, index}
                    <li>
                        {value}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="story_section">
            <h2>
                organization type
            </h2>
            <p class="paragraph">
                Art in Tech Services is a C-Corporation.
            </p>
        </div>
        <div class="story_section">
            <h2>
                shareholders
            </h2>
            <p class="paragraph">
                Art in Tech Services is currently a privately-held corporation.
            </p>
        </div>
    </div>
</div>
<style>
    .video_container {
        max-width: 1920px;
        width: 100%;
        margin: 0 auto;
    }

    .story_sections {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1rem 4rem 1rem;
    }

    .story_section {
        max-width: 40rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
    }

    table > tr {
        height: auto;
        padding: 0;
    }

    table > tr > td {
        padding: 1rem;
    }

    table tr:nth-child(odd) {
        background-color: #CBC6C2;
    }

    .paragraph {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .left_column {
        width: 25%;
    }

    .right_column {
        width: 75%;
    }

    .map_container {
        width: 100%;
    }

    .values {
        display: flex;
        flex-direction: column;
    }

    .values > li {
        width: auto;
    }

    @media screen and (max-width: 1440px) {

    }

    @media screen and (max-width: 1080px) {

    }

    @media screen and (max-width: 720px) {

    }
</style>