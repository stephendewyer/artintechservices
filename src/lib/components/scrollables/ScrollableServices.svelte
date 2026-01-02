<script lang="ts">
    import ArrowButtonNext from "$lib/components/buttons/ArrowButtonNext.svelte";
    import ArrowButtonPrevious from "$lib/components/buttons/ArrowButtonPrevious.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import SoftwareDevelopment from "$lib/images/icons/services/software_icon.svg?raw";
    import VisualDesign from "$lib/images/icons/services/visual_design_icon.svg?raw";
    import UserExperienceDesign from "$lib/images/icons/services/UX_design.svg?raw";
    import CardService from "$lib/components/cards/ServiceCard.svelte";

    const serviceCards: ServiceCard[] = [
        {
            id: uuidv4(),
            index: 1,
            label: "website and full-stack web application development",
            tabImageSrc: SoftwareDevelopment,
            data: [
                {
                    capabilities: "We build websites and full-stack web applications that are accessible, secure and high-performing.  We use modern software development libraries, frameworks and databases.  Our web software responds to different devices and works across browsers.  We ensure our web software uses the best search engine optimization practices.  Our developers are experienced in developing web software for e-commerce.  We can handle simple websites to complex, full-stack web applications.  We can help setup web hosting solutions to deploy and maintain the websites and web applications we build.  We can add analytics to the web software we build.",
                    pathname: "/services?service=web-development"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "user experience design",
            tabImageSrc: UserExperienceDesign,
            data: [
                {
                    capabilities: "We design software using some of the best UX design practices to ensure project goals are aligned with the user experience.  We use user research to inform our designs in an iterative process.  We’re able to combine our experience in software development and art direction to design with aesthetics and cutting-edge technology in mind to produce great user experiences.",
                    pathname: "/services?service=user-experience-design"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 3,
            label: "art direction",
            tabImageSrc: VisualDesign,
            data: [
                {
                    capabilities: "We’ll help you communicate your story in a compelling way using our expertise in art.  We can help you with everything from brand identity design to creating original content including interactive data visualizations, 3-D animations, photographs, videos and illustrations.  Our art direction skills help ensure your designs tell your story in an enjoyable way.",
                    pathname: "/services?service=art-direction"
                }
            ]
        },
    ];

    let servicesFrameWidth: number = 0;
    let servicesFrameElement: HTMLElement;

    let scrollServicesPreviousClicked: boolean = false;
    let scrollServicesNextClicked: boolean = false;

    let prevServicesBtnEnabled: boolean = true;
    let nextServicesBtnEnabled: boolean = true;

    $: if (servicesFrameElement) {
        if (servicesFrameElement.scrollWidth === servicesFrameWidth) {
            nextServicesBtnEnabled = false;
        } else if (servicesFrameElement.scrollWidth > servicesFrameWidth) {
            nextServicesBtnEnabled = true;
        }
    }

    let servicesScrollLeftPosition: number = 0;

    $: if (servicesScrollLeftPosition === 0) {
        prevServicesBtnEnabled = false;
    } else {
        prevServicesBtnEnabled = true;
    }

    $: if (scrollServicesPreviousClicked) {
        if (servicesScrollLeftPosition > 0) {
            servicesFrameElement.scrollLeft = servicesScrollLeftPosition - (servicesFrameWidth * 1);
        }
        scrollServicesPreviousClicked = false;
    }

    $: if (scrollServicesNextClicked) {
        if (servicesScrollLeftPosition < (servicesScrollLeftPosition + servicesFrameWidth)) {
            servicesFrameElement.scrollLeft = servicesScrollLeftPosition + (servicesFrameWidth * 1);
        }
        scrollServicesNextClicked = false;
    }

    const handleWindowResize = () => {
        servicesScrollLeftPosition = servicesFrameElement.scrollLeft;
        if (servicesFrameElement.scrollWidth - 1 > Math.ceil(servicesScrollLeftPosition + servicesFrameWidth)) {
            nextServicesBtnEnabled = true;
        } else {
            nextServicesBtnEnabled = false;
        }
        if (servicesFrameElement.scrollWidth <= servicesFrameWidth) {
            nextServicesBtnEnabled = false;
        }
    }

    const handleServicesScroll = () => {
        servicesScrollLeftPosition = servicesFrameElement.scrollLeft;
        if (servicesFrameElement.scrollWidth - 1 > Math.ceil(servicesScrollLeftPosition + servicesFrameWidth)) {
            nextServicesBtnEnabled = true;
        } else {
            nextServicesBtnEnabled = false;
        }
    }

</script>

<svelte:window on:resize={handleWindowResize} />

<div class="services_scrollable">
    <div 
        bind:clientWidth={servicesFrameWidth}
        on:scroll={handleServicesScroll}
        bind:this={servicesFrameElement}
        class="services_container"
    >
        <div class="services_inner">
            {#each serviceCards as serviceCard, index}
                <CardService service_data={serviceCard} />
            {/each}
        </div>
    </div>
    <div class="arrow_button_previous_services">
        <ArrowButtonPrevious
            bind:arrowPrevClicked={scrollServicesPreviousClicked}
            prevBtnEnabled={prevServicesBtnEnabled}
        />
    </div>
    <div class="arrow_button_next_services">
        <ArrowButtonNext
            bind:arrowNextClicked={scrollServicesNextClicked}
            nextBtnEnabled={nextServicesBtnEnabled}
        />
    </div>
</div>

<style>

    .services_scrollable {
        position: relative;
        margin: 0 1rem 1rem 1rem;
        padding: 0 0 1rem 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .services_container {
        position: relative;
        width: 100%;
        overflow-x: auto;
        scroll-behavior: smooth;
    }

    .services_inner {
        gap: 1rem;
        display: flex;
        flex-direction: row;
        padding: 0 0 1rem 0;
        justify-content: center;
    }

    .arrow_button_previous_services {
        position: absolute;
        left: 0;
        right: auto;
        bottom: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        pointer-events: none;
    }

    .arrow_button_next_services {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: auto;
        pointer-events: none;
    }

    @media screen and (max-width: 1440px) {
        .services_inner {
            justify-content: flex-start;
        }
    }

    @media screen and (max-width: 720px) {
        .arrow_button_previous_services {
            justify-content: flex-end;
        }

        .arrow_button_next_services {
            justify-content: flex-end;
        }

        .services_scrollable {
            padding: 0 0 1.5rem 0;
        }
    }


</style>