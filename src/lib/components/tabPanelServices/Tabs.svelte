<script lang="ts">
    import ArrowButtonNext from "$lib/components/buttons/ArrowButtonNext.svelte";
    import ArrowButtonPrevious from "$lib/components/buttons/ArrowButtonPrevious.svelte";

    export let tabPanels: TabPanel[];
    export let activeTab: number;
    export let tabsWidth: number = 0;

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
<div 
    class="tabs_container" 
    bind:clientWidth={tabsWidth}
>
    <div 
        class="tabs"
        bind:clientWidth={tabsFrameWidth}
        on:scroll={handleTabsScroll}
        bind:this={tabsFrameElement}
    >
        <ul class="tabs_inner">
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
        width: 22rem;
    }

    .tabs {
        position: relative;
        width: 100%;
    }

    .tabs_inner {
        position: relative;
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        margin: 0;
    }

    li {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0 1rem 0 0;
    }

    li:hover > .icon_container {
        fill: #838B6A;
    }

    li:hover > .label {
        color: #838B6A;
    }

    .active_tab::after {
        --size: 5px;
		content: '';
		position: absolute;
		top: 0;
        bottom: 0;
		right: 0;
		border: var(--size) solid transparent;
		border-right: 5px solid #424635;
		overflow: visible;
    }

    .icon_container {
        width: 4rem;
        height: 4rem;
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
        text-align: right;
        font-size: 1.5rem;
    }

    .active_tab > .label {
        color: #424635;
        font-weight: bold;
    }

    .active_tab > .icon_container {
        fill: #424635;
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
        
        .tabs_container {
            width: 22rem;
        }

        .icon_container {
            width: 3.5rem;
            height: 3.5rem;
        }

        .label {
            font-size: 1.35rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .tabs_container {
            width: 18rem;
        }

        .icon_container {
            width: 3rem;
            height: 3rem;
        }

        .label {
            font-size: 1.25rem;
        }

    }

    @media screen and (max-width: 720px) {

        .tabs_container {
            width: 100%;
        }

        .tabs {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-behavior: smooth;
        }

        .tabs_inner {
            flex-direction: row;
            width: 100%;
        }

        li {
            position: relative;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            padding: 0 0 1rem 0;
        }

        .active_tab::after {
            left: 0;
            bottom: 0;
            right: 0;
            border-right: 0;
            border: var(--size) solid transparent;
            border-bottom: 5px solid #838B6A;
        }

        .icon_container {
            width: 2.5rem;
            height: 2.5rem;
        }

        .label {
            font-size: 0.8rem;
            text-align: center;
        }

    }

</style>