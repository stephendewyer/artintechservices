<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import JoyfoodlyBanner from "$lib/images/case_studies/Joyfoodly_website/Joyfoodly_desktop_and_mobile.jpg";
    import { page } from "$app/stores";
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import { onDestroy, onMount } from "svelte";
    import type Player from "video.js/dist/types/player";
    import JoyfoodlyDemoVideo from "$lib/videos/Joyfoodly_website_web.mp4";
    import JoyfoodlyDemoPoster from "$lib/videos/Joyfoodly_website.jpg";
    import ExternalLinkButton from "$lib/components/buttons/ExternalLinkButton.svelte";

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
<svelte:head>
    <title>Art in Tech Services - Joyfoodly website</title>
    <meta name="description" content="Joyfoodly website" />
    <meta property="og:image" content={JoyfoodlyBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>
        Joyfoodly website
    </h1>
    <div class="case_study_banner">
        <video 
            class="video-js"
            controls 
            id="player"
            muted={true}
            autoplay={true}
            poster={JoyfoodlyDemoPoster}
            loop={true}
        >
            <track kind="captions">
            <source src={JoyfoodlyDemoVideo} type="video/mp4"/>
        </video>
    </div>
    <div class="case_study_external_link">
        <a 
            href="http://joyfoodly.com"
            target="_blank"
        >
            <ExternalLinkButton>
                visit Joyfoodly website
            </ExternalLinkButton>
        </a>
    </div>
</div>

<style>

    .case_study_banner {
        width: 100%;
        max-width: 1920px;
        padding: 1rem;
    }

</style>