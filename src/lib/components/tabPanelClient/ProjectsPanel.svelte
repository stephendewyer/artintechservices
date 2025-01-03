<script lang="ts">
    import ProjectCard from "$lib/components/cards/ProjectCard.svelte";
    import Pagination from "$lib/components/pagination/Pagination.svelte";
    import { fade } from "svelte/transition";

    export let panel_data: Project[];

    let projectsCurrentPage: number = 1;

    let pageSize: number = 6;

    let firstPageIndexProjects: number;
    $: firstPageIndexProjects = (projectsCurrentPage -1) * pageSize;

    let lastPageIndexProjects: number;
    $: lastPageIndexProjects = firstPageIndexProjects + pageSize;

    let paginatedProjects: Project[];

    $: paginatedProjects = panel_data.slice(firstPageIndexProjects, lastPageIndexProjects);

</script>
<div 
    in:fade={{ delay: 250, duration: 300 }}
    class="projects_container"
>
    {#key paginatedProjects}
        <div class="projects" in:fade={{ delay: 250, duration: 300 }}>
            {#if panel_data.length > 0}
                {#each paginatedProjects as project, index}
                    <ProjectCard project={project} />
                {/each}
            {/if}
        </div>
    {/key}
    <Pagination 
            bind:currentPage={projectsCurrentPage}
            totalCount={panel_data.length}
            pageSize={pageSize} 
    />
</div>

<style>
    .projects {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .projects_container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
    }

    @media screen and (max-width: 1440px) {

    }

    @media screen and (max-width: 1080px) {
        .projects_container {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.75rem;
        }
    }

    @media screen and (max-width: 720px) {
        .projects_container {
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 0.5rem;
        }
    }
    
</style>