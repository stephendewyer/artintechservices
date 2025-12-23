<script lang="ts">
    import ArrowButtonNext from "$lib/components/buttons/ArrowButtonNext.svelte";
    import ArrowButtonPrevious from "$lib/components/buttons/ArrowButtonPrevious.svelte";
    import CaseStudyCardElement from "$lib/components/cards/CaseStudyCard.svelte";
    import TucsonFarmersMarket from "$lib/images/case_studies/moveable_farm_web_app/Tucson_farmers_market.jpeg"
    import SuzanneContiQuiltsBanner from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/Suzanne_Conti_North_Carolina_01.jpg";
    import JoyfoodlyBanner from "$lib/images/case_studies/Joyfoodly_website/reduced/Joyfoodly_recipe.jpg";
    import MoveableFarmDesktopAndMobilePrototypes from "$lib/images/case_studies/moveable_farm_web_app/reduced/moveable_farm_prototypes.png";
    import SuzanneContiQuiltsDesktopAndMobilePrototypes from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/reduced/Suzanne_Conti_Quilts_prototypes.png";
    import JoyfoodlyDesktopAndMobilePrototypes from "$lib/images/case_studies/Joyfoodly_website/reduced/Joyfoodly_prototypes.png";
    import { v4 as uuidv4 } from 'uuid';

    const caseStudyCards: CaseStudyCard[] = [
        {
            id: uuidv4(),
            index: 0,
            label: "Moveable Farm web app",
            paragraph: "A web platform to develop stronger and more sustainable agriculture for better cooking, eating and drinking.",
            imageBackgroundSrc: TucsonFarmersMarket,
            imageBackgroundAlt: "Moveable Farm banner",
            imageForegroundSrc: MoveableFarmDesktopAndMobilePrototypes,
            imageForegroundAlt: "Moveable Farm desktop and mobile prototypes",
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

    let scrollCaseStudiesPreviousClicked: boolean = false;
    let scrollCaseStudiesNextClicked: boolean = false;
    let prevCaseStudiesBtnEnabled: boolean = true;
    let nextCaseStudiesBtnEnabled: boolean = true;

    let caseStudiesFrameElement: HTMLElement;
    let caseStudiesFrameWidth: number = 0;

    $: if (caseStudiesFrameElement) {
        if (caseStudiesFrameElement.scrollWidth === caseStudiesFrameWidth) {
            nextCaseStudiesBtnEnabled = false;
        } else if (caseStudiesFrameElement.scrollWidth > caseStudiesFrameWidth) {
            nextCaseStudiesBtnEnabled = true;
        }
    }

    let caseStudiesScrollLeftPosition: number = 0;

    $: if (caseStudiesScrollLeftPosition === 0) {
        prevCaseStudiesBtnEnabled = false;
    } else {
        prevCaseStudiesBtnEnabled = true;
    }

    const handleCaseStudiesScroll = () => {
        caseStudiesScrollLeftPosition = caseStudiesFrameElement.scrollLeft;
        if (caseStudiesFrameElement.scrollWidth -1 > Math.ceil(caseStudiesScrollLeftPosition + caseStudiesFrameWidth)) {
            nextCaseStudiesBtnEnabled = true;
        } else {
            nextCaseStudiesBtnEnabled = false;
        }
    }

    const handleWindowResize = () => {
        caseStudiesScrollLeftPosition = caseStudiesFrameElement.scrollLeft;
        if (caseStudiesFrameElement.scrollWidth - 1 > Math.ceil(caseStudiesScrollLeftPosition + caseStudiesFrameWidth)) {
            nextCaseStudiesBtnEnabled = true;
        } else {
            nextCaseStudiesBtnEnabled = false;
        }
        if (caseStudiesFrameElement.scrollWidth <= caseStudiesFrameWidth) {
            nextCaseStudiesBtnEnabled = false;
        }
    }

    $: if (scrollCaseStudiesPreviousClicked) {
        if (caseStudiesScrollLeftPosition > 0) {
            caseStudiesFrameElement.scrollLeft = caseStudiesScrollLeftPosition - (caseStudiesFrameWidth * 1);
        }
        scrollCaseStudiesPreviousClicked = false;
    }

    $: if (scrollCaseStudiesNextClicked) {
        if (caseStudiesScrollLeftPosition < (caseStudiesScrollLeftPosition + caseStudiesFrameWidth)) {
            caseStudiesFrameElement.scrollLeft = caseStudiesScrollLeftPosition + (caseStudiesFrameWidth * 1);
        }
        scrollCaseStudiesNextClicked = false;
    }

</script>

<svelte:window 
    on:resize={handleWindowResize}
/>

<div class="case_studies_section">
    <div 
        bind:clientWidth={caseStudiesFrameWidth}
        on:scroll={handleCaseStudiesScroll}
        bind:this={caseStudiesFrameElement}
        class="case_studies_container"
    >
        <div 
            class="case_studies_inner"
        >
            {#each caseStudyCards as caseStudy, i}
                <CaseStudyCardElement caseStudyCardData={caseStudy} />
            {/each}
        </div>
    </div>
    <div class="arrow_button_previous_case_studies">
        <ArrowButtonPrevious
            bind:arrowPrevClicked={scrollCaseStudiesPreviousClicked}
            prevBtnEnabled={prevCaseStudiesBtnEnabled}
        />
    </div>
    <div class="arrow_button_next_case_studies">
        <ArrowButtonNext
            bind:arrowNextClicked={scrollCaseStudiesNextClicked}
            nextBtnEnabled={nextCaseStudiesBtnEnabled}
        />
    </div>
</div>

<style>
    
    .case_studies_section {
        position: relative;
        margin: 0 1rem 1rem 1rem;
    }

    .case_studies_container {
        position: relative;
        width: 100%;
        overflow-x: auto;
        scroll-behavior: smooth;
    }

    .case_studies_inner {
        gap: 1rem;
        display: flex;
        flex-direction: row;
        padding: 0 0 1rem 0;
    }

    .arrow_button_previous_case_studies {
        position: absolute;
        left: 0;
        right: auto;
        bottom: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: auto;
    }

    .arrow_button_next_case_studies {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: auto;
    }


</style>