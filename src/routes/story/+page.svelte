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
    <title>Art in Tech Services - story</title>
    <meta name="description" content="story" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
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
</div>
<style>
    .video_container {
        max-width: 1920px;
        width: 100%;
        margin: 0 auto;
    }
</style>