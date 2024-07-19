<script lang="ts">
    import Arrow from "$lib/images/arrows/nav_arrow.svg?raw";
    import LoginIcon from "$lib/images/icons/login.svg?raw";
    import { page } from "$app/stores";
    import { afterNavigate } from "$app/navigation";

    export let mainNavTab: NavTab;

    let tabIsActive: boolean | undefined = false;

    const currentPageHandler = (navTab: NavTab) => {
        if (navTab.content === null) {
            if ($page.url.pathname === navTab.slug) {
                return true;
            } else {
                return false;
            };
        } else if (navTab.content.length > 0) {
            let tabActive: boolean = false;
            navTab.content.map((tab) => {
                if (tab.slug === $page.url.pathname) {
                    tabActive = true;
                };
            });
            if (tabActive) {
                return true;
            } else {
                return false;
            };
        };
    };

    afterNavigate(() => {
        tabIsActive = currentPageHandler(mainNavTab);
    });

    // initialize the panel height to 0
    let contentHeight: number = 0;

    let panelHovered = false;

    const hoverPanelHandler = () => {
        panelHovered = true;
    };

    const exitPanelHandler = () => {
        panelHovered = false;
    };

</script>


{#if (mainNavTab.content !== null)}
    <ul
        on:focus={() => hoverPanelHandler()}
        on:mouseenter={() => hoverPanelHandler()}
        on:mouseover={() => hoverPanelHandler()}
        on:mouseleave={() => exitPanelHandler()}
        on:mouseout={() => exitPanelHandler()}
        on:blur={() => exitPanelHandler()}
        class="nav_column" 
        style={(mainNavTab.label !== "login") ? "width: 20%;" : "width: auto;"}
    >
        <a href={mainNavTab.slug}>
            <li 
                class="nav_tab"
                aria-current={tabIsActive ? "page" : undefined}
            >
                {#if (mainNavTab.label === "login")}
                    <div class="login_icon">
                        {@html LoginIcon}
                    </div>
                {/if}
                {mainNavTab.label}
                <div 
                    class="arrow"
                    style={panelHovered ? "transform: rotate(180deg);" : "transform: rotate(0);"}
                >
                    {@html Arrow}
                </div>            
            </li>
        </a>
        <div class="content_container">
            <div 
                style={panelHovered ? `height: ${contentHeight}px;` : "height: 0px;"} 
                class="content"
            >
                <ul
                    bind:clientHeight={contentHeight}
                    style={panelHovered ? "opacity: 1;" : "opacity: 0;"}
                    class="content_inner"
                >
                    {#each mainNavTab.content as subTab, index}
                        <a href={subTab.slug}>
                            <li 
                                class="nav_tab"
                                style={subTab.slug === $page.url.pathname ? "text-decoration: underline;" : "text-decoration: none;"}
                            >
                                {subTab.label}
                            </li>
                        </a>
                    {/each}
                </ul>
            </div>
        </div>
    </ul>
{:else if (mainNavTab.content === null)}
    <ul
        class="nav_column" 
        style={(mainNavTab.label !== "login") ? "width: 20%;" : "width: auto;"}
    >
        <a href={mainNavTab.slug}>
            <li 
                class="nav_tab"
                aria-current={tabIsActive ? "page" : undefined}
            >
                {mainNavTab.label}
            </li>
        </a>
    </ul>
    
{/if}

<style>

    ul {
        position: relative;
		list-style-type: none;
		margin: 0;
		padding: 0;
    }

    li {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

    li[aria-current="page"]::after {
		--size: 6px;
		content: '';
		height: 0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		border: var(--size) solid transparent;
		border-top: 6px solid #838B6A;
		overflow: visible;
	}
    
    .nav_column {
        list-style: none;
        padding: 0;
        margin: 0;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .content_inner > a {
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .nav_tab {
        position: relative;
        display: flex;
        flex-direction: row;
        background-color: #ffff;
        color: #838B6A;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        font-size: 1.4rem;
        font-weight: 600;
        letter-spacing: 0.05rem;
        transition: all 0.15s linear;
        cursor: pointer;
        gap: 0.5rem;
        text-align: left;
    }

    .nav_tab:hover {
        background-color: #ffff;
        color: #B2A1A1;
    }

    .arrow {
        transition: transform 0.4s ease, fill 0.4s ease;
        display: flex;
        justify-content: center;
    }

    .nav_tab:hover > .arrow {
        fill: #B2A1A1;
    }

    .nav_tab:hover > .login_icon {
        fill: #B2A1A1;
    }

    .login_icon {
        width: 1.75rem;
        display: flex;
        justify-content: center;
        fill: #838B6A;
        transition: fill 0.15s linear, color 0.15s linear;
    }

    .content_container {
        position: relative;
    }

    .content {
        position: relative;
        overflow: hidden;
        will-change: height;
        width: 100%;
        transition: height 0.4s cubic-bezier(0.65, 0.05, 0.36, 1);
        background-color: #ffff;
    }

    .content_inner {
        list-style: none;
        position: relative;
        height: auto;
        transition: opacity 0.3s linear 0.18s;
        padding: 0;
    }

    .arrow {
        width: 1rem;
        height: auto;
        margin-top: auto;
        margin-bottom: auto;
        transition: transform 0.4s ease;
        display: flex;
        justify-content: center;
        fill: #838B6A;
    }

    @media all and (max-width: 1800px) {
        
        .nav_tab {
            font-size: 1.3rem;
        }

    }

    @media all and (max-width: 1400px) {
        
        .nav_tab {
            font-size: 1.2rem;
        }

    }

    @media all and (max-width: 1000px) {

        .nav_tab {
            font-size: 1rem;
        }

    }

    @media all and (max-width: 800px) {

        .nav_tab {
            font-size: 1rem;
        }
        
    }
</style>