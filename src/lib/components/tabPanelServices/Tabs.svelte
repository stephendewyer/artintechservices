<script lang="ts">
    export let tabPanels: TabPanel[];
    export let activeTab: number;
</script>

<ul class="tabs_container">
    {#each tabPanels as tab, index}
        <a href={`/services${tab.data[0].search}`}>
            <li
                class={activeTab === tab.index ? "active_tab" : "tab"}
                on:click={() => activeTab = tab.index} 
                on:keydown={() => activeTab = tab.index}
                id={`tabpanel_header_${tab.label}`}
                role="tab"
                aria-selected={activeTab === index ? true : false}
                aria-controls={`${tab.label}_tabpanel`}
                tabindex={-index}
            >
                {tab.label}
            </li>
        </a>
    {/each}
</ul>

<style>

</style>