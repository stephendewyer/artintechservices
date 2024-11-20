<script lang="ts">
    import ActionButtonTertiary from "../buttons/ActionButtonTertiary.svelte";
    export let panel_data;

    const projects: Project[] = panel_data[0];

</script>
<section class="projects">
    <div class="projects_table_container">
        <table class="projects_table">
            <tbody>
                 <tr>
                     <th>
                         ID 
                     </th>
                     <th>
                        project image
                     </th>
                     <th>
                         project name
                     </th>
                     <th>
                         start date
                     </th>
                     <th>
                         end date
                     </th>
                     <th>
                         budget
                     </th>
                     <th>
                         status
                     </th>
                     <th>
     
                     </th>
                 </tr>
                 {#each projects as project, index}
                     <tr>
                         <td>
                             {project?.project_ID}
                         </td>
                         <td>
                            <div class="project_image_container">
                                <img 
                                    class="project_image"
                                    src={project?.image_URL} 
                                    alt={project?.image_alt_text} 
                                />
                            </div>
                         </td>
                         <td>
                            {project?.project_name ? project?.project_name.split("").length > 16 ? `${project?.project_name.slice(0, 16)}...` : project?.project_name: ""}
                        </td>
                         <td>
                             {project?.project_start_date ? new Date(project?.project_start_date).toUTCString().slice(0, 16) : ""}
                         </td>
                         <td>
                             {project?.project_end_date ? new Date(project?.project_end_date).toUTCString().slice(0, 16) : ""}
                         </td>
                         <td>
                             {project?.project_budget} 
                         </td>
                         <td>
                             {project?.status}
                         </td>
                         <td>
                            <a href={`/authenticated-administrator/administrator/client-projects/project-id=${project?.project_ID}`}>
                                <ActionButtonTertiary >
                                    consultation
                                 </ActionButtonTertiary>
                            </a>
                         </td>
                     </tr>
                 {/each}
            </tbody>
         </table>
    </div>
</section>
<style>

    .projects {
        position: relative;
        width: 100%;
        max-width: 100%;
    }

    .projects_table_container {
        width: 100%;
    }

    .projects_table {
        width: 100%;
    }

    .project_image_container {
        height: 10rem;
        width: 10rem;
    }

    .project_image {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    @media screen and (max-width: 1440px) {
        .project_image_container {
            height: 7.5rem;
            width: 7.5rem;
        }

        table > tbody > tr > td {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .project_image_container {
            height: 5rem;
            width: 5rem;
        }

        table > tbody > tr > td {
            font-size: 0.95rem;
        }
    }

    @media screen and (max-width: 720px) {

        .projects_table_container {
            position: relative;
            overflow-x: auto;
            width: 100%;
            display: block;
        }

        .projects_table {
            position: relative;
            min-width: 60rem;
            padding: 1rem;
        }

        table > tbody > tr > td {
            font-size: 0.85rem;
        }

    }
    
</style>