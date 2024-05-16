<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
</script>
<svelte:head>
    <title>Art in Tech Services - careers</title>
    <meta name="description" content="careers" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <div class="careers_info">
        <h1>careers</h1>
        <h2>building careers for art workers in tech</h2>
        <p class="paragraph">
            Interested in becoming a part of the Art in Tech Services team?   Send the position you are applying to fill, your resume and cover letter to sdewyer@artintechservices.com.
        </p>
    </div>
    
</div>
<style>

    .careers_info {
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    .paragraph {
        width: 100%;
        max-width: 40rem;
        margin: 0;
    }
</style>