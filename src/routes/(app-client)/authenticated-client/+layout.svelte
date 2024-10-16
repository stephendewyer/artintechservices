<script lang="ts">
    import NavPanelClient from "$lib/components/navigation/NavPanelClient.svelte";
    import { onMount } from "svelte";

    let navPanelWidth: number = 0;
    let navPanelHeight: number = 0;
    let navPanelTopYPosition: number = 0;
    let clientPageHeight: number = 0;
    let navPanelContainerTopYPosition: number = 0;
    let navPanelContainerElement: HTMLElement;
    let y: number = 0;
    let navPanelAbsolute: boolean = false;
    let navPanelFixed: boolean = false;
    let navPanelRelative: boolean = false;

    // $: console.log("navPanelTopPosition: ", navPanelTopYPosition);
    // $: console.log(`navPanelTopYPosition: ${navPanelTopYPosition} and absoluteYPosition: ${navPanelContainerTopYPosition + (clientPageHeight - navPanelHeight)}`);
    // $: console.log("(y + clientPageHeight) - height: ", (y + clientPageHeight) - height)
    // $: console.log("clientPageHeight: ", clientPageHeight);
    // $: console.log("navPanelHeight: ", navPanelHeight);

    onMount(() => {
        navPanelContainerTopYPosition = navPanelContainerElement.getBoundingClientRect().top + window.scrollY;
    });

    const windowResizeHandler = () => {
        navPanelContainerTopYPosition = navPanelContainerElement.getBoundingClientRect().top + window.scrollY;
    };
    
    const scrollHandler = () => {
        navPanelContainerTopYPosition = navPanelContainerElement.getBoundingClientRect().top + window.scrollY;
    };

    // handle relative position

    $: if (
        ( navPanelHeight >= clientPageHeight ) || 
        ( y < navPanelContainerTopYPosition )
    ) {
        navPanelRelative = true;
    } else  {
        navPanelRelative = false;
    };
    
    // handle absolute position

    $: if (
        ( navPanelHeight < clientPageHeight ) && 
        ( navPanelTopYPosition > ( navPanelContainerTopYPosition + ( clientPageHeight - navPanelHeight ) ) )
    ) {
        navPanelAbsolute = true;
    } else {
        navPanelAbsolute = false;
    };

    // handle fixed position
    
    $: if (
        ( navPanelHeight < clientPageHeight ) && 
        ( y > navPanelContainerTopYPosition) && 
        ( navPanelTopYPosition < ( navPanelContainerTopYPosition + ( clientPageHeight - navPanelHeight ) ) )
    ) {
        navPanelFixed = true;
    } else {
        navPanelFixed = false;
    };

    // $: console.log("navPanelAbsolute: ", navPanelAbsolute);
    // $: console.log("navPanelFixed: ", navPanelFixed);
    // $: console.log("navPanelRelative: ", navPanelRelative);
</script>

<svelte:window 
    on:resize={windowResizeHandler} 
    bind:scrollY={y} 
    on:scroll={scrollHandler}
/>

<div class="page">
    <div class="layout_page_client">
        <div 
            class="nav_panel_container" 
            style={`min-width: ${navPanelWidth}px;`}
            bind:this={navPanelContainerElement}
        >
            <NavPanelClient 
                bind:width={navPanelWidth}
                bind:height={navPanelHeight}
                bind:navPanelTopYPosition={navPanelTopYPosition}
                navPanelFixed={navPanelFixed}
                navPanelAbsolute={navPanelAbsolute}
                navPanelRelative={navPanelRelative}
            />
        </div>
        <div 
            class="page_client_portal"
            bind:clientHeight={clientPageHeight}
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
    
</style>