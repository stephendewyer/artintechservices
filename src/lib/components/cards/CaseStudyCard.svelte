<script lang="ts">
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";

    export let caseStudyCardData: CaseStudyCard;
    let hovered: boolean = false;

</script>
<div 
    id="case_study_card_container"
    class={hovered ? "case_study_card_container_active" : "case_study_card_container_inactive"}
    on:focus={() => hovered = true}
    on:mouseenter={() => hovered = true}
    on:mouseover={() => hovered = true}
    on:mouseleave={() => hovered = false}
    on:mouseout={() => hovered = false}
    on:blur={() => hovered = false}
    role="region"
>
    <img 
        class="background_image"
        src={caseStudyCardData.imageBackgroundSrc} 
        alt={caseStudyCardData.imageBackgroundAlt} 
    />
    <div class="case_study_info_container">
        <div class="case_study_prototypes_container">
            <img 
                class="case_study_prototypes" 
                src={caseStudyCardData.imageForegroundSrc} 
                alt={caseStudyCardData.imageForegroundAlt} 
            />
        </div>
        <div class="case_study_info">
            <h3 style="text-align: left;">
                {caseStudyCardData.label}
            </h3>
            <p>
                {caseStudyCardData.paragraph}
            </p>
            <a class="button_container" href={caseStudyCardData.path}>
                <ActionButtonSecondary>
                    view case study
                </ActionButtonSecondary>
            </a>
        </div>
    </div>
</div>
<style>

    #case_study_card_container {
        position: relative;
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        width: 100%;
        min-width: 48rem;
        height: 100vh;
        display: flex;
        flex-direction: column;
        text-align: left;
        transition: box-shadow 0.2s linear;
    }

    .case_study_card_container_active {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .case_study_card_container_inactive {
        box-shadow: none;
    }

    .background_image {
        position: absolute;
        object-fit: cover;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .case_study_info_container {
        position: relative;
        background-color: rgb(244,254,242, 0.75);
        width: 50%;
        height: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
    }

    .case_study_prototypes_container {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .case_study_prototypes {
        height: 100%; 
        object-fit: contain;
    }

    .case_study_info {
        position: relative;
        width: 100%;
    }

    @media screen and (max-width: 1440px) {

        #case_study_card_container {
            min-width: 42rem;
        }

    }

    @media screen and (max-width: 1080px) {

        #case_study_card_container {
            min-width: 38rem;
        }

    }

    @media screen and (max-width: 720px) {
        #case_study_card_container {
            min-width: 100%;
        }
    }

</style>