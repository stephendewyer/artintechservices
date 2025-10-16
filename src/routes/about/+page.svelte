<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import { afterUpdate, onMount } from "svelte";
    import Panel from "$lib/components/tabPanelAbout/Panel.svelte";
    import Tabs from "$lib/components/tabPanelAbout/Tabs.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import StoryBackground from "$lib/images/about/about-story.jpg";
    import ProcessBackground from "$lib/images/about/about-process.jpg";
    import TeamBackground from "$lib/images/about/about-team.jpg";
    import CareersBackground from "$lib/images/about/about-careers.jpg";
    import AboutPanel from "$lib/components/tabPanelAbout/AboutPanel.svelte";
    import USMap from "$lib/images/maps/Tucson,_AZ.svg";

    const values: string[] = [
        "source locally",
        "overcome obstacles",
        "operate with integrity",
        "continually learn by investing in research and development of products and staff",
        "effectively communicate",
        "demonstrate excellence",
        "implement fairness",
        "design for humans"
    ];

    const aboutTabPanels: TabPanel[] = [
        {
            id: uuidv4(),
            index: 0,
            label: "story",
            tabImageSrc: "",
            panel: AboutPanel,
            data: [
                {
                    heading: "developing imaginative software solutions to human problems using state-of-the-art technology",
                    imageSrc: StoryBackground,
                    imageAlt: "story background featuring nut filled with clouds in the desert",
                    buttonText: "our story",
                    buttonLink: "/about/story"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "process",
            tabImageSrc: "",
            panel: AboutPanel,
            data: [
                {
                    heading: "our approach uses UX design and software development principles learned from years of work and research while tailoring to your project",
                    imageSrc: ProcessBackground,
                    imageAlt: "hands typing on keyboard with hot coffee on table montage",
                    buttonText: "our process",
                    buttonLink: "/about/process"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "team",
            tabImageSrc: "",
            panel: AboutPanel,
            data: [
                {
                    heading: "experts in art and digital technology",
                    imageSrc: TeamBackground,
                    imageAlt: "team member in a remote meeting",
                    buttonText: "our team",
                    buttonLink: "/about/team"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 3,
            label: "careers",
            tabImageSrc: "",
            panel: AboutPanel,
            data: [
                {
                    heading: "want to join our team?",
                    imageSrc: CareersBackground,
                    imageAlt: "woman and man at table with hot coffee working at a computer in the desert",
                    buttonText: "explore careers",
                    buttonLink: "/about/careers"
                }
            ]
        },
    ];

    let activeTab: number = 0;

    let tabsContainerElement: HTMLElement;
    let tabsHeight: number = 0;
    let tabsWidth: number = 0;
    let tabsContainerHeight: number = 0;

    let tabsContainerTopYPosition: number = 0;

    let tabsAbsolute: boolean = false;
    let tabsFixed: boolean = false;

    let innerWidth: number = 0;
    let innerHeight: number = 0;

    let y: number = 0;

    let tabPanelHeight: number = 0;

    onMount(() => {
        tabsContainerTopYPosition = tabsContainerElement.getBoundingClientRect().top + window.scrollY;
    });

    const windowResizeHandler = () => {
        tabsContainerTopYPosition = tabsContainerElement.getBoundingClientRect().top + window.scrollY;
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

    let panelHeight: number = 0;

    let updatedPanelHeight: number = 0;

    afterUpdate(() => {
        updatedPanelHeight = panelHeight;
    });

    const handleScroll = () => {
        tabsContainerTopYPosition = tabsContainerElement.getBoundingClientRect().top + window.scrollY;
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
    <title>Art in Tech Services - about</title>
    <meta name="description" content="about" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <div class="about_sections">
        <h1>about</h1>
        <div class="about_section">
            <h2>
                solving real-world problems for people using innovative software
            </h2>
            <p>
                Software fails to innovate to solve real-world problems for people because of a failure in imagination in creating the software.  We bring the vision and technical expertise to develop innovative software solutions because our software engineers are also art workers.
            </p>
        </div>
        <div class="about_section">
            <h2>
                vision
            </h2>
            <p>
                To artfully craft software that helps clients better serve communities by using state-of-the-art technology and world-class artistic expertise.
            </p>
        </div>
        <div class="about_section">
            <h2>
                mission
            </h2>
            <p>
                Help clients and stakeholders better serve communities by artfully crafting software solutions to problems using art and state-of-the-art technology.
            </p>
        </div>
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
                        tabPanels={aboutTabPanels} 
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
                        tabPanels={aboutTabPanels} 
                        bind:activeTab={activeTab}
                    />
                </div>
            </div>
        </div>
        <div class="location_section">
            <h2>
                location
            </h2>
            <div class="location_image_and_text">
                <div class="image_container">
                    <img src={USMap} alt="map of U.S. showing Art in Tech Services headquarters location" />
                </div>
                <p class="paragraph_container">
                    Art in Tech Services works across the United States and is based in Tucson, Arizona.
                </p>    
            </div>
        </div>
        <div class="about_section">
            <h2>
                pricing
            </h2>
            <p>
                Our prices vary depending on the project, with a simple, single-page website sometimes costing as low as $500 and more complex software like a full-stack web application costing over $60,000.  We work with clients in the beginning of projects to determine the project scope and timeline.  Clients will typically pay an upfront fee to start work and subsequent payments based on milestone achievements.
            </p>
        </div>
        <div class="about_section">
            <h2>
                values
            </h2>
            <p>
                Values that guide our operations and define our business: 
            </p>
            <ul class="values">
                {#each values as value, index}
                    <li>
                        {value}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="about_section">
            <h2>
                organization
            </h2>
            <p>
                Art in Tech Services is a C-Corporation.
            </p>
        </div>
        <div class="about_section">
            <h2>
                shareholders
            </h2>
            <p>
                Art in Tech Services is currently a privately-held corporation.
            </p>
        </div>
    </div>    
</div>
<style>

    .about_sections {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .about_section {
        padding: 0 1rem;
        width: 100%;
        max-width: 40rem;

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
    }

    .panel_container_inner {
        width: 100%;
    }

    .location_section {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 80rem;
    }

    .location_image_and_text {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .paragraph_container {
        width: 50%;
        padding: 0 1rem 0 0;
    }

    .image_container {
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    @media screen and (max-width: 720px) {

        .panel_container {
            min-height: auto;
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