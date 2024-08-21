<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import MoveableFarmWebAppBanner from "$lib/images/case_studies/moveable_farm_web_app/reduced/grass.jpg";
    import SuzanneContiQuiltsBanner from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/reduced/Suzanne_Conti_North_Carolina_01.jpg";
    import JoyfoodlyBanner from "$lib/images/case_studies/Joyfoodly_website/reduced/Joyfoodly_recipe.jpg";
    import MoveableFarmDesktopAndMobilePrototypes from "$lib/images/case_studies/moveable_farm_web_app/reduced/moveable_farm_prototypes.png";
    import SuzanneContiQuiltsDesktopAndMobilePrototypes from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/reduced/Suzanne_Conti_Quilts_prototypes.png";
    import JoyfoodlyDesktopAndMobilePrototypes from "$lib/images/case_studies/Joyfoodly_website/reduced/Joyfoodly_prototypes.png";
    import { v4 as uuidv4 } from 'uuid';
    import CaseStudyCardElement from "$lib/components/cards/CaseStudyCard.svelte";

    const caseStudyCards: CaseStudyCard[] = [
        {
            id: uuidv4(),
            index: 0,
            label: "moveable farm web app",
            paragraph: "A web application to buy directly from local farmers.",
            imageBackgroundSrc: MoveableFarmWebAppBanner,
            imageBackgroundAlt: "moveable farm banner",
            imageForegroundSrc: MoveableFarmDesktopAndMobilePrototypes,
            imageForegroundAlt: "moveable farm desktop and mobile prototypes",
            path: "/case-studies/moveable-farm-web-app"
        },
        {
            id: uuidv4(),
            index: 0,
            label: "Suzanne Conti Quilts website",
            paragraph: "An interactive collection of quilts by a prolific quilter and her ancestors.",
            imageBackgroundSrc: SuzanneContiQuiltsBanner,
            imageBackgroundAlt: "Suzanne Conti Quilts banner",
            imageForegroundSrc: SuzanneContiQuiltsDesktopAndMobilePrototypes,
            imageForegroundAlt: "Suzanne Conti Quilts desktop and mobile prototypes",
            path: "/case-studies/Suzanne-Conti-Quilts-website"
        },
        {
            id: uuidv4(),
            index: 0,
            label: "Joyfoodly website",
            paragraph: "A website for a culinary education company helping busy families prepare nutritious food.",
            imageBackgroundSrc: JoyfoodlyBanner,
            imageBackgroundAlt: "Joyfoodly banner",
            imageForegroundSrc: JoyfoodlyDesktopAndMobilePrototypes,
            imageForegroundAlt: "Joyfoodly desktop and mobile prototypes",
            path: "/case-studies/Joyfoodly-website"
        }
    ];

</script>

<svelte:head>
    <title>Art in Tech Services - case studies</title>
    <meta name="description" content="case studies" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>
        case studies
    </h1>
    <div class="case_studies">
        {#each caseStudyCards as caseStudy, index}
            <CaseStudyCardElement caseStudyCardData={caseStudy} />
        {/each}
    </div>
</div>

<style>

    .case_studies {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem 1rem 2rem 1rem;
        width: 100%;
        max-width: 2000px;
    }

    @media screen and (max-width: 1440px) {

    }

    @media screen and (max-width: 1080px) {

    }

    @media screen and (max-width: 720px) {
        .case_studies {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            flex-wrap: nowrap;
            gap: 1rem;
            padding: 1rem 1rem 2rem 1rem;
            width: 100%;
        }
    }
</style>