<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import Tabs from "$lib/components/tabPanelClient/Tabs.svelte";
    import Panel from "$lib/components/tabPanelClient/Panel.svelte";
    import Project from "$lib/images/icons/project.svg?raw";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import PanelProjects from "$lib/components/tabPanelClient/ProjectsPanel.svelte";
    import { onMount } from "svelte";

    const clientEmail = $page.data.streamed.user?.email;

    let tabPanelsProjects: TabPanel[];

    let projects: Project[] = [];

    let projectRequests: Project[] = [];

    let startedProjects: Project[] = [];

    let completedProjects: Project[] = [];

    let activeTabProjects: number = 0;

    let pendingProjects: boolean = false;

    const getProjects = async () => {
        pendingProjects = true;
        const response = await fetch("/authenticated-client/api/getProjects", {
            method: "POST",
            body: JSON.stringify({
                clientEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        projects = await response.json();

        console.log(projects)

        if (response.ok) {
            projects?.forEach((project: Project) => {
                if (project.status === "requested") {
                    projectRequests = [...projectRequests, project];
                } else if (project.status === "started") {
                    startedProjects = [...startedProjects, project];
                } else if (project.status === "completed") {
                    completedProjects = [...completedProjects, project];
                };
            });
            pendingProjects = false;
        } else if (!response.ok) {
            pendingProjects = false;
        };
    };

    onMount(() => {
        getProjects();
    })

    $: tabPanelsProjects = [
        {
            id: uuidv4(),
            index: 0,
            label: "project requests",
            tabImageSrc: "",
            panel: PanelProjects,
            data: [...projectRequests]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "started projects",
            tabImageSrc: "",
            panel: PanelProjects,
            data: [...startedProjects]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "completed projects",
            tabImageSrc: "",
            panel: PanelProjects,
            data: [...completedProjects]
        },
    ];

</script>

<svelte:head>
	<title>Art in Tech Services - my projects</title>
	<meta name="description" content="my projects page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<section class="projects_section">
    <h1 class="section_header">
        projects
        <div class="heading_icon_container">
            {@html Project}
        </div>
    </h1>
    <a href="/authenticated-client/client/request-to-start-a-project">
        <ActionButtonSecondary>
            start a project
        </ActionButtonSecondary>
    </a>
    <div class="projects">
        {#if pendingProjects}
            <LoadingSpinner />
        {:else}
            <Tabs 
                tabPanels={tabPanelsProjects} 
                bind:activeTab={activeTabProjects}
            />
            <Panel 
                tabPanels={tabPanelsProjects} 
                bind:activeTab={activeTabProjects}
            />
        {/if}
    </div>
</section>

<style>

    .projects_section {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .section_header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .heading_icon_container {
        width: 12rem;
    }

    .projects {
        width: 100%;
        max-width: 80rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 1rem 1rem 1rem;
    }

</style>