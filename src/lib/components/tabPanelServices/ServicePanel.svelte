<script lang="ts">
    import Checkbox from "$lib/components/inputs/Checkbox.svelte";
    import { afterUpdate, onDestroy, onMount } from "svelte";
    import { RequestedServicesStore } from "$lib/stores/RequestedServicesStore";
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import type Player from "video.js/dist/types/player";

    export let panel_data: ServicePanelData[];

    let checkboxValue: string;

    const search = panel_data[0]?.search.split('=')[1];

    // get the requested service value from store

    let requestedService: boolean = false;

    let requestedServiceIndex: number;
    
    $RequestedServicesStore.forEach((service, index) => {
        const serviceSearchFormat = service.service.split(' ').join('-');
        if (search === serviceSearchFormat) {
            requestedServiceIndex = index;
            requestedService = $RequestedServicesStore[index].requested;
        };
    });

    let checkboxChecked: boolean = requestedService;

    $: if (checkboxChecked) {
        $RequestedServicesStore[requestedServiceIndex].requested = true;
    } else {
        $RequestedServicesStore[requestedServiceIndex].requested = false;
    };

    let player: Player;

    onMount(() => {
        if (panel_data[0].videoSrc) {
            player = videojs("player", {fluid: true});
        };
    });

    afterUpdate(() => {
        $RequestedServicesStore.forEach((service, index) => {
            const serviceSearchFormat = service.service.split(' ').join('-');
            if (search === serviceSearchFormat) {
                checkboxChecked = $RequestedServicesStore[index].requested;
            };
        });
    });

    onDestroy(() => {
        panel_data = [];
        if (player) {
            player.dispose();
        };
    });

    let innerWidth: number = 0;

    let y: number = 0;

    let panelHeight: number = 0;
    let panelWidth: number = 0;

    let checkboxContainerHeight: number = 0;

    let panelElement: HTMLElement;

    let checkboxContainerTopPosition: number = 0;

    let checkboxFixed: boolean = false;
    let checkboxAbsolute: boolean = false;

    onMount(() => {
        checkboxContainerTopPosition = panelElement.getBoundingClientRect().top + window.scrollY;
    })

    const windowResizeHandler = () => {
        checkboxContainerTopPosition = panelElement.getBoundingClientRect().top + window.scrollY;
    }

    // handle checkbox fixed
    $: if (y > checkboxContainerTopPosition && y < (checkboxContainerTopPosition + (panelHeight - checkboxContainerHeight))) {
        checkboxFixed = true;
    } else {
        checkboxFixed = false;
    }

    // handle checkbox absolute
    $: if (y >= (checkboxContainerTopPosition + (panelHeight - checkboxContainerHeight))) {
        checkboxAbsolute = true;
    } else {
        checkboxAbsolute = false;
    }

</script>
<svelte:window  
    bind:scrollY={y}
    on:resize={windowResizeHandler}
    bind:innerWidth
/>
<div 
    class="service_panel"
    bind:clientHeight={panelHeight}
    bind:clientWidth={panelWidth}
    bind:this={panelElement}
>
    <div 
        id="checkbox"
        class={innerWidth >= 720 ? checkboxAbsolute ? "checkbox_absolute": checkboxFixed ? "checkbox_fixed" : "checkbox_relative" : "checkbox_relative"}
        bind:clientHeight={checkboxContainerHeight}
    >
        <div class="checkbox_container">
            <Checkbox 
                bind:checked={checkboxChecked} 
                bind:value={checkboxValue}
            >
                add to my project
            </Checkbox> 
        </div>
    </div>
    <div 
        class="service_info"
        style={innerWidth >= 720 && (checkboxAbsolute || checkboxFixed) ? `padding-top: ${checkboxContainerHeight}px;` : ""}
    >
        {#each panel_data as serviceData, index}
            <div class="image_container">
                {#if serviceData.imageSrc}
                    <img 
                        fetchpriority="high" 
                        loading="eager"
                        src={serviceData?.imageSrc} 
                        alt={serviceData?.imageAlt} 
                    />
                {/if}
                {#if serviceData.videoSrc}
                    <video 
                        class="video-js"
                        controls 
                        id="player"
                        muted={false}
                        autoplay={false}
                        poster={serviceData.videoPoster}
                    >
                        <track kind="captions">
                        <source src={serviceData.videoSrc} type="video/mp4"/>
                    </video>
                {/if}
            </div>
            <div class="panel_paragraphs">
                <p>
                    {serviceData?.paragraph}
                </p>
                <table>
                    <tbody>
                        {#each serviceData?.skills as skill, index}
                        <tr>
                            <td class="skill">
                                {skill}
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>  
            </div>
        {/each}
    </div>
</div>
<style>

    .service_panel {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .service_info {
        position: relative;
        width: 100%;
    }

    #checkbox {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        z-index: 1;
    }

    .checkbox_relative {
        position: relative
    }

    .checkbox_fixed {
        position: fixed;
        top: 0;
    }

    .checkbox_absolute {
        position: absolute;
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .image_container {
        width: 100%;
    }

    .image_container > img {
        width: 100%;
        
    }

    .panel_paragraphs {
        position: relative;
    }

    p {
        font-size: 2rem;
    }

    .skill {
        font-size: 1.75rem;
    }

    .checkbox_container {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 1rem;
        background-color: #EAF9EA;
    }

    @media screen and (max-width: 1440px) {

        p {
            font-size: 1.75rem;
        }

        .skill {
            font-size: 1.5rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .service_panel {
            flex-direction: column;
        }

        .service_info {
            width: 100%;
        }

        .select {
            width: 100%;
        }

        p {
            font-size: 1.5rem;
        }

        .skill {
            font-size: 1.25rem;
        }
    }

    @media screen and (max-width: 720px) {

        p {
            font-size: 1.25rem;
        }

        .skill {
            font-size: 1rem;
        }

        .select {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
    }

</style>