<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import DefaultProjectImage from "$lib/images/projects/default_project_image.jpg";
  import DeleteButton from "$lib/components/buttons/DeleteButton.svelte";
  import EditButton from "$lib/components/buttons/EditButton.svelte";

    export let data;

    const project: Project | undefined = data.projectRow;

    console.log(project);

    interface Service {
        service: string;
        requested: boolean
    }

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

    let deleteButtonClickHandler: boolean = false;

    $: if (deleteButtonClickHandler) {
        // handle delete button clicked
    };

    let editButtonClickHandler: boolean = false;

    $: if (editButtonClickHandler) {
        // handle edit button clicked
    }

</script>

<svelte:head>
	<title>Art in Tech Services - project</title>
	<meta name="description" content="project" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <img 
            class="project_banner" 
            src={(project?.image_URL) ? project?.image_URL : DefaultProjectImage} 
            alt={(project?.image_alt_text) ? project?.image_alt_text : "phases of the moon"}
    />
    <div class="project">
        <h1>project</h1>
        <table>
            <colgroup>
                <col class="left_table_column" />
                <col class="right_table_column" />
            </colgroup>
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
        </table>
        {#if (project?.status === "requested")}
            <div class="buttons_container">
                <EditButton bind:editClicked={editButtonClickHandler}>
                    edit project request
                </EditButton>
                <DeleteButton bind:clicked={deleteButtonClickHandler}>
                    delete project request
                </DeleteButton>
            </div>
        {/if}
    </div>
</div>
<style>

    .project {
        width: 100%;
        max-width: 60rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin: 0 0 4rem 0;
    }

    .project_banner {
        width: 100%;
        object-fit: cover;
        height: 48rem;;
    }

    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
    }

    table > tr {
        height: auto;
        padding: 0;
    }

    table > tr > td {
        font-size: 1.25rem;
        padding: 1rem;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    table tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    table td:nth-child(odd) {
        font-weight: bold;
        overflow-wrap: break-word;
        hyphens: auto;
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

        table > tr > td {
            font-size: 1.175rem;
            padding: 1rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .project_banner {
            height: 28rem;;
        }

        table > tr > td {
            font-size: 1rem;
            padding: 0.5rem;
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