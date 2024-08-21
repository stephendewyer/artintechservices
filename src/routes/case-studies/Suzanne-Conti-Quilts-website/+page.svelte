<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import { page } from "$app/stores";
    import SuzanneContiQuiltsWebsiteBanner from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/Suzanne_Conti_Quilts_desktop_and_mobile.jpg";
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import { onDestroy, onMount } from "svelte";
    import type Player from "video.js/dist/types/player";
    import SuzanneContiQuiltsDemoVideo from "$lib/videos/Suzanne_Conti_Quilts_website_video_web.mp4";
    import SuzanneContiQuiltsDemoPoster from "$lib/videos/Suzanne_Conti_Quilts_website.jpg"

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
    <title>Art in Tech Services - Suzanne Conti Quilts website</title>
    <meta name="description" content="Suzanne Conti Quilts website" />
    <meta property="og:image" content={SuzanneContiQuiltsWebsiteBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>
        Suzanne Conti Quilts website
    </h1>
    <div class="case_study_banner">
        <video 
            class="video-js"
            controls 
            id="player"
            muted={true}
            autoplay={true}
            poster={SuzanneContiQuiltsDemoPoster}
            loop={true}
        >
            <track kind="captions">
            <source src={SuzanneContiQuiltsDemoVideo} type="video/mp4"/>
        </video>
    </div>
</div>

<style>

    .case_study_banner {
        width: 100%;
        max-width: 1920px;
        padding: 1rem;
    }

</style>