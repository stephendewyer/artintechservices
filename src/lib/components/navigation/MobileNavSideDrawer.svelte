<script lang="ts">
    import { page } from "$app/stores";
    import Accordion from "../accordions/AccordionMobileNav.svelte"
    import NavigationData from "$lib/data/navigation.json";
    import AccordionMobileNav from "../accordions/AccordionMobileNav.svelte";

    export let openMobileNav: boolean = false;

</script>

<aside 
    class="{ (openMobileNav) ? 'side_drawer_open' : 'side_drawer_closed' }"
    aria-hidden="{ (openMobileNav) ? 'false' : 'true'}"
>
    <nav>
        <Accordion 
            mobileNavTabsData={NavigationData}
            bind:openState={openMobileNav}
        />
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

    nav {
        width: 100%;
        padding: 4rem 2rem;
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