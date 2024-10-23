<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import DefaultProjectImage from "$lib/images/projects/Port_Mansfield_pier.jpg";
    import DeleteButton from "$lib/components/buttons/DeleteButton.svelte";
    import EditButton from "$lib/components/buttons/EditButton.svelte";
    import { DeleteConfirmedStore } from "$lib/stores/DeleteConfirmedStore.js";
    import { DeleteConfirmationStore } from "$lib/stores/DeleteConfirmationStore.js";
    import { ModalOpenStore } from "$lib/stores/ModalOpenStore.js";
    import { goto } from "$app/navigation";
    import ProjectForm from "$lib/components/forms/ProjectForm.svelte";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import BackButton from "$lib/components/buttons/BackButton.svelte";
    import DocumentFileButton from "$lib/components/buttons/DocumentFileButton.svelte";

    export let data;

    let project: Project | undefined = data.projectRow;

    const projectID: number | undefined = data.projectRow.project_ID;

    interface Service {
        service: string;
        requested: boolean
    };

    const services: Service[] = [
        {
            service: "artificial intelligence",
            requested: (project?.artificial_intelligence === 1) ? true : false
        },
        {
            service: "brand identity design",
            requested: (project?.brand_identity_design === 1) ? true : false
        },
        {
            service: "data visualization",
            requested: (project?.data_visualization === 1) ? true : false
        },
        {
            service: "photography",
            requested: (project?.photography === 1) ? true : false
        },
        {
            service: "software development",
            requested: (project?.software_development === 1) ? true : false
        },
        {
            service: "user experience design",
            requested: (project?.user_experience_design === 1) ? true : false
        },
        {
            service: "videography",
            requested: (project?.videography === 1) ? true : false
        },
        {
            service: "visual design",
            requested: (project?.visual_design === 1) ? true : false
        }
    ];

    let servicesInProject: string[] = [];
    
    services.forEach((service) => {
        if (service.requested === true) {
            servicesInProject = [...servicesInProject, service.service]
        };
    });

    let dateCreated: string = "";

    if (project?.date_created) {
        dateCreated = new Date(project?.date_created).toUTCString().slice(0, 16);
    };

    let startDate: string = "";

    if (project?.project_start_date) {
        startDate = new Date(project?.project_start_date).toUTCString().slice(0, 16);
    };

    let endDate: string = "";

    if (project?.project_end_date) {
        endDate = new Date(project?.project_end_date).toUTCString().slice(0, 16);
    };

    interface DeleteItem {
        message: string;
        data: number;
    }

    const deleteProjectHandler = async (project: Project | undefined) => {

        $ModalOpenStore = true;

        const projectData: DeleteItem | any = {
            message: "project",
            data: project?.project_ID
        };

        $DeleteConfirmationStore = projectData;

    };

    const ConfirmedDeleteProject = async (project: Project | undefined) => {

        const response = await fetch("/authenticated-client/api/deleteProject", {
            method: "DELETE",
            body: JSON.stringify({
                project
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let deleteResponse;
        deleteResponse = await response.json();

        if (deleteResponse.success) {
            goto("/authenticated-client/client");
        } else if (deleteResponse.error) {
            console.log("project failed to delete");
        };
    };

    $: if ($DeleteConfirmedStore === true) {
        ConfirmedDeleteProject(project);
        $DeleteConfirmedStore = false;
    };

    let deleteButtonClickHandler: boolean = false;

    $: if (deleteButtonClickHandler) {
        // handle delete button clicked
        deleteProjectHandler(project);
        deleteButtonClickHandler = false;
    };

    let editProject: boolean = false;

    let projectUpdated: boolean = false;

    let pendingProjectUpdate: boolean = false;

    const refreshStartProjectRequest = async (projectID: number | undefined) => {
        pendingProjectUpdate = true;
        const response = await fetch("/authenticated-client/api/getStartProjectRequest", {
            method: "POST",
            body: JSON.stringify({
                projectID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            project = await response.json();
            pendingProjectUpdate = false;
        } else if (!response.ok) {
            console.log("failed to refresh consultation request after update");
            pendingProjectUpdate = false;
        };
    };

    $: if (projectUpdated) {
        // refresh the project data
        editProject = false;
        refreshStartProjectRequest(projectID);
        projectUpdated = false;
    };

</script>

<svelte:head>
	<title>Art in Tech Services - project</title>
	<meta name="description" content="project" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<section class="project">
    <div class="back_button_container">
        <a 
            href="/authenticated-client/client" 
            
        >
            <BackButton>
                projects
            </BackButton>
        </a>
    </div>
    <img 
        class="project_banner" 
        src={(project?.image_URL) ? project?.image_URL : DefaultProjectImage} 
        alt={(project?.image_alt_text) ? project?.image_alt_text : "phases of the moon"}
    />
    <h1>project</h1>
    {#if pendingProjectUpdate}
        <LoadingSpinner />
    {:else if !pendingProjectUpdate}
        {#if !editProject}
            <table class="project_info">
                <colgroup>
                    <col class="left_table_column" />
                    <col class="right_table_column" />
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            services:
                        </td>
                        <td>
                            {servicesInProject.join(", ")}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            about:
                        </td>
                        <td>
                            {project?.project_info}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            start date:
                        </td>
                        <td>
                            {startDate}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            end date:
                        </td>
                        <td>
                            {endDate}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            budget:
                        </td>
                        <td>
                            ${project?.project_budget}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            status:
                        </td>
                        <td>
                            {project?.status}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            date created:
                        </td>
                        <td>
                            {dateCreated}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            document:
                        </td>
                        <td>
                            {#if (project?.document_URL)}
      
                                <DocumentFileButton documentURL={project.document_URL} />
                            {/if}
                        </td>
                    </tr>
                </tbody>
            </table>
            {#if (project?.status === "requested")}
                <div class="buttons_container">
                    <EditButton bind:editClicked={editProject}>
                        edit project request
                    </EditButton>
                    <DeleteButton bind:clicked={deleteButtonClickHandler}>
                        delete project request
                    </DeleteButton>
                </div>
            {/if}
        {:else if (editProject)}
            <ProjectForm 
                project={project} 
                data={data}
                bind:cancelEditProject={editProject}
            />
        {/if}
    {/if}
</section>
<style>

    .project {
        position: relative;
        width: 100%;
        max-width: 60rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 0 1rem 1rem 1rem;
        margin: 0 auto;
    }

    .back_button_container {
        position: relative;
        width: 100%;
    }

    .project_banner {
        max-width: 1920px;
        width: 100%;
        object-fit: cover;
        height: 48rem;
    }

    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
    }

    .left_table_column {
        width: 25%;
    }

    .right_table_column {
        width: 75%;
    }

    @media screen and (max-width: 1440px) {
        .project_banner {
            height: 36rem;;
        }

    }

    @media screen and (max-width: 1080px) {
        .project_banner {
            height: 28rem;;
        }

    }

    @media screen and (max-width: 720px) {

        .project_banner {
            height: 20rem;;
        }

        .left_table_column {
            width: 40%;
        }

        .right_table_column {
            width: 60%;
        }
    }
</style>