<script lang="ts">
    import NavPanelClient from "$lib/components/navigation/NavPanelClient.svelte";
    import { afterUpdate, onMount } from "svelte";
    import { page } from "$app/stores";
    import { ClientPageWidthStore } from "$lib/stores/ClientPageWidthStore";

    let clientProfileImageID = $page.data.streamed.client_profile_image_ID;
    let clientProfileImageURL = $page.data.streamed.client_profile_image_URL;
    let clientEmail = $page.data.streamed.user?.email;
    let clientPageElement: HTMLElement;
    let clientPageTopYPosition: number = 0;
    let navPanelContainerHeight: number = 0;
    let navPanelWidth: number = 0;
    let navPanelHeight: number = 0;
    let navPanelTopYPosition: number = 0;
    let navPanelBottomYPosition: number = 0;
    let clientPageHeight: number = 0;
    let clientPageWidth: number = 0;
    let navPanelContainerTopYPosition: number = 0;
    let navPanelContainerElement: HTMLElement;
    let y: number = 0;
    let innerWidth: number = 0;
    let navPanelAbsolute: boolean = false;
    let navPanelFixed: boolean = false;
    let navPanelRelative: boolean = false;

    // $: console.log("clientPageTopYPosition: ", clientPageTopYPosition);
    // $: console.log("mobileNavPanelFixed: ", mobileNavPanelFixed);
    // $: console.log("navPanelBottomYPosition: ", navPanelBottomYPosition);
    // $: console.log("navPanelTopPosition: ", navPanelTopYPosition);
    // $: console.log(`navPanelTopYPosition: ${navPanelTopYPosition} and absoluteYPosition: ${navPanelContainerTopYPosition + (clientPageHeight - navPanelHeight)}`);
    // $: console.log("(y + clientPageHeight) - height: ", (y + clientPageHeight) - height)
    // $: console.log("clientPageHeight: ", clientPageHeight);
    // $: console.log("navPanelHeight: ", navPanelHeight);

    onMount(() => {
        navPanelContainerTopYPosition = navPanelContainerElement.getBoundingClientRect().top + window.scrollY;
        clientPageTopYPosition = clientPageElement.getBoundingClientRect().top + window.scrollY;
        navPanelBottomYPosition = navPanelContainerElement.getBoundingClientRect().bottom + window.scrollY;   
        navPanelContainerHeight = navPanelContainerElement.getBoundingClientRect().height;
        $ClientPageWidthStore = innerWidth - navPanelWidth;
    });

    // IMPORTANT! Page layout changes after getting page data.  User afterUpdate to get correct values after page data loads
    afterUpdate(() => {
        navPanelContainerTopYPosition = navPanelContainerElement.getBoundingClientRect().top + window.scrollY;
        clientPageTopYPosition = clientPageElement.getBoundingClientRect().top + window.scrollY;
        navPanelBottomYPosition = navPanelContainerElement.getBoundingClientRect().bottom + window.scrollY;   
        navPanelContainerHeight = navPanelContainerElement.getBoundingClientRect().height;
        $ClientPageWidthStore = innerWidth - navPanelWidth;
    })

    const windowResizeHandler = () => {
        navPanelContainerTopYPosition = navPanelContainerElement.getBoundingClientRect().top + window.scrollY;
        clientPageTopYPosition = clientPageElement.getBoundingClientRect().top + window.scrollY;
        navPanelBottomYPosition = navPanelContainerElement.getBoundingClientRect().bottom + window.scrollY;
        navPanelContainerHeight = navPanelContainerElement.getBoundingClientRect().height;
        $ClientPageWidthStore = innerWidth - navPanelWidth;
    };
    
    const scrollHandler = () => {
        navPanelContainerTopYPosition = navPanelContainerElement.getBoundingClientRect().top + window.scrollY;
        clientPageTopYPosition = clientPageElement.getBoundingClientRect().top + window.scrollY;
        navPanelBottomYPosition = navPanelContainerElement.getBoundingClientRect().bottom + window.scrollY;
        navPanelContainerHeight = navPanelContainerElement.getBoundingClientRect().height;
        $ClientPageWidthStore = innerWidth - navPanelWidth;
    };

    // handle relative position

    $: if (
        (innerWidth > 720) &&
        (
            ( navPanelHeight >= clientPageHeight ) || 
            ( y < navPanelContainerTopYPosition )
        )
    ) {
        navPanelRelative = true;
        navPanelFixed = false;
        navPanelAbsolute = false;
    } else  {
        navPanelRelative = false;
    };

    // handle tabsFixed
    $: if (innerWidth > 720) {
        if (y > navPanelContainerTopYPosition && y < (navPanelContainerTopYPosition + (navPanelContainerHeight - navPanelHeight))) {
            navPanelFixed = true;
        } else {
            navPanelFixed = false;
        }
    } else if (innerWidth <= 720) {
        if (y > navPanelContainerTopYPosition && y < (navPanelContainerTopYPosition + (navPanelContainerHeight - navPanelHeight))) {
            navPanelFixed = true;
        } else {
            navPanelFixed = false;
        };
    };

    // handle tabsAbsolute
    $: if (innerWidth > 720) {
        if (y >= (navPanelContainerTopYPosition + (navPanelContainerHeight - navPanelHeight))) {
            navPanelAbsolute = true;
        } else {
            navPanelAbsolute = false;
        };
    } else if ( 
        (innerWidth > 720) && ( 
            navPanelHeight < clientPageHeight 
        ) && ( 
            navPanelTopYPosition < ( navPanelContainerTopYPosition + ( clientPageHeight - navPanelHeight ) ) 
        ) && (
            ( y < ( navPanelContainerTopYPosition + ( clientPageHeight - navPanelHeight ) ) )
        )
    ) {
        navPanelAbsolute = false;
    }; 

    // handle mobile fixed position

    let innerHeight: number = 0;

    let mobileNavPanelFixed: boolean = false;

    $: if (innerWidth <= 720) {
        if ( ( ( y + innerHeight) < navPanelBottomYPosition ) ) {
            mobileNavPanelFixed = true;
        } else {
            mobileNavPanelFixed = false;
        };
    } else {
        mobileNavPanelFixed = false;
    };

    // $: console.log("navPanelAbsolute: ", navPanelAbsolute);
    // $: console.log("navPanelFixed: ", navPanelFixed);
    // $: console.log("navPanelRelative: ", navPanelRelative);
</script>

<svelte:window 
    on:resize={windowResizeHandler} 
    bind:scrollY={y} 
    on:scroll={scrollHandler}
    bind:innerWidth
    bind:innerHeight
/>

<div class="page">
    <div class="layout_page_client">
        <div 
            class="nav_panel_container" 
            style={innerWidth > 720 ? `min-width: ${navPanelWidth}px;` : "min-width: 100%;"}
            bind:this={navPanelContainerElement}
            bind:clientHeight={navPanelContainerHeight}
        >
            <NavPanelClient 
                bind:width={navPanelWidth}
                bind:height={navPanelHeight}
                bind:navPanelTopYPosition={navPanelTopYPosition}
                navPanelFixed={navPanelFixed}
                navPanelAbsolute={navPanelAbsolute}
                navPanelRelative={navPanelRelative}
                clientProfileImageID={clientProfileImageID}
                clientProfileImageURL={clientProfileImageURL}
                clientEmail={clientEmail}
                mobileNavPanelFixed={mobileNavPanelFixed}
            />
        </div>
        <div 
            class="page_client_portal"
            bind:clientHeight={clientPageHeight}
            bind:clientWidth={clientPageWidth}
            bind:this={clientPageElement}
            style={mobileNavPanelFixed ? `padding-bottom: ${navPanelHeight}px;` : ""}
        >
            <slot />
        </div>
    </div>
</div>
<style>
    .layout_page_client {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        gap: 1rem;
    }

    .nav_panel_container {
        position: relative;
    }

    .page_client_portal {
        width: 100%;
    }

    @media screen and (max-width: 1440px) {
        
    }
    @media screen and (max-width: 1080px) {
        
    }

    @media screen and (max-width: 720px) {

        .layout_page_client {
            flex-direction: column-reverse;
        }

        .nav_panel_container {
            width: 100%;
        }

    }
    
</style>