<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";

</script>
<svelte:head>
    <title>Art in Tech Services - stephen garrett dewyer</title>
    <meta name="description" content="stephen garrett dewyer" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>
        stephen dewyer
    </h1>
    <h2>
        Founding Director, Full-stack Web Developer and UX Designer
    </h2>
    
</div>