<script lang="ts">
    import Tabs from "$lib/components/tabPanelClient/Tabs.svelte";
    import Panel from "$lib/components/tabPanelClient/Panel.svelte";
    import Project from "$lib/images/icons/project.svg?raw";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import PanelProjects from "$lib/components/tabPanelClient/ProjectsPanel.svelte";

    let tabPanelsProjects: TabPanel[];

    let projectRequests: Project[] = [];

    let startedProjects: Project[] = [];

    let completedProjects: Project[] = [];

    let activeTabProjects: number = 0;

    const getClientData = async () => {
        pendingClientData = true;
        const response = await fetch("/authenticated-client/api/getClientData", {
            method: "POST",
            body: JSON.stringify({
                clientEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        clientData = await response.json();

        if (response.ok) {
            clientData.projects?.forEach((project: Project) => {
                if (project.status === "requested") {
                    projectRequests = [...projectRequests, project];
                } else if (project.status === "started") {
                    startedProjects = [...startedProjects, project];
                } else if (project.status === "completed") {
                    completedProjects = [...completedProjects, project];
                };
            });
            pendingClientData = false;
            getClientDataSuccess = true;
        } else if (!response.ok) {
            pendingClientData = false;
            getClientDataSuccess = false;
        };
    };

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

<section class="section_odd">
    <h2 class="section_header">
        projects
        <div class="heading_icon_container">
            {@html Project}
        </div>
    </h2>
    <a href="/authenticated-client/client/request-to-start-a-project">
        <ActionButtonSecondary>
            request to start a project
        </ActionButtonSecondary>
    </a>
    <div class="projects">
        <Tabs 
            tabPanels={tabPanelsProjects} 
            bind:activeTab={activeTabProjects}
        />
        <Panel 
            tabPanels={tabPanelsProjects} 
            bind:activeTab={activeTabProjects}
        />
    </div>
</section>

<style>

    .projects {
        width: 100%;
        max-width: 60rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>