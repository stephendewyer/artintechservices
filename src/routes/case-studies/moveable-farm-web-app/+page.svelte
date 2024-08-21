<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import moveableFarmWebAppBanner from "$lib/images/case_studies/moveable_farm_web_app/moveable_farm_banner.jpg";
    import { page } from "$app/stores";

</script>

<svelte:head>
    <title>Art in Tech Services - moveable farm web app</title>
    <meta name="description" content="moveable farm web app" />
    <meta property="og:image" content={moveableFarmWebAppBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>
        moveable farm web app
    </h1>
    <div class="case_study_banner">
        <img src={moveableFarmWebAppBanner} alt="moveable farm web app banner" />
    </div>
</div>

<style>

    .case_study_banner {
        width: 100%;
        max-width: 1920px;
        padding: 1rem;
    }

</style>