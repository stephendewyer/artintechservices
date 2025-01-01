<script lang="ts">
    export let tabPanels: TabPanel[];
    export let activeTab: number;

    console.log(tabPanels)

</script>

{#each tabPanels as tabPanel, index}
    {#if activeTab === tabPanel.index}
        <svelte:component
            this={tabPanel.panel}
            id={`${tabPanel.label}_tabpanel`}
            role="tabpanel"
            tabindex={-index}
            aria-labelledby={`tabpanel_header_${tabPanel.label}`}
            panel_data={tabPanel.data}
        />
    {/if}
{/each}