<script lang="ts">
    import { page } from "$app/stores";
    import NavAccordion from "../accordions/AccordionMobileNav.svelte"
    import MobileNavSideDrawerToggleButton from "$lib/components/navigation/MobileNavSideDrawerToggleButton.svelte";
    import NavigationData from "$lib/data/navigation.json";
    import NavigationDataClient from "$lib/data/navigationClient.json";
    import NavigationDataAdministrator from "$lib/data/navigationAdministrator.json";
    import LogoutButtonMobile from "../buttons/LogoutButtonMobile.svelte";
    import { afterNavigate } from "$app/navigation";

    export let openMobileNav: boolean = false;

    let sessionClient: UserCredentials = $page.data.streamed.user ? $page.data.streamed.user : null;

    let nav_data: NavTab[] = [];

    let callbackURL: string = "";
    let logoURL: string = "";
    let logoutAPIroute: string = "";

    let updatePreviousLoginDateAPIroute: string = "";

    afterNavigate(() => {
        sessionClient = $page.data.streamed.user ? $page.data.streamed.user : null;
        if (sessionClient?.role === "client") {
            nav_data = [...NavigationDataClient];
            updatePreviousLoginDateAPIroute = "/authenticated-client/api/updateClientPreviousLogin";
            callbackURL = "/login";
            logoURL = "/authenticated-client/client";
            logoutAPIroute = "/authenticated-client/api/logout"
        } else if (sessionClient?.role === "administrator") {
            nav_data = [...NavigationDataAdministrator];
            updatePreviousLoginDateAPIroute = "/authenticated-administrator/api/updateAdministratorPreviousLogin";
            callbackURL = "/login";
            logoURL = "/authenticated-administrator/administrator";
            logoutAPIroute = "/authenticated-administrator/api/logout"
        } else if (!sessionClient) {
            nav_data = [...NavigationData];
            updatePreviousLoginDateAPIroute = "";
            callbackURL = "/";
            logoURL = "/";
        };
    });

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
                <LogoutButtonMobile 
                    email={sessionClient?.email}
                    userGroup={sessionClient?.role}
                    callbackUrl={callbackURL}
                    bind:openState={openMobileNav}
                    updatePreviousLoginDateAPIroute={updatePreviousLoginDateAPIroute}
                    logoutAPIroute={logoutAPIroute}
                >
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