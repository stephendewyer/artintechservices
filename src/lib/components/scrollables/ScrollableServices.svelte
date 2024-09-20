<script lang="ts">
    import ArrowButtonNext from "$lib/components/buttons/ArrowButtonNext.svelte";
    import ArrowButtonPrevious from "$lib/components/buttons/ArrowButtonPrevious.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import SoftwareDevelopment from "$lib/images/icons/services/software_icon.svg?raw";
    import ArtificialIntelligence from "$lib/images/icons/services/artificial_intelligence_icon.svg?raw";
    import DataVisualization from "$lib/images/icons/services/data_visualization_icon.svg?raw";
    import VisualDesign from "$lib/images/icons/services/visual_design_icon.svg?raw";
    import UserExperienceDesign from "$lib/images/icons/services/UX_design.svg?raw";
    import BrandIdentityDesign from "$lib/images/icons/services/brand_identity_design_Icon.svg?raw";
    import Videography from "$lib/images/icons/services/videography_icon.svg?raw";
    import Photography from "$lib/images/icons/services/camera_icon.svg?raw";
    import CardService from "$lib/components/cards/ServiceCard.svelte";

    const serviceCards: ServiceCard[] = [
        {
            id: uuidv4(),
            index: 0,
            label: "artificial intelligence",
            tabImageSrc: ArtificialIntelligence,
            data: [
                {
                    skills: [
                        "machine learning",
                        "deep learning including artificial neural networks and convolutional neural networks"
                    ],
                    pathname: "/services?service=artificial-intelligence"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "brand identity design",
            tabImageSrc: BrandIdentityDesign,
            data: [
                {
                    skills: [
                        "brand discovery",
                        "brand definition",
                        "logo design"
                    ],
                    pathname: "/services?service=brand-identity-design"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "data visualization",
            tabImageSrc: DataVisualization,
            data: [
                {
                    skills: [
                        "dynamic data interactivity",
                        "static data visualizations"
                    ],
                    pathname: "/services?service=data-visualization"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 3,
            label: "photography",
            tabImageSrc: Photography,
            data: [
                {
                    skills: [
                        "staging",
                        "production",
                        "editing"
                    ],
                    pathname: "/services?service=photography"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 4,
            label: "software development",
            tabImageSrc: SoftwareDevelopment,
            data: [
                {
                    skills: [
                        "websites",
                        "web applications",
                        "embedded software",
                        "native software",
                        "mobile applications",
                        "custom content management development"
                    ],
                    pathname: "/services?service=software-development"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 5,
            label: "user experience design",
            tabImageSrc: UserExperienceDesign,
            data: [
                {
                    skills: [
                        "user interface design",
                        "user research",
                        "wire framing",
                        "prototyping"
                    ],
                    pathname: "/services?service=user-experience-design"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 6,
            label: "videography",
            tabImageSrc: Videography,
            data: [
                {
                    skills: [
                        "pre-production",
                        "production",
                        "editing"
                    ],
                    pathname: "/services?service=videography"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 7,
            label: "visual design",
            tabImageSrc: VisualDesign,
            data: [
                {
                    skills: [
                        "art direction"
                    ],
                    pathname: "/services?service=visual-design"
                }
            ]
        }
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
        if (servicesFrameElement.scrollWidth - 1 >= (servicesScrollLeftPosition + servicesFrameWidth)) {
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
        if (servicesFrameElement.scrollWidth -1 >= (servicesScrollLeftPosition + servicesFrameWidth)) {
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
    }

    .services_container {
        position: relative;
        width: 100%;
        overflow-x: auto;
        scroll-behavior: smooth;
    }

    .services_inner {
        position: relative;
        display: grid;
        grid-template-columns: auto auto auto auto;
        column-gap: 1rem;
        row-gap: 1rem;
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
        left: auto;
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
    }

    @media screen and (max-width: 1440px) {

        .services_inner {
            grid-template-columns: auto auto auto;
        }

    }

    @media screen and (max-width: 1080px) {

        .services_inner {
            display: flex;
            flex-direction: row;
            column-gap: none;
            row-gap: none;
            gap: 1rem;
            justify-content: flex-start;
        }
    }

</style>