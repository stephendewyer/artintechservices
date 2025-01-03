<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import ProjectIcon from "$lib/images/icons/project.svg?raw"
    import ProjectsPanel from "$lib/components/tabPanelProjects/ProjectsPanel.svelte";
    import Tabs from "$lib/components/tabPanelProjects/Tabs.svelte";
    import Panel from "$lib/components/tabPanelProjects/Panel.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import SearchInput from "$lib/components/inputs/SearchInput.svelte";

    let activeTabProjects: number = 0;

    let searchInputValue: string = "";

    let searchInputValueChange: boolean = false;

    $: tabPanelsProjects = [
        {
            id: uuidv4(),
            index: 0,
            label: "all",
            tabImageSrc: "",
            panel: ProjectsPanel,
            data: []
        },
        {
            id: uuidv4(),
            index: 1,
            label: "requested",
            tabImageSrc: "",
            panel: ProjectsPanel,
            data: []
        },
        {
            id: uuidv4(),
            index: 2,
            label: "started",
            tabImageSrc: "",
            panel: ProjectsPanel,
            data: []
        },
        {
            id: uuidv4(),
            index: 3,
            label: "completed",
            tabImageSrc: "",
            panel: ProjectsPanel,
            data: []
        },
    ];

</script>

<svelte:head>
	<title>Art in Tech Services - clients' projects</title>
	<meta name="description" content="clients' projects page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<section class="client_projects">
    <div class="client_projects_heading">
        <h1>
            client projects
        </h1>
        <div class="project_icon">
            {@html ProjectIcon}
        </div>
    </div>
    <ActionButtonSecondary>
        start a project
    </ActionButtonSecondary>
    <div class="projects_search">
        <SearchInput 
            placeholder="nameFirst nameLast | project name | XXXXXXXXXX"
            inputID="search projects"
            inputName="search projects"
            inputLabel={true}
            bind:searchInputValue
            bind:searchInputValueChange
        >  
            client | project name | project ID
        </SearchInput>
    </div>
    <h2>
        projects
    </h2>
    <div class="tabs">
        <Tabs 
            tabPanels={tabPanelsProjects} 
            bind:activeTab={activeTabProjects}
        />
    </div>
    <div class="panel">
        <Panel 
            tabPanels={tabPanelsProjects} 
            bind:activeTab={activeTabProjects}
        />
    </div>
</section>
<style>

    .client_projects {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .project_icon {
        width: 8rem;
    }

    .client_projects_heading {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }
</style>