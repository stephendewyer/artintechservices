<script lang="ts">
    import ArrowButtonNext from "$lib/components/buttons/ArrowButtonNext.svelte";
    import ArrowButtonPrevious from "$lib/components/buttons/ArrowButtonPrevious.svelte";

    export let tabPanels: TabPanel[];
    export let activeTab: number;

    let tabsFrameWidth: number = 0;
    let tabsFrameElement: HTMLElement;

    let scrollTabsPreviousClicked: boolean = false;
    let scrollTabsNextClicked: boolean = false;

    let prevTabsBtnEnabled: boolean = true;
    let nextTabsBtnEnabled: boolean = true;

    $: if (tabsFrameElement) {
        if (tabsFrameElement.scrollWidth === tabsFrameWidth) {
            nextTabsBtnEnabled = false;
        } else if (tabsFrameElement.scrollWidth > tabsFrameWidth) {
            nextTabsBtnEnabled = true;
        }
    }

    let tabsScrollLeftPosition: number = 0;

    $: if (tabsScrollLeftPosition === 0) {
        prevTabsBtnEnabled = false;
    } else {
        prevTabsBtnEnabled = true;
    }

    $: if (scrollTabsPreviousClicked) {
        if (tabsScrollLeftPosition > 0) {
            tabsFrameElement.scrollLeft = tabsScrollLeftPosition - (tabsFrameWidth * 1);
        }
        scrollTabsPreviousClicked = false;
    }

    $: if (scrollTabsNextClicked) {
        if (tabsScrollLeftPosition < (tabsScrollLeftPosition + tabsFrameWidth)) {
            tabsFrameElement.scrollLeft = tabsScrollLeftPosition + (tabsFrameWidth * 1);
        }
        scrollTabsNextClicked = false;
    }

    const handleTabsScroll = () => {
        tabsScrollLeftPosition = tabsFrameElement.scrollLeft;
        if (tabsFrameElement.scrollWidth - 1 > Math.ceil(tabsScrollLeftPosition + tabsFrameWidth)) {
            console.log("scrolled to end")
            nextTabsBtnEnabled = true;
        } else {
            nextTabsBtnEnabled = false;
        }
        if (tabsFrameElement.scrollWidth <= tabsFrameWidth) {
            nextTabsBtnEnabled = false;
        }
    }

    const handleWindowResize = () => {
        tabsScrollLeftPosition = tabsFrameElement.scrollLeft;
        if (tabsFrameElement.scrollWidth - 1 > Math.ceil(tabsScrollLeftPosition + tabsFrameWidth)) {
            nextTabsBtnEnabled = true;
        } else {
            nextTabsBtnEnabled = false;
        }
    }

</script>

<svelte:window on:resize={handleWindowResize}/>
<div class="tabs_container">
    <div 
        class="tabs"
        bind:clientWidth={tabsFrameWidth}
        on:scroll={handleTabsScroll}
        bind:this={tabsFrameElement}
    >
        <ul class="tabs_inner">
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
    </div>
    <div class="arrow_button_previous_tabs">
        <ArrowButtonPrevious
            bind:arrowPrevClicked={scrollTabsPreviousClicked}
            prevBtnEnabled={prevTabsBtnEnabled}
        />
    </div>
    <div class="arrow_button_next_tabs">
        <ArrowButtonNext
            bind:arrowNextClicked={scrollTabsNextClicked}
            nextBtnEnabled={nextTabsBtnEnabled}
        />
    </div>
</div>

<style>

    .tabs_container {
        position: relative;
        margin: 0 1rem 1rem 1rem;
    }

    .tabs {
        position: relative;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
    }

    .tabs_inner {
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
        color: #838B6A;
    }

    .tab:hover > .label_and_icon > .arrow_container {
        fill: #838B6A;
    }

    .active_tab > .label_and_icon > .label {
        color: #424635;
    }

    .active_tab > .label_and_icon > .arrow_container {
        fill: #424635;
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
        border-top: 6px solid #424635;
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

    .arrow_button_previous_tabs {
        position: absolute;
        left: 0;
        right: auto;
        bottom: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: auto;
    }

    .arrow_button_next_tabs {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: auto;
    }

    @media screen and (max-width: 1440px) {

        .tabs_inner {
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

        .tabs_inner {
            padding: 0.5rem;
            gap: 0.5rem;
            justify-content: flex-start;
        }
    }

    @media screen and (max-width: 720px) {

    }

</style>