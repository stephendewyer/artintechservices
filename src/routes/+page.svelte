<script lang="ts">
    import MoonShot from "$lib/images/Art_in_Tech_Services_banner.png";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import SliderTestimonials from "$lib/components/sliders/SliderTestimonials.svelte";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import WorkWithUsCard from "$lib/components/cards/WorkWithUsCard.svelte";
    import Consultation from "$lib/images/consultation/white-fluffy-clouds.jpg";
    import StartProject from "$lib/images/projects/Port_Mansfield_pier.jpg";
    import ManageAccount from "$lib/images/manage_account/reduced/wood_doors.jpg";
    import SaguaroCactus from "$lib/images/cactus/saguaro_cactus_cropped.png";
    import WaterfallGalaxy from "$lib/images/services_background/services_background.jpg";
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
    import MoveableFarmWebAppBanner from "$lib/images/case_studies/moveable_farm_web_app/reduced/grass.jpg";
    import SuzanneContiQuiltsBanner from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/reduced/Suzanne_Conti_North_Carolina_01.jpg";
    import JoyfoodlyBanner from "$lib/images/case_studies/Joyfoodly_website/reduced/Joyfoodly_recipe.jpg";
    import CaseStudyCardElement from "$lib/components/cards/CaseStudyCard.svelte";
    import MoveableFarmDesktopAndMobilePrototypes from "$lib/images/case_studies/moveable_farm_web_app/reduced/moveable_farm_prototypes.png";
    import SuzanneContiQuiltsDesktopAndMobilePrototypes from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/reduced/Suzanne_Conti_Quilts_prototypes.png";
    import JoyfoodlyDesktopAndMobilePrototypes from "$lib/images/case_studies/Joyfoodly_website/reduced/Joyfoodly_prototypes.png";
    import { onMount } from "svelte";
    import ArrowButtonNext from "$lib/components/buttons/ArrowButtonNext.svelte";
    import ArrowButtonPrevious from "$lib/components/buttons/ArrowButtonPrevious.svelte";

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

    const howToWorkWithUsCards: HowToWorkWithUsCard[] = [
        {
            image: Consultation,
            altText: "fluffly clouds",
            header: "FREE first consultation",
            paragraph: "We discuss with you your project to help plan for success.  Your first consultation is free.  Each consultation after the first consultation is $65 per hour.",
            pathname: [
                {
                    path: "/work-with-us/request-a-consultation",
                    label: "request a consultation"
                }
            ]
        },
        {
            image: StartProject,
            altText: "ocean pier",
            header: "start a project",
            paragraph: "We provide the services to deliver your project to meet or exceed your expectations.",
            pathname: [
                {
                    path: "/work-with-us/request-to-start-a-project",
                    label: "request to start a project"
                }
            ]
        },
        {
            image: ManageAccount,
            altText: "locked doors",
            header: "manage account",
            paragraph: "Keep your projects organized, view and schedule your consultations, update your account and make payments.",
            pathname: [
                {
                    path: "/logins/login-client",
                    label: "client login"
                },
                {
                    path: "/create-a-client-account",
                    label: "create free client account"
                }                
            ]
        },
    ];

    let introVisible: boolean = false;

    onMount(() => {
        setTimeout(() => introVisible = true, 300);
    })

    let scrollCaseStudiesPreviousClicked: boolean = false;
    let scrollCaseStudiesNextClicked: boolean = false;
    let prevCaseStudiesBtnEnabled: boolean = true;
    let nextCaseStudiesBtnEnabled: boolean = true;

    let caseStudiesInnerElement: HTMLElement;
    let caseStudiesFrameElement: HTMLElement;

    let caseStudiesFrameWidth: number = 0;
    let caseStudiesInnerWidth: number = 0;

    $: if (caseStudiesFrameElement) {
        if (caseStudiesFrameElement.scrollLeft === 0) {
            console.log("case studies element scrolled to beginning")
        } else if (caseStudiesFrameElement.scrollLeft > 0) {
            console.log("case studies element scroll not at beginning")
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
        if (caseStudiesFrameElement.scrollWidth >= (caseStudiesScrollLeftPosition + caseStudiesFrameWidth)) {
            nextCaseStudiesBtnEnabled = true;
        } else {
            nextCaseStudiesBtnEnabled = false;
        }
    }

    const handleWindowResize = () => {
        caseStudiesScrollLeftPosition = caseStudiesFrameElement.scrollLeft;
        if (caseStudiesFrameElement.scrollWidth >= (caseStudiesScrollLeftPosition + caseStudiesFrameWidth)) {
            nextCaseStudiesBtnEnabled = true;
        } else {
            nextCaseStudiesBtnEnabled = false;
        }
    }

    $: if (scrollCaseStudiesPreviousClicked) {
        if (caseStudiesScrollLeftPosition > 0) {
            caseStudiesFrameElement.scrollLeft = caseStudiesScrollLeftPosition - (caseStudiesFrameWidth/2);
        }
        scrollCaseStudiesPreviousClicked = false;
    }

    $: if (scrollCaseStudiesNextClicked) {
        if (caseStudiesScrollLeftPosition < (caseStudiesScrollLeftPosition + caseStudiesFrameWidth)) {
            caseStudiesFrameElement.scrollLeft = caseStudiesScrollLeftPosition + (caseStudiesFrameWidth/2);
        }
        scrollCaseStudiesNextClicked = false;
    }

</script>

<svelte:window 
    on:resize={handleWindowResize}
/>

<svelte:head>
    <title>Art in Tech Services - providing creative digital services to help businesses and communities</title>
    <meta name="description" content="creating digital products optimized to improve human experiences of technology by using advancements in art and digital technology" />
    <meta property="og:image" content={ArtInTechServicesBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN}/>
</svelte:head>
<div>
    <div class="intro_banner">
        <img class="banner_image" src={MoonShot} alt="moonshot"/>
        <div class="saguaro_cactus_container">
            <img class="saguaro_cactus" src={SaguaroCactus} alt="saguaro cactus" />
        </div>
        <div 
            class="intro_paragraph_container"
            style={introVisible ? "opacity: 100%;" : "opacity: 0%;"}
        >
            <h1 class="intro_paragraph">
                providing creative digital services to help businesses and communities
            </h1>
        </div>
    </div>
    <h2 class="heading_02">
        case studies
    </h2>
    <div class="case_studies_section">
        <div 
            bind:clientWidth={caseStudiesFrameWidth}
            on:scroll={handleCaseStudiesScroll}
            bind:this={caseStudiesFrameElement}
            class="case_studies_container"
        >
            <div 
                bind:clientWidth={caseStudiesInnerWidth}
                bind:this={caseStudiesInnerElement}
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
    <div class="services_container">
        <img class="services_background_image" src={ WaterfallGalaxy} alt="waterfall with galactic pool"/>
        <h2 class="heading_02" style="color: #F4FEF2; position: relative">
            services we provide
        </h2>
        <div class="services">
            {#each serviceCards as serviceCard, index}
                <CardService service_data={serviceCard} />
            {/each}
        </div>
    </div>
    <h2 class="heading_02">
        why choose us?
    </h2>
    <p class="why_choose_us_paragraphs">
        We offer unmatched value by creating the digital products that help our clients transform to produce greater value for their communities.<br/><br/>
        Whereas traditional digital technology companies separate art from engineering, we combine the two. We use state-of-the-art technologies in creative ways that improve human experiences of technology.<br /><br />
        Working with us means working with some of the top experts in art and digital technology in the world. Our staff work in the United States and have been internationally recognized for their work. We are committed to growing talent in the United States. We invest in training our staff in state-of-the-art technologies.
    </p>
    <h2 class="heading_02">
        testimonials
    </h2>
    <SliderTestimonials />
    <h2 class="heading_02">
        how to work with us
    </h2>
    <div class="actions">
        {#each howToWorkWithUsCards as howToWorkWithUs, index}
            <WorkWithUsCard 
                card={howToWorkWithUs}
            />
        {/each}
    </div>
</div>

<style>

    .intro_banner {
        position: relative;
        width: 100%;
    }

    .banner_image {
        position: relative;
        width: 100%;
        object-fit: cover;
        object-position: top;
        height: 60rem;
        display: flex;
    }

    .intro_paragraph_container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        transition: opacity 0.2s linear;
    }

    .saguaro_cactus_container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
    }

    .saguaro_cactus {
        height: 100%;
        padding-top: 4rem;
        width: auto;
        margin-left: 12.5%;
    }

    .intro_paragraph {
        background: rgb(244,254,242, 0.75);
        padding: 0.5rem 1rem;
        max-width: 50%;
        width: auto;
        text-align: left;
    }

    .heading_02 {
        text-align: center;
        padding: 1rem;
    }

    .case_studies_section {
        position: relative;
        margin: 0 1rem 1rem 1rem;
    }

    .case_studies_container {
        position: relative;
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
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

    .services_container {
        position: relative;
    }

    .services_background_image {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    .services {
        position: relative;
        display: grid;
        grid-template-columns: auto auto auto auto;
        column-gap: 1rem;
        row-gap: 1rem;
        padding: 1rem 1rem 2rem 1rem;
        justify-content: center;
    }

    .why_choose_us_paragraphs {
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .actions {
        max-width: 1440px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding: 1rem 1rem 4rem 1rem;
        gap: 1rem;
    }

    

    @media screen and (max-width: 1440px) {
        .banner_image {
            height: 42rem;
        }

        .saguaro_cactus {
            padding-top: 4rem;
        }

        .services {
            grid-template-columns: auto auto auto;
        }
    }

    @media screen and (max-width: 1080px) {

        .banner_image {
            height: 34rem;
        }
        .intro_paragraph {
            padding: 0.375rem 0.75rem;
        }

        .saguaro_cactus {
            padding-top: 8rem;
        }

        .services {
            display: flex;
            flex-direction: row;
            column-gap: none;
            row-gap: none;
            gap: 1rem;
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: hidden;
        }
    }

    @media screen and (max-width: 720px) {

        .intro_banner {
            padding: 0;
        }

        .banner_image {
            height: 24rem;
            object-fit: cover;
        }

        .saguaro_cactus {
            padding-top: 8rem;
            margin-left: 0.25rem;
        }

        .intro_paragraph {
            padding: 0.25rem 0.5rem;
            max-width: 60%;
        }

        .actions {
            flex-direction: column;
            align-items: center;
            padding: 0 1rem 1rem 1rem;
        }

        .why_choose_us_paragraphs {
            width: 100%;
            max-width: 40rem;
            margin: 0;
            padding: 0 1rem;
        }
    }
    
</style>