<script lang="ts">
    import { onDestroy } from "svelte";
    import ProjectCard from "$lib/components/cards/ProjectCard.svelte";
    import Pagination from "$lib/components/pagination/Pagination.svelte";

    export let panel_data: Project[];

    let projectsCurrentPage: number = 1;

    let pageSize: number = 6;

    let firstPageIndexProjects: number;
    $: firstPageIndexProjects = (projectsCurrentPage -1) * pageSize;

    let lastPageIndexProjects: number;
    $: lastPageIndexProjects = firstPageIndexProjects + pageSize;

    let paginatedProjects: Project[];

    $: paginatedProjects = panel_data.slice(firstPageIndexProjects, lastPageIndexProjects);

    onDestroy(() => {
        panel_data = []
    });

</script>
<div class="projects">
    {#if panel_data.length > 0}
        {#each paginatedProjects as project, index}
            <ProjectCard project={project} />
        {/each}
    {/if}
</div>
<Pagination 
        bind:currentPage={projectsCurrentPage}
        totalCount={panel_data.length}
        pageSize={pageSize} 
/>
<style>
    .projects {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
    }
</style>