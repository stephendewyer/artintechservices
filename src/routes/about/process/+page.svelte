<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import { v4 as uuidv4 } from 'uuid';
    import TabsProcess from "$lib/components/tabPanelProcess/Tabs.svelte";
    import PanelProcess from "$lib/components/tabPanelProcess/Panel.svelte";
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw";
    import ProcessPanel from "$lib/components/tabPanelProcess/ProcessPanel.svelte";
    import Consultation from "$lib/images/icons/process/process_01.svg?raw";
    import Ideation from "$lib/images/icons/process/process_02.svg?raw";
    import Build from "$lib/images/icons/process/process_03.svg?raw";
    import Deliver from "$lib/images/icons/process/process_04.svg?raw";
    import Prototype from "$lib/images/icons/process/prototype.svg?raw";
    import Test from "$lib/images/icons/process/test.svg?raw";
    import Define from "$lib/images/icons/process/define.svg?raw";
    import Research from "$lib/images/icons/process/research.svg?raw";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";

    let activeTab: number = 0;
    
    const processTabPanels: TabPanel[] = [
        {
            id: uuidv4(),
            index: 0,
            label: "constult",
            tabImageSrc: Arrow,
            panel: ProcessPanel,
            data: [
                {
                    paragraph: "We provide a consultation to help plan your project for success. During your initial consultation, we will discuss with you the problems you want to solve and your project goals.  Initial consultations usually last with 20 minutes to an hour and can happen via in-person meeting, phone or video.",
                    button: ActionButtonSecondary,
                    imageSrc: Consultation,
                    imageAlt: "mug on a table with steam"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "research",
            tabImageSrc: Arrow,
            panel: ProcessPanel,
            data: [
                {
                    paragraph: "From the consultation, we will research the exact problems to solve using a variety of methods that could include empathizing with the user, conducting user interviews, creating user personas, studying user data and researching the market and user context.  We may require a contract for extensive research.",
                    button: null,
                    imageSrc: Research,
                    imageAlt: "magnifying glass with eye"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "define",
            tabImageSrc: Arrow,
            panel: ProcessPanel,
            data: [
                {
                    paragraph: "Using the information we gathered from the consultation and our research, we will write a contract that specifies the project scope, goals and timeline.  The contract helps clearly set project expectations for everyone.  We do our best to avoid any surprises that might happen between the consultation and delivery of a contract.  ",
                    button: null,
                    imageSrc: Define,
                    imageAlt: "target"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 3,
            label: "ideate",
            tabImageSrc: Arrow,
            panel: ProcessPanel,
            data: [
                {
                    paragraph: "After the contract has been signed, we brainstorm possible solutions using a variety of designs.  We work with you to select design solutions that work best for your project.",
                    button: null,
                    imageSrc: Ideation,
                    imageAlt: "ideation"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 4,
            label: "prototype",
            tabImageSrc: Arrow,
            panel: ProcessPanel,
            data: [
                {
                    paragraph: "The prototypes are tested in high-fidelity scenarios to determine if they are suitable for the project.  We can make changes much quicker to the prototypes than live code.",
                    button: null,
                    imageSrc: Prototype,
                    imageAlt: "prototype cube"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 5,
            label: "test",
            tabImageSrc: Arrow,
            panel: ProcessPanel,
            data: [
                {
                    paragraph: "After designs have been selected, we prototype your designs to allow us to test your designs in high-fidelity scenarios.",
                    button: null,
                    imageSrc: Test,
                    imageAlt: "checkmark"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 6,
            label: "build",
            tabImageSrc: Arrow,
            panel: ProcessPanel,
            data: [
                {
                    paragraph: "Once the prototypes are approved, we build software using the prototype designs.  We test the code using a variety of methods to determine browser compatibility, accessibility, speed and to find any bugs. ",
                    button: null,
                    imageSrc: Build,
                    imageAlt: "hands at a keyboard coding"
                }
            ]
        },
        {
            id: uuidv4(),
            index: 7,
            label: "deliver",
            tabImageSrc: Arrow,
            panel: ProcessPanel,
            data: [
                {
                    paragraph: "After the software is built, we deliver the software, which typically involves deploying the software onto a server and sometimes server setup.  We iterate and test throughout the process in order to ensure the software delivery is a success.  We communicate throughout the process to ensure the arrival of software is on time and meeting requirements.",
                    button: null,
                    imageSrc: Deliver,
                    imageAlt: "delivering a checkmark"
                }
            ]
        }
    ];
</script>
<svelte:head>
    <title>Art in Tech Services - process</title>
    <meta name="description" content="process" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <h1>
        process
    </h1>
    <div class="tabpanel">
        <div class="tabs_container">
            <TabsProcess 
                tabPanels={processTabPanels} 
                bind:activeTab={activeTab}
            />
        </div>
        <div class="panel_container">
            <PanelProcess
                tabPanels={processTabPanels} 
                bind:activeTab={activeTab}
            />
        </div>
    </div>
</div>
<style>

    .tabpanel {
        width: 100%;
        max-width: 2000px;
    }

</style>