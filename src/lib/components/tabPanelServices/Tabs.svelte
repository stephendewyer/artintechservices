<script lang="ts">
    export let tabPanels: TabPanel[];
    export let activeTab: number;

</script>

<ul class="tabs_container">
    {#each tabPanels as tab, index}
        <a 
            href={`/services${tab.data[0].search}`}
            data-sveltekit-noscroll
        >
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
                <div class="icon_container">
                    {@html tab.tabImageSrc}
                </div>
                <h2 class="label">
                    {tab.label}
                </h2>
            </li>
        </a>
    {/each}
</ul>

<style>

    .tabs_container {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 32rem;
    }

    li {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 6rem;
        gap: 1rem;
        padding: 0 1rem 0 0;
    }

    li:hover > .icon_container {
        fill: #d79679;
    }

    li:hover > .label {
        color: #d79679;
    }

    .active_tab::after {
        --size: 6px;
		content: '';
		position: absolute;
		top: 0;
        bottom: 0;
		right: 0;
		border: var(--size) solid transparent;
		border-right: 6px solid #838B6A;
		overflow: visible;
    }

    .icon_container {
        width: 6rem;
        fill: #36261E;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: fill 0.2s linear;
    }

    .label {
        font-weight: normal;
        transition: color 0.2s linear;
    }

    .active_tab > .label {
        color: #838B6A;
        font-weight: bold;
    }

    .active_tab > .icon_container {
        fill: #838B6A;
    }

    @media screen and (max-width: 1440px) {
        
        .tabs_container {
            width: 24rem;
        }

        .icon_container {
            width: 5rem;
        }

        li {
            height: 5rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .tabs_container {
            width: 20rem;
        }

        .icon_container {
            width: 4rem;
        }

        li {
            height: 4rem;
        }
    }

    @media screen and (max-width: 720px) {

        .tabs_container {
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
            width: 100%;
        }

        li {
            position: relative;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 8rem;
            gap: 0.5rem;
            padding: 0 0 1rem 0;
        }

        .active_tab::after {
            left: 0;
            bottom: 0;
            right: 0;
            border: var(--size) solid transparent;
            border-bottom: 6px solid #838B6A;
        }

        .icon_container {
            width: 4rem;
            height: 4rem;
        }

        .label {
            font-size: 0.8rem;
            text-align: center;
        }

    }

</style>