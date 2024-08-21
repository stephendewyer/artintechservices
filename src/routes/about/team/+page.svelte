<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import TeamMemberCard from "$lib/components/cards/TeamMemberCard.svelte";

</script>
<svelte:head>
    <title>Art in Tech Services - team</title>
    <meta name="description" content="team" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <div class="team_info">
        <h1>
            team
        </h1>
        <h2>
            experts in art and digital technology
        </h2>
        <div class="team_members">
            <a href="/about/team/stephen_dewyer">
                <TeamMemberCard />
            </a>
        </div>    
    </div>
</div>
<style>

    .team_info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 4rem;
    }
    .team_members {
        padding: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

</style>