<script lang="ts">
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import StephenDewyerProfile from "$lib/images/team/stephen_garrett_dewyer/stephen_dewyer.jpg";
    
    let cardHovered: boolean = false;

</script>

<div 
    tabindex="-1"
    role="button"
    id="profile_card"
    class={cardHovered ? "profile_card_active" : "profile_card_inactive"}
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
        <h3 class="team_member_name">Stephen Dewyer</h3>
        <h4 class="team_member_title">Founding Director, Full-stack Web Developer and UX Designer</h4>
        <div class="team_member_button">
            <ActionButtonSecondary hovered={cardHovered}>
                biography
            </ActionButtonSecondary>
        </div>
    </div>
</div>

<style>
    #profile_card {
        position: relative;
        width: 100%;
        max-width: 18rem;
        margin-left: auto;
        margin-right: auto;
        transition: box-shadow 0.2s linear;
    }

    .profile_card_active {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .profile_card_inactive {
        box-shadow: none;
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
        gap: 1rem;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 1rem;
        background: rgb(255,255,255);
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.25) 35%, rgba(255,255,255,0) 100%);
    }

    .team_member_name {
        font-size: 1.5rem;
        text-align: center;
    }

    .team_member_title {
        font-size: 1.25rem;
        text-align: center;
    }

    .team_member_button {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

@media screen and (max-width: 750px) {

    #profile_card {
        width: 100%;
        max-width: 100%;
    }

    .profile_photo {
        width: 100%;
        max-width: 100%;
    }

    .team_member_name {
        font-size: 1rem;
    }
    
    .team_member_title {
        font-size: 1rem;
    }

}
</style>