<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import StephenDewyerProfile from "$lib/images/team/stephen_garrett_dewyer/stephen_dewyer.jpg";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";

    let cardHovered: boolean = false;
</script>
<svelte:head>
    <title>Art in Tech Services - team</title>
    <meta name="description" content="team" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <h1>
        team
    </h1>
    <h2>
        experts in art and digital technology
    </h2>
    <div class="team_members">
        <a 
            href="/team/stephen_dewyer"
            class="profile_card"
            on:focus={() => cardHovered = true}
            on:mouseenter={() => cardHovered = true}
            on:mouseover={() => cardHovered = true}
            on:mouseleave={() => cardHovered = false}
            on:mouseout={() => cardHovered = false}
            on:blur={() => cardHovered = false}
        >
            <img
                class="profile_photo"
                src={StephenDewyerProfile} 
                alt="profile of stephen dewyer"
            />
            <div class="profile_photo_overlay">
                <h3 class="team_member_name">stephen dewyer</h3>
                <h4 class="team_member_title">Founding Director, Full-stack Web Developer and UX Designer</h4>
                <div class="team_member_button">
                    <ActionButtonSecondary hovered={cardHovered}>
                        biography
                    </ActionButtonSecondary>
                </div>
            </div>
        </a>
    </div>
    
</div>
<style>


.team_members {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.profile_card {
    position: relative;
    width: 100%;
    max-width: 18rem;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
}

.profile_photo {
    position: relative;
    width: 100%;
}

.profile_photo_overlay {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0 0 1rem 0;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.25) 35%, rgba(255,255,255,0) 100%);
}

.team_member_name {
    margin: 0 auto 0.4rem auto;
    font-size: 1.5rem;
}

.team_member_title {
    margin: 0 1rem 0.4rem 1rem;
    font-size: 1.25rem;
    text-align: center;
}

.team_member_button {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

@media screen and (max-width: 750px) {

    .profile_card {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
        margin-left: 0;
        margin-right: 0;
    }

    .profile_photo {
        width: 100%;
        max-width: 100%;
    }

    .team_member_name {
        margin: 0 auto 0.4rem auto;
        font-size: 1rem;
    }
    
    .team_member_title {
        margin: 0 auto 0.4rem auto;
        font-size: 1rem;
    }

}
</style>