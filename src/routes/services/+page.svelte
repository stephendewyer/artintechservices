<script lang="ts">
    import Panel from "$lib/components/tabPanelServices/Panel.svelte";
    import Tabs from "$lib/components/tabPanelServices/Tabs.svelte";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import { v4 as uuidv4 } from 'uuid';
    import { RequestedServicesStore } from "$lib/stores/RequestedServicesStore";
    import ServicePanel from "$lib/components/tabPanelServices/ServicePanel.svelte";
    import SoftwareDevelopment from "$lib/images/icons/services/software_icon.svg?raw";
    import ArtificialIntelligence from "$lib/images/icons/services/artificial_intelligence_icon.svg?raw";
    import DataVisualization from "$lib/images/icons/services/data_visualization_icon.svg?raw";
    import VisualDesign from "$lib/images/icons/services/visual_design_icon.svg?raw";
    import UserExperienceDesign from "$lib/images/icons/services/UX_design.svg?raw";
    import BrandIdentityDesign from "$lib/images/icons/services/brand_identity_design_Icon.svg?raw";
    import Videography from "$lib/images/icons/services/videography_icon.svg?raw";
    import Photography from "$lib/images/icons/services/camera_icon.svg?raw";
    import DeepNeuralNetwork from "$lib/images/services/example_of_a_deep_neural_network.png";
    import WindSockWindIndicator from "$lib/images/services/wind_socks_for_wind_indicator.jpg";
    import TucsonPhotograph from "$lib/images/services/Tucson,_Arizona_19_April_2024.jpg";
    import Code from "$lib/images/services/coding.jpg";
    import DesignThinking from "$lib/images/services/UX_design.jpg";
    import KauaiHawaiiPoster from "$lib/videos/Kauai,_Hawaii.jpg";
    import KauaiHawaiiVideo from "$lib/videos/Kauai,_Hawaii_30_May_2017.mp4"
    import WaterfallGalaxy from "$lib/images/services/services_background.jpg";
    import ShoppingCart from "$lib/images/icons/shopping_cart_icon.svg?raw";
    import MoveableFarmLogo from "$lib/images/services/moveable_farm_logo.png";
    import CallToActionButton from "$lib/components/buttons/CallToActionButton.svelte";
    import CloseIcon from "$lib/images/icons/close_icon.svg?raw";

    const servicesTabPanels: TabPanel[] = [
        {
            id: uuidv4(),
            index: 0,
            label: "artificial intelligence",
            tabImageSrc: ArtificialIntelligence,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Our expertise in artificial intelligence includes the following technologies:",
                    skills: [
                        "machine learning",
                        "deep learning including artificial neural networks and convolutional neural networks"
                    ],
                    imageSrc: DeepNeuralNetwork,
                    imageAlt: "example of a deep neural network",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=artificial-intelligence"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "brand identity design",
            tabImageSrc: BrandIdentityDesign,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Our expertise in brand identity design includes:",
                    skills: [
                        "brand discovery",
                        "brand definition",
                        "logo design"
                    ],
                    imageSrc: MoveableFarmLogo,
                    imageAlt: "Moveable Farm logo",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=brand-identity-design"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "data visualization",
            tabImageSrc: DataVisualization,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Our expertise in data visualization includes:",
                    skills: [
                        "dynamic data interactivity",
                        "static data visualizations"
                    ],
                    imageSrc: WindSockWindIndicator,
                    imageAlt: "wind sock wind indicator",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=data-visualization"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 3,
            label: "photography",
            tabImageSrc: Photography,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Our expertise in photography includes:",
                    skills: [
                        "staging",
                        "production",
                        "editing"
                    ],
                    imageSrc: TucsonPhotograph,
                    imageAlt: "photo of painted rock in Tucson, Arizona",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=photography"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 4,
            label: "software development",
            tabImageSrc: SoftwareDevelopment,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "We offer software expertise in the development of the following products:",
                    skills: [
                        "websites",
                        "web applications",
                        "embedded software",
                        "native software",
                        "mobile applications",
                        "custom content management development"
                    ],
                    imageSrc: Code,
                    imageAlt: "code",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=software-development"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 5,
            label: "user experience design",
            tabImageSrc: UserExperienceDesign,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Our expertise in user experience design includes:",
                    skills: [
                        "user interface design",
                        "user research",
                        "wire framing",
                        "prototyping"
                    ],
                    imageSrc: DesignThinking,
                    imageAlt: "UX design",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=user-experience-design"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 6,
            label: "videography",
            tabImageSrc: Videography,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Our expertise in videography includes:",
                    skills: [
                        "pre-production",
                        "production",
                        "editing"
                    ],
                    imageSrc: null,
                    imageAlt: null,
                    videoSrc: KauaiHawaiiVideo,
                    videoPoster: KauaiHawaiiPoster,
                    search: "?service=videography"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 7,
            label: "visual design",
            tabImageSrc: VisualDesign,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Our expertise in visual design includes:",
                    skills: [
                        "art direction"
                    ],
                    imageSrc: WaterfallGalaxy,
                    imageAlt: "waterfall galaxy",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=visual-design"
                }
            ]
        }
    ];

    let activeTab: number = 0;

    servicesTabPanels.forEach((tabPanel: TabPanel) => {
        tabPanel.data.forEach((data: ServicePanelData) => {
            if (data.search === $page.url.search) {
                activeTab = tabPanel.index;
            };
        });
    });

    const cancelServiceClickHandler = (serviceSelected: ServiceSelected) => {
        $RequestedServicesStore.forEach((service, index) => {
            if (serviceSelected.service === service.service) {
                $RequestedServicesStore[index].requested = !$RequestedServicesStore[index].requested;
            };
        });
    };

</script>

<svelte:head>
    <title>Art in Tech Services - services</title>
    <meta name="description" content="services" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>services</h1>
    <div class="shopping_container">
        <h2 class="shopping_heading">
                request for my project
            </h2>
        <div class="shopping_tab_container">
            <div class="shopping_tab">
                <div class="shopping_cart">
                    {@html ShoppingCart}
                </div>
                <table class="shopping_items">
                    <tbody>
                        {#each $RequestedServicesStore as service, index}
                            {#if (service.requested === true)}
                                <tr>
                                    <td class="service_selected">
                                        <h4 class="service_heading">
                                            {service.service}
                                        </h4>
                                        <button 
                                            on:click={() => cancelServiceClickHandler(service)}
                                            on:keyup={() => cancelServiceClickHandler(service)}
                                            class="cancel_service_button"
                                        >
                                            {@html CloseIcon}
                                        </button>
                                    </td>
                                </tr>
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="action_tab_container">
                <div class="action_tab">
                    <a href="/request-to-start-a-project">
                        <CallToActionButton >
                            continue to start project request
                        </CallToActionButton>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="tabpanel">
        <div class="tabs_container">
            <Tabs 
                tabPanels={servicesTabPanels} 
                bind:activeTab={activeTab}
            />
        </div>
        <div class="panel_container">
            <Panel 
                tabPanels={servicesTabPanels} 
                bind:activeTab={activeTab}
            />
        </div>
    </div>
</div>

<style>

    .shopping_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 1rem;
        position: relative;
    }

    .shopping_tab_container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
    }

    .shopping_tab {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: start;
        gap: 1rem;
        margin-left: 33%;
    }

    .shopping_heading {
        width: 100%;
        text-align: center;
        font-size: 1.5rem;
        padding: 0 0 1rem 0;
    }

    .shopping_cart {
        width: 8rem;
        fill: #36261E;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    table {
        border-spacing: 0;
        width: 20rem;
        table-layout: fixed;
    }

    tbody > tr {
        height: auto;
        padding: 0;
    }

    .service_heading {
        padding: 0.5rem 1rem;
        margin: 0;
    }

    tbody tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    .action_tab_container {
        display: flex;
        position: relative;
        width: 33%;

    }

    .service_selected {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .cancel_service_button {
        cursor: pointer;
        fill: #36261E;
        width: 1.25rem;
        min-width: 1.25rem;
        margin: 0 0.5rem 0 0;
        background-color: transparent;
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0;
    }

    .action_tab {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .tabpanel {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 1rem;
        max-width: 2000px;
        gap: 1rem;
    }

    .panel_container {
        width: 100%;
    }

    @media screen and (max-width: 1440px) {

    }

    @media screen and (max-width: 1080px) {

        .shopping_tab_container {
            width: 100%;
            justify-content: space-evenly;
        }

        .shopping_tab {
            margin-left: 0;
        }
        
    }
    
    @media screen and (max-width: 720px) {
        .shopping_tab_container {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.5rem;
        }

        .shopping_tab {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: start;
            gap: 0.5rem;
            margin-left: 0;
        }

        .shopping_heading {

            font-size: 1.15rem;
            padding: 0 0 1rem 0;
        }

        .shopping_cart {
            width: 5rem;
            min-width: 5rem;
        }

        table {
            width: 100%;
        }

        .action_tab_container {
            width: 100%;
            justify-content: center;
            align-items: center;
        }

        .action_tab {
            position: relative;
        }

        .tabpanel {
            flex-direction: column;
        }
    }

</style>