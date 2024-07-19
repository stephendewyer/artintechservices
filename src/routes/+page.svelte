<script lang="ts">
    import MoonShot from "$lib/images/Art_in_Tech_Services_banner.png";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import SliderCaseStudies from "$lib/components/sliders/SliderCaseStudies.svelte";
    import InvestInUS from "$lib/images/maps/source_locally_map.svg?raw";
    import ArtTechExpertise from "$lib/images/expertise.png";
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
                    path: "/request-a-consultation",
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
                    path: "/request-to-start-a-project",
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
                    path: "/login-client",
                    label: "client login"
                },
                {
                    path: "/create-a-client-account",
                    label: "create free client account"
                }                
            ]
        },
    ];

</script>

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
        <div class="intro_paragraph_container">
            <h1 class="intro_paragraph">
                providing creative digital services to help businesses and communities
            </h1>
        </div>
    </div>
    <h2 class="heading_02">
        case studies
    </h2>
    <div class="case_studies_carousel">
        <SliderCaseStudies />
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
    <div class="why_choose_us_item" style="background-color: #DAE3E4;">
        <div 
            class="why_choose_us_image_and_paragraph"
            id="investing_in_local_US_talent"
        >
            <div class="choose_us_image_container">
                <div class="why_choose_us_image">
                    {@html InvestInUS}
                </div>
            </div>
            <div class="why_choose_us_paragraph_container">
                <h3 class="why_choose_us_heading">
                investing in local, world-class talent in the U.S.
                </h3>
                <p class="why_choose_us_paragraph">
                    We provide all of our services from our in-house team in the United States. We invest in building the skills of our workers.  We are a U.S. company.  Working with us is an investment in talent in the United States.
                </p>
            </div>
        </div>
    </div>
    <div class="why_choose_us_item" style="background-color: #F6E7CE;">
        <div 
            class="why_choose_us_image_and_paragraph"
            id="art_and_tech_expertise"
        >
            <div class="why_choose_us_paragraph_container">
                <h3 class="why_choose_us_heading">
                    receive expertise on art and digital technology to create digital products optimized for human experiences
                </h3>
                <p class="why_choose_us_paragraph">
                    We combine the vision and technical expertise to make groundbreaking digital products.
                </p> 
            </div>
            <div class="choose_us_image_container">
                <div class="why_choose_us_image">
                    <img src={ArtTechExpertise} alt="art and tech expertise dumbbell" />
                </div>
            </div>
        </div>
    </div>
    <h2 class="heading_02">
        how to work with us
    </h2>
    <div class="actions">
        {#each howToWorkWithUsCards as howToWorkWithUs, index}
            <WorkWithUsCard card={howToWorkWithUs} />
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

    .case_studies_carousel {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 1rem;
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
        padding: 1rem 1rem 2rem 1rem;;
        justify-content: center;
    }

    .why_choose_us_item {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
    }

    .why_choose_us_heading {
        width: 100%;
        max-width: 40rem;
        text-align: left;
    }

    .why_choose_us_image_and_paragraph {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .choose_us_image_container {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .why_choose_us_image {
        width: 100%;
        max-width: 100rem;
    }

    .why_choose_us_paragraph_container {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .why_choose_us_paragraph {
        width: 100%;
        max-width: 40rem;
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

        .case_studies_carousel {
            padding: 0;
        }

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

        .choose_us_image_container {
            width: 100%;
        }

        .why_choose_us_paragraph_container {
            width: 100%;
        }

        #investing_in_local_US_talent {
            flex-direction: column;
        }

        #art_and_tech_expertise {
            flex-direction: column-reverse;
        }

        .actions {
            flex-direction: column;
            align-items: center;
            padding: 0 0 1rem 0;
        }
    }
    
</style>