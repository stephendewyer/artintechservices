<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import LoginAdministrator from "$lib/components/logins/LoginAdministrator.svelte";

</script>

<svelte:head>
	<title>Art in Tech Services - login administrator</title>
	<meta name="description" content="login administrator" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <div class="login_container">
        <h1>login administrator</h1>
        <LoginAdministrator />
    </div>
</div>
<style>
    .login_container {
        width: 100%;
        max-width: 28rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

