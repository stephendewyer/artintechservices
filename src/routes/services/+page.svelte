<script lang="ts">
    import Panel from "$lib/components/tabPanelServices/Panel.svelte";
    import Tabs from "$lib/components/tabPanelServices/Tabs.svelte";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
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
    import SeamlessFingerprintBackground from "$lib/images/services/fingerprint_seamless_background.jpg";
    import WindSockWindIndicator from "$lib/images/services/wind_socks_for_wind_indicator.jpg";
    import TucsonPhotograph from "$lib/images/services/Tucson,_Arizona_19_April_2024.jpg";
    import Code from "$lib/images/services/coding.jpg";
    import DesignThinking from "$lib/images/services/UX_design.jpg";
    import VideoCamera from "$lib/images/services/videography.jpg";
    import OakTree from "$lib/images/services/Savannah,_Georgia.jpg";
    import ShoppingCart from "$lib/images/icons/shopping_cart_icon.svg?raw";
    import CallToActionButton from "$lib/components/buttons/CallToActionButton.svelte";

    import { page } from "$app/stores";

    const servicesTabPanels: TabPanel[] = [
        {
            id: uuidv4(),
            index: 0,
            label: "artificial intelligence",
            tabImageSrc: ArtificialIntelligence,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Expertise in artificial intelligence including:",
                    skills: [
                        "data preprocessing",
                        "regression",
                        "classification",
                        "clustering",
                        "association rule learning",
                        "reinforcement learning",
                        "natural language processing",
                        "deep learning including artificial neural networks and convolutional neural networks",
                        "dimensionality reduction",
                        "model selection and boosting including XGBoost"
                    ],
                    imageSrc: DeepNeuralNetwork,
                    imageAlt: "example of a deep neural network",
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
                    paragraph: "Expertise in brand identity design including:",
                    skills: [
                        "brand discovery",
                        "brand definition",
                        "logo design"
                    ],
                    imageSrc: SeamlessFingerprintBackground,
                    imageAlt: "seamless fingerprint pattern",
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
                    paragraph: "Expertise in data visualization including:",
                    skills: [
                        "D3.js"
                    ],
                    imageSrc: WindSockWindIndicator,
                    imageAlt: "wind sock wind indicator",
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
                    paragraph: "Expertise in photography including:",
                    skills: [
                        "production",
                        "editing"
                    ],
                    imageSrc: TucsonPhotograph,
                    imageAlt: "photo of painted rock in Tucson, Arizona",
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
                    paragraph: "Expertise in software development including:",
                    skills: [
                        "web development",
                        "native software development",
                        "embedded software development",
                        "geocoding",
                        "software architecture",
                        "eCommerce",
                        "database design",
                        "user interface development",
                        "Section 508 and WCAG 2.1 compliance",
                        "custom content management development"
                    ],
                    imageSrc: Code,
                    imageAlt: "code",
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
                    paragraph: "Expertise in user experience design including:",
                    skills: [
                        "user interface design",
                        "user research",
                        "wire framing",
                        "prototyping",
                        "information architecture",
                        "user interviews",
                        "creating user flows",
                        "5 stage design thinking",
                        "responsive design",
                        "content strategy",
                        "copy writing and editing"
                    ],
                    imageSrc: DesignThinking,
                    imageAlt: "UX design",
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
                    paragraph: "Expertise in videography including:",
                    skills: [
                        "production",
                        "editing"
                    ],
                    imageSrc: VideoCamera,
                    imageAlt: "video camera",
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
                    paragraph: "Expertise in visual design including:",
                    skills: [
                        "interface aesthetics",
                        "visual commmunication"
                    ],
                    imageSrc: OakTree,
                    imageAlt: "Oak tree",
                    search: "?service=visual-design"
                }
            ]
        }
    ];

    let activeTab: number = 0;

    servicesTabPanels.forEach(tabPanel => {
        tabPanel.data.forEach((data: ServicePanel) => {
            if (data.search === $page.url.search) {
                activeTab = tabPanel.index;
            };
        });
    });

</script>
<svelte:head>
    <title>Art in Tech Services - services</title>
    <meta name="description" content="case studies" />
    <meta property="og:image" content={ArtInTechServicesBanner} />
    <meta property="og:url" content="https://artintechservices.vercel.app/services" />
    <meta name="robots" content="index, follow" />
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
                                    <td>
                                        <h4 class="service_heading">
                                            {service.service}
                                        </h4>
                                    </td>
                                </tr>
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="action_tab_container">
                <div class="action_tab">
                    <CallToActionButton >
                        continue to start project request
                    </CallToActionButton>
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
        height:auto;
        padding: 0;
    }

    .service_heading {
        padding: 0.5rem 1rem;
        margin: 0;
    }

    tbody tr:nth-child(odd) {
        background-color: #CBC6C2;
    }

    .action_tab_container{
        position: relative;
        width: 33%;
    }

    .action_tab {
        position: absolute;
        left: 0;
        right: 0;
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
    
    @media screen and (max-width: 720px) {
        .tabpanel {
            flex-direction: column;
        }
    }

</style>