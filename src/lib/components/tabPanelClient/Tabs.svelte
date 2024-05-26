<script lang="ts">
    export let tabPanels: TabPanel[];
    export let activeTab: number;

</script>

<ul class="tabs_container">
    {#each tabPanels as tab, index}
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
            <h2 class="label">
                {tab.label}
            </h2>
        </li>
    {/each}
</ul>

<style>

    .tabs_container {
        position: relative;
        list-style: none;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin: 0;
        width: 100%;
        justify-content: center;
    }

    li {
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .tab::after {
        --size: 6px;
        content: '';
        height: 6px;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        border: var(--size) solid transparent;
        border-top: none;
        overflow: visible;
    }

    .tab > .label {
        font-weight: normal;
        transition: color 0.2s linear;
    }

    .tab:hover > .label {
        font-weight: normal;
        color: #d79679;
    }

    .active_tab > .label {
        color: #838B6A;
    }

    .active_tab::after {
        --size: 6px;
        content: '';
        height: 0;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        border: var(--size) solid transparent;
        border-top: 6px solid #838B6A;
        overflow: visible;
    }

    @media screen and (max-width: 1440px) {

        .tabs_container {
            gap: 0.75rem;
        }

        li {
            gap: 0.75rem;
        }

    }

    @media screen and (max-width: 1080px) {
        
        li {
            gap: 0.5rem;
        }

        .tabs_container {
            padding: 0.5rem;
            gap: 0.5rem;
            width: 100%;
            justify-content: flex-start;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
        }
    }

    @media screen and (max-width: 720px) {

    }

</style>