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
                    paragraph: "We provide a consultation to help plan your project for success.  During your initial consultation, we will discuss with you the problems you want to solve and your project goals.",
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
                    paragraph: "We research to find the problems that need solving",
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
                    paragraph: "We define the problem to solve.",
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
                    paragraph: "We create designs for possible solutions.",
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
                    paragraph: "We create prototypes to test using a mutually agreeable design.",
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
                    paragraph: "We test the prototypes.",
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
                    paragraph: "We build your digital product based on the prototypes.",
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
                    paragraph: "We deliver your product.",
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