<script lang="ts">
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import { onDestroy, onMount } from "svelte";
    import type Player from "video.js/dist/types/player";
    import AboutVideo from "$lib/videos/expertise_video_web.mp4";
    
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
<div class="page">
    <div class="video_container">
        <video 
            class="video-js"
            controls 
            id="player"
            muted={true}
            autoplay={true}
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