<script lang="ts">
    import Logo from "$lib/components/navigation/Logo.svelte";
    import NavColumn from "$lib/components/navigation/NavColumn.svelte";
    import MobileNavSideDrawerToggleButton from "$lib/components/navigation/MobileNavSideDrawerToggleButton.svelte";
    import { page } from '$app/stores';
    import NavigationData from "$lib/data/navigation.json";

    export let sideDrawer: boolean = false;

    let prevScrollPos: number = 0;

    let showNav: boolean = true; // boolean to show or hid nav bar

</script>

<svelte:window on:scroll={()=>{

    const handleScroll  = () => {
        // find current scroll position
        const currentScrollPos = window.scrollY || document.documentElement.scrollTop;

        // set state based on location info
        showNav = ((prevScrollPos > currentScrollPos) || currentScrollPos < 10);
        // set state to new scroll position
        prevScrollPos = currentScrollPos;
    };

    handleScroll();

}} ></svelte:window>

<header class={showNav ? "nav_bar_visible" : "nav_bar_hidden"}>
    <ul class="main_nav_tabs" >
        <li aria-current={$page.url.pathname === "/"? "page" : undefined} >
            <a href="/">
                <Logo />
            </a>
        </li>
    </ul>
    <ul class="navigation_center_panel_desktop">
        {#each NavigationData as mainNavTab, index}
            {#if (mainNavTab.label !== "login")}
                <NavColumn
                    mainNavTab={mainNavTab}
                />
            {/if}
        {/each}
    </ul>
    <ul class="login_nav_desktop">
        {#each NavigationData as mainLoginTab, index}
            {#if (mainLoginTab.label === "login")}
                <li>
                    <NavColumn
                        mainNavTab={mainLoginTab}
                    />
                </li>
            {/if}
        {/each}
    </ul>
    <ul id="nav_right_mobile">
        <li class="mobile_nav_menu_toggle_button_container">
            <MobileNavSideDrawerToggleButton bind:open={sideDrawer}/>			
        </li>
    </ul>
</header>

<style>

    .main_nav_tabs {
        list-style: none;
        padding: 0;
        margin: 0;
    }

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

    .nav_bar_visible {
        top: 0;
        overflow: visible;
        position: fixed;
        left: 0;
        right: 0;
        height: 0;
        z-index: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        will-change: top;
        transition: top 0.6s;
    }

    .nav_bar_hidden {
        top: -12rem;
        overflow: visible;
        position: fixed;
        left: 0;
        right: 0;
        height: 0;
        z-index: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        will-change: top;
        transition: top 0.6s;
    }

    .login_nav_desktop {
        display: block;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .navigation_center_panel_desktop {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 0;
        margin: 0;
        list-style: none;
        width: 65%;
        min-width: 42rem;
    }

    #nav_right_mobile {
        display: none;
        padding: 1rem;
        margin: 0;
        position: relative;
        
    }

    .mobile_nav_menu_toggle_button_container {
        position: relative;
    }

    @media screen and (max-width: 1440px) {
        .nav_bar_hidden {
            top: -10rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .nav_bar_hidden {
            top: -8rem;
        }
    }
    

    @media screen and (max-width: 1000px) {


        #nav_right_mobile {
            display: inline-block;
            padding: 1rem;
            margin: 0;
            z-index: 49;
        }

        .navigation_center_panel_desktop {
            display: none;
        }

        .login_nav_desktop {
            display: none;
        }

    }
	@media screen and (max-width: 750px) {
        
        .nav_bar_hidden {
            top: -8rem;
        }

    }

</style>