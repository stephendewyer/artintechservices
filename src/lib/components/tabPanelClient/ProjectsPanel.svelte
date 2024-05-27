<script lang="ts">
    import { onDestroy } from "svelte";
    import ProjectCard from "$lib/components/cards/ProjectCard.svelte";
    export let panel_data: Project[];

    onDestroy(() => {
        panel_data = []
    });

</script>
<div class="projects">
    {#if panel_data.length > 0}
        {#each panel_data as project, index}
            <ProjectCard project={project} />
        {/each}
    {/if}
</div>

<style>
    .projects {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
    }
</style>