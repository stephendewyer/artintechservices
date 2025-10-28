<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
  import LoginClient from "$lib/components/logins/LoginClient.svelte";

</script>

<svelte:head>
	<title>Art in Tech Services - login client</title>
	<meta name="description" content="login client" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <div class="login_container">
        <h1>login client</h1>
        <ul>
            <li>
                schedule and keep track of consultations
            </li>
            <li>
                start and keep track of projects
            </li>
            <li>
                send and receive secure messages
            </li>
            <li>
                handle invoices
            </li>
            <li>
                handle personal account details
            </li>
        </ul>
        <LoginClient />
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