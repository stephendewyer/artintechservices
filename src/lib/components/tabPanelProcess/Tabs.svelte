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
            <div class="label_and_icon">
                <h2 class="label">
                    {tab.label}
                </h2>
                <div class="arrow_container">
                    {@html tab.tabImageSrc}
                </div> 
            </div>
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

    .tab > .label_and_icon > .label {
        font-weight: normal;
        transition: color 0.2s linear;
    }

    .tab > .label_and_icon > .arrow_container {
        transition: fill 0.2s linear;
    }

    .tab:hover > .label_and_icon > .label {
        font-weight: normal;
        color: #d79679;
    }

    .tab:hover > .label_and_icon > .arrow_container {
        fill: #d79679;
    }

    .active_tab > .label_and_icon > .label {
        color: #838B6A;
    }

    .active_tab > .label_and_icon > .arrow_container {
        fill: #838B6A;
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

    .arrow_container {
        width: 1rem;
        fill: #36261E;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .label_and_icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    @media screen and (max-width: 1440px) {

        .tabs_container {
            gap: 0.75rem;
        }

        .label_and_icon {
            gap: 0.75rem;
        }

        li {
            gap: 0.75rem;
        }

        .arrow_container {
            width: 0.75rem;
        }

    }

    @media screen and (max-width: 1080px) {

        .arrow_container {
            width: 0.5rem;
        }

        .label_and_icon {
            gap: 0.5rem;
        }

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