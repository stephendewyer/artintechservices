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
    import VisualDesign from "$lib/images/icons/services/visual_design_icon.svg?raw";
    import UserExperienceDesign from "$lib/images/icons/services/UX_design.svg?raw";
    import Code from "$lib/images/services/coding.jpg";
    import DesignThinking from "$lib/images/services/UX_design.jpg";
    import ShoppingCart from "$lib/images/icons/shopping_cart_icon.svg?raw";
    import CallToActionButton from "$lib/components/buttons/CallToActionButton.svelte";
    import CloseIcon from "$lib/images/icons/close_icon.svg?raw";
    import { afterUpdate, onMount } from "svelte";
    import MoveableFarmLogo from "$lib/images/case_studies/moveable_farm_web_app/moveable_farm_logo.png"

    const servicesTabPanels: TabPanel[] = [
        {
            id: uuidv4(),
            index: 0,
            label: "web development",
            tabImageSrc: SoftwareDevelopment,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "We offer expertise in the development of the websites and full-stack web applications including:",
                    skills: [
                        "accessibility, WCAG and Section 503 compliance",
                        "modern web technologies like SvelteKit and Next.js",
                        "data visualization",
                        "search engine optimization best practices",
                        "web analytics",
                        "e-commerce",
                        "database design and management",
                        "custom content management systems",
                        "AI and machine learning",
                        "hosting setup",
                        "cybersecurity",
                        "cross-browser compatibility",
                        "mobile and desktop applications"
                    ],
                    imageSrc: Code,
                    imageAlt: "code",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=web-development"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 1,
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
                        "prototyping",
                        "responsive design"
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
            index: 2,
            label: "art direction",
            tabImageSrc: VisualDesign,
            panel: ServicePanel,
            data: [
                {
                    paragraph: "Our expertise in art direction includes:",
                    skills: [
                        "brand identity design",
                        "visual design",
                        "videography",
                        "photography",
                        "2-D and 3-D animation",
                    ],
                    imageSrc: MoveableFarmLogo,
                    imageAlt: "Moveable Farm logo",
                    videoSrc: null,
                    videoPoster: null,
                    search: "?service=art-direction"
                }
            ]
        },
    ];

    let activeTab: number = 0;

    $: servicesTabPanels.forEach((tabPanel: TabPanel) => {
        tabPanel.data.forEach((data: ServicePanelData) => {
            if (data.search === $page.url.search) {
                activeTab = tabPanel.index;
            };
        });
    });

    $: console.log("active tab: ", activeTab)

    const cancelServiceClickHandler = (serviceSelected: ServiceSelected) => {
        $RequestedServicesStore.forEach((service, index) => {
            if (serviceSelected.service === service.service) {
                $RequestedServicesStore[index].requested = !$RequestedServicesStore[index].requested;
            };
        });
    };

    let tabsContainerElement: HTMLElement;
    let tabsHeight: number = 0;
    let tabsWidth: number = 0;
    let tabsContainerHeight: number = 0;

    let tabsContainerTopYPosition: number = 0;

    let tabsAbsolute: boolean = false;
    let tabsFixed: boolean = false;

    let shoppingCartContainerElement: HTMLElement;
    let shoppingCartHeight: number = 0;
    let shoppingCartContainerHeight: number = 0;
    let shoppingCartContainerWidth: number = 0;

    let shoppingCartContainerYPosition: number = 0;

    let shoppingCartAbsolute: boolean = false;
    let shoppingCartFixed: boolean = false;

    let innerWidth: number = 0;
    let innerHeight: number = 0;

    let y: number = 0;

    let tabPanelHeight: number = 0;

    onMount(() => {
        tabsContainerTopYPosition = tabsContainerElement.getBoundingClientRect().top + window.scrollY;
        shoppingCartContainerYPosition = shoppingCartContainerElement.getBoundingClientRect().top + window.scrollY;
    });

    const windowResizeHandler = () => {
        tabsContainerTopYPosition = tabsContainerElement.getBoundingClientRect().top + window.scrollY;
        shoppingCartContainerYPosition = shoppingCartContainerElement.getBoundingClientRect().top + window.scrollY;
    };

    // handle tabsFixed
    $: if (innerWidth > 720) {
        if (y > tabsContainerTopYPosition && y < (tabsContainerTopYPosition + (tabsContainerHeight - tabsHeight))) {
            tabsFixed = true;
        } else {
            tabsFixed = false;
        }
    } else if (innerWidth <= 720) {
        if (y > tabsContainerTopYPosition && y < (tabsContainerTopYPosition + (tabPanelHeight - tabsHeight))) {
            tabsFixed = true;
        } else {
            tabsFixed = false;
        }
    }

    // handle tabsAbsolute
    $: if (innerWidth > 720) {
        if (y >= (tabsContainerTopYPosition + (tabsContainerHeight - tabsHeight))) {
            tabsAbsolute = true;
        } else {
            tabsAbsolute = false;
        };
    } else if (innerWidth <= 720) {
        if (y >= (tabsContainerTopYPosition + (tabPanelHeight - tabsHeight))) {
            tabsAbsolute = true;
        } else {
            tabsAbsolute = false;
        };
    }; 

    // handle shoppingCartFixed

    $: if (y >= shoppingCartContainerYPosition && y < (shoppingCartContainerYPosition + (shoppingCartContainerHeight - shoppingCartHeight))) {
        shoppingCartFixed = true;
    } else {
        shoppingCartFixed = false;
    };

    $: if (y >= (shoppingCartContainerYPosition + (shoppingCartContainerHeight - shoppingCartHeight))) {
        shoppingCartAbsolute = true;
    } else {
        shoppingCartAbsolute = false;
    };

    let panelHeight: number = 0;

    let updatedPanelHeight: number = 0;

    afterUpdate(() => {
        updatedPanelHeight = panelHeight;
    });

    // $: console.log("panelInnerHeight: ", panelHeight);
    // $: console.log("panelContainerHeight: ", updatedPanelHeight);

    const handleScroll = () => {
        tabsContainerTopYPosition = tabsContainerElement.getBoundingClientRect().top + window.scrollY;
        shoppingCartContainerYPosition = shoppingCartContainerElement.getBoundingClientRect().top + window.scrollY;
    };

</script>
<svelte:window 
    bind:scrollY={y}
    bind:innerWidth
    bind:innerHeight
    on:resize={windowResizeHandler}
	on:scroll={handleScroll}
/>
<svelte:head>
    <title>Art in Tech Services - services</title>
    <meta name="description" content="services" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>services</h1>
    <div class="services_tabpanel_and_selection">
        <div 
            bind:clientHeight={tabPanelHeight}
            class="tabpanel"
        >
            <div 
                bind:this={tabsContainerElement}
                bind:clientHeight={tabsContainerHeight}
                class="tabs_container"
                style={innerWidth >= 720 ? `width: ${tabsWidth}px; min-width: ${tabsWidth}px;`: "left: 0; right: 0;"}
            >
                <div 
                    id="tabs"
                    class={tabsAbsolute ? "tabs_absolute" : tabsFixed ? "tabs_fixed": "tabs_relative"}
                    bind:clientHeight={tabsHeight}
                >
                    <Tabs 
                        bind:tabsWidth={tabsWidth}
                        tabPanels={servicesTabPanels} 
                        bind:activeTab={activeTab}
                    />
                </div>
            </div>
            <div class="panel_container" >
                <div 
                    bind:clientHeight={panelHeight}
                    class="panel_container_inner"
                    style={innerWidth < 720 && (tabsAbsolute || tabsFixed ) ? `padding-top: ${tabsHeight}px;` : ""}
                >
                    <Panel 
                        tabPanels={servicesTabPanels} 
                        bind:activeTab={activeTab}
                    />
                </div>
            </div>
        </div>
        <div 
            bind:this={shoppingCartContainerElement}
            bind:clientHeight={shoppingCartContainerHeight}
            class="shopping_container"
            bind:clientWidth={shoppingCartContainerWidth}
        >
            <div 
                id="shopping_cart_inner"
                class={innerWidth >= 720 ? shoppingCartAbsolute ? "shopping_cart_inner_absolute" : shoppingCartFixed ? "shopping_cart_inner_fixed" : "shopping_cart_inner_relative": "shopping_cart_inner_relative"}
                style={innerWidth >= 720 ? `width: ${shoppingCartContainerWidth}px; min-width: ${shoppingCartContainerWidth}px;` : "width: 100%;"}
            >
                <div class="selected_services_icon_and_heading">
                    <div class="shopping_cart">
                        {@html ShoppingCart}
                    </div>
                    <h2 class="selected_services_heading">
                        my project services
                    </h2>
                </div>
                <table class="shopping_items">
                    <tbody>
                        {#each $RequestedServicesStore as service, index}
                            {#if (service.requested === true)}
                                <tr>
                                    <td class="service_selected">
                                        <p class="service_heading">
                                            {service.service}
                                        </p>
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
                <a href="/how-to-work-with-us/request-to-start-a-project" >
                    <CallToActionButton >
                        start project
                    </CallToActionButton>
                </a>
            </div>
        </div>
    </div>
</div>

<style>

    .services_tabpanel_and_selection {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        max-width: 2000px;
    }

    .tabpanel {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 1rem;
        gap: 1rem;
    }

    #tabs {
        z-index: 2;
    }

    .tabs_container {
        position: relative;
    }

    .tabs_relative {
        position: relative;
    }

    .tabs_fixed {
        position: fixed;
        top: 0;
        background-color: #F9E4CD;
    }

    .tabs_absolute {
        position: absolute;
        top: auto;
        bottom: 0;
        left: 0;
        right:0;
        background-color: #F9E4CD;
        z-index: 2;
    }

    .panel_container {
        width: 100%;
        will-change: height;
        transition: height 0.550s linear;
        min-height: 100vh;
    }

    .panel_container_inner {
        width: 100%;
    }

    .shopping_container {
        position: relative;
        width: 25%;
        min-width: 25%;
    }

    #shopping_cart_inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
    }

    .shopping_cart_inner_relative {
        position: relative;
    }

    .shopping_cart_inner_fixed {
        position: fixed;
        top: 0;
    }

    .shopping_cart_inner_absolute {
        position: absolute;
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .shopping_cart {
        width: 4rem;
        fill: #36261E;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    table {
        width: 100%;
        border-spacing: 0;
        table-layout: fixed;
    }

    tbody > tr {
        height: auto;
        padding: 0;
    }

    .service_heading {
        padding: 0rem 1rem;
        margin: 0;
    }

    tbody tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    .selected_services_icon_and_heading {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
    }

    .selected_services_heading {
        font-size: 1.5rem;
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
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        padding: 0;
    }

    @media screen and (max-width: 1440px) {
        .selected_services_heading {
            font-size: 1.35rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .selected_services_heading {
            font-size: 1.15rem;
        }
    }
    
    @media screen and (max-width: 720px) {

        .panel_container {
            min-height: auto;
        }

        .services_tabpanel_and_selection {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 2000px;
        }

        .shopping_container {
            width: 100%;
            min-width: 100%;
        }

        .shopping_cart {
            width: 3.5rem;
            min-width: 3.5rem;
        }

        .selected_services_heading {
            font-size: 1rem;
        }

        .tabpanel {
            flex-direction: column;
        }

        .tabs_fixed {
            position: fixed;
            top: 0;
            left: 1rem;
            right: 1rem;
        }
    }

</style>