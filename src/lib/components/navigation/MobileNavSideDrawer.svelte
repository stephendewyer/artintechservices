<script lang="ts">
    import { page } from "$app/stores";
    import NavAccordion from "../accordions/AccordionMobileNav.svelte"
    import MobileNavSideDrawerToggleButton from "$lib/components/navigation/MobileNavSideDrawerToggleButton.svelte";
    import NavigationData from "$lib/data/navigation.json";
    import NavigationDataClient from "$lib/data/navigationClient.json";
    import NavigationDataAdministrator from "$lib/data/navigationAdministrator.json";
    import type { User } from "@auth/sveltekit";
    import LogoutButtonMobile from "../buttons/LogoutButtonMobile.svelte";

    export let openMobileNav: boolean = false;

    let sessionClient: User | undefined;
    
    $: sessionClient = $page.data.streamed.user;

    let nav_data: NavTab[] = [];

    let callbackURL: string = "";
    let logoURL: string = "";

    $: if (sessionClient?.name === "client") {
        nav_data = [...NavigationDataClient];
        callbackURL = "/logins/login-client";
        logoURL = "/authenticated-client/client";
    } else if (sessionClient?.name === "administrator") {
        nav_data = [...NavigationDataAdministrator];
        callbackURL = "/logins/login-administrator";
        logoURL = "/authenticated-administrator/administrator";
    } else if (!sessionClient) {
        nav_data = [...NavigationData];
        callbackURL = "/";
        logoURL = "/";
    };

</script>

<aside 
    class="{ (openMobileNav) ? 'side_drawer_open' : 'side_drawer_closed' }"
    aria-hidden="{ (openMobileNav) ? 'false' : 'true'}"
>
    <button
        class="sidedrawer_toggle_button"
        on:click={() => openMobileNav = !openMobileNav}
        on:keyup={() => openMobileNav = !openMobileNav}
    >
        <MobileNavSideDrawerToggleButton open={openMobileNav} />
    </button>
    <nav>
        <NavAccordion 
            mobileNavTabsData={nav_data}
            bind:openState={openMobileNav}
        />
        {#if sessionClient}
            <div class="logout_button_container">
                <LogoutButtonMobile callbackUrl={callbackURL}>
                    logout
                </LogoutButtonMobile>
            </div>
        {/if}
    </nav>
</aside>

<style>
    aside {
        height: 100%;
        background: #EDF8F9;
        position: fixed;
        top: 0;
        left: 4rem;
        right: 0;
        z-index: 50;
    }

    .side_drawer_closed {
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    }

    .side_drawer_open {
        transform: translateX(0);
        transition: transform 0.3s ease-in-out;
    }

    .sidedrawer_toggle_button {
        padding: 1rem;
        background: none;
        border: none;
    }

    nav {
        width: 100%;
        padding: 2rem 2rem;
	}

    .logout_button_container {
        padding: 1rem 0;
    }
    
    @media (min-width: 1000px) {

        .side_drawer_closed {
            display: none;
        }

        .side_drawer_open {
            display: none;
        }
    }
</style>