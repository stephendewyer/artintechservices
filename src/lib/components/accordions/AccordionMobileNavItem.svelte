<script lang="ts">
  import { page } from "$app/stores";
  import Arrow from "$lib/images/arrows/arrow_left.svg?raw";
  import LoginIcon from "$lib/images/icons/login.svg?raw";

  export let open: boolean = false;
  export let item: AccordionTab;
  export let index: number;
  export let setActiveIndex: number;
  export let activeTab: number;
  export let setActive: boolean;

  let height: number = 0;

  $: height;

  // click function for top tier tabs

  const handle01Click = (item: AccordionTab) => {
    if (!item.expandable) {
        open = !open;
    } else {
        open = open;
    };

    if (index === activeTab) {
        setActive = false;
        setActiveIndex = -1;
    } else {
        setActive = true;
        setActiveIndex = index;
    };
  };

  const handle02Click = (item: AccordionTab) => {
    if (!item.expandable) {
        open = !open;
    } else if (item.expandable && item.slug !== "#") {
        open = !open;
    } else if (item.expandable && item.slug === "#") {
        open = open;
    };
  };

</script>

<ul class="accordion_container">
    {#if (item.content !== null) && (item.label !== "services")}
        <li 
            on:click={() => handle01Click(item)}
            on:keyup={() => handle01Click(item)}
            id="tabpanel_header_{item.label}"
            role="tab"
            aria-selected={activeTab === index ? true : false}
            aria-controls="{item.label}_tabpanel"
            aria-current={$page.url.pathname === item.slug ? "page" : undefined}
            tabindex={-index}
            class="mobile_nav_tab"
        >
            <a 
                href={item.slug}
                class="mobile_nav_tab_icon_and_label"
                on:click={() => handle02Click(item)}
                on:keyup={() => handle02Click(item)}
                style={
                    (
                        ($page.url.pathname.includes(item.slug) && $page.url.pathname !== item.slug) || 
                        ($page.url.pathname.replace(/-/g, " ").split("/")[1].includes(item.label) && $page.url.pathname !== item.slug)
                    ) ? 
                    "text-decoration: underline;": "text-decoration: none;"
                }
            >
                {#if item.label === "login"}
                    <div class="nav_icon">
                        {@html LoginIcon}
                    </div>
                {/if}
                {item.label}
            </a>
            <div class={ activeTab === index ? "arrow_active" : "arrow" }>
                {@html Arrow}
            </div>
        </li>
        <div
            class="expandable_container"
            style={ activeTab === index ? `height: ${height}px` : 'height: 0px;' }
            id="{item.label}_tabpanel"
            role="tabpanel"
            tabindex={-index}
            aria-labelledby="tabpanel_header_{item.label}"
        >
            <ul
                bind:clientHeight={height}
                class="expandable"
                style={ activeTab === index ? "opacity: 100%;" : "opacity: 0;" }

            >
                {#each item.content as mobileNavTabSecondary}
                    <a 
                        href={mobileNavTabSecondary.slug}
                        on:click={() => handle02Click(mobileNavTabSecondary)} 
                        aria-label="link to {mobileNavTabSecondary.label} page"
                    >
                        <li 
                            aria-current={$page.url.pathname === mobileNavTabSecondary.slug ? "page" : undefined}
                            class="mobile_nav_tab_secondary"
                        >    
                            {mobileNavTabSecondary.label}
                            
                        </li>
                    </a>
                {/each}
            </ul>
        </div>
    {:else if (item.content === null) || (item.label === "services")}
        <a 
            href={item.slug}
            on:click={() => handle01Click(item)}
        >
            <li 
                aria-current={$page.url.pathname === item.slug ? "page" : undefined}
                class="mobile_nav_tab"
            >
                {item.label}
            </li>
        </a>
    {/if}
    </ul>

<style>
    
    ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		position: relative;
	}
    

    li[aria-current="page"]::before {
        --size: 6px;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		border: var(--size) solid transparent;
		border-left: 6px solid #E5BCA6;
		overflow: visible;
    }

    .accordion_container {
        background-color:#838B6A;
    }

    .mobile_nav_tab {
        width: 100%;
        background-color: #838B6A;
        color: #ffff;
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        font-size: 1rem;
    }

    .mobile_nav_tab:hover {
        color:#ffffff;
        background-color:#B2A1A1;
    }

    .mobile_nav_tab_secondary {
        color: #FBF4F9;
        background-color: #838B6A;
        transition: all 0.2s;
        padding: 0.75rem 0.75rem 0.75rem 3rem;
        font-size: 1rem;
    }

    .mobile_nav_tab_secondary:hover {
        color: #FBF4F9;
        background-color: #B2A1A1;
    }

    .arrow {
        width: 0.5rem;
        transform: rotate(180deg);
        will-change: transform;
        transition: transform 0.2s ease-out;
        fill: #FBF4F9;
    }

    .arrow_active {
        width: 0.5rem;
        transform: rotate(90deg);
        will-change: transform;
        transition: transform 0.2s ease-out;
        fill: #FBF4F9;
    }

    .expandable_container {
        overflow: hidden;
        will-change: height;
        transition: height 0.4s cubic-bezier(0.65, 0.05, 0.36, 1);
    }

    .expandable {
        will-change: opacity;
        transition: opacity 0.4s ease-out;
    }

    .mobile_nav_tab_icon_and_label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #FBF4F9;
    }

    .nav_icon {
        width: 1.5rem;
        fill: #FBF4F9;
    }
    
</style>