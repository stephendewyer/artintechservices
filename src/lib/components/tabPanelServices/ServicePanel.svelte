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

</script>
<div class="service_panel">
    <div class="service_info">
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
    <div class="select">
        <Checkbox 
            bind:checked={checkboxChecked} 
            bind:value={checkboxValue}
        >
            add to my requested services
        </Checkbox>
    </div>
</div>
<style>

    .service_panel {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .service_info {
        width: 75%;
        max-width: 60rem;
    }

    .select {
        padding: 1rem;
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .image_container {
        width: 100%;
    }

    .image_container > img {
        width: 100%;
        
    }

    .panel_paragraphs {
        position: relative;
        padding: 1rem;
    }

    p {
        font-size: 2rem;
    }

    .skill {
        font-size: 1.75rem;
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
    }

</style>