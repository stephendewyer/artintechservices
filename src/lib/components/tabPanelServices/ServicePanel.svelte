<script lang="ts">
    import Checkbox from "$lib/components/inputs/Checkbox.svelte";
    import { afterUpdate, onDestroy } from "svelte";
    import { RequestedServicesStore } from "$lib/stores/RequestedServicesStore";

    export let panel_data: ServicePanel[] | [null];

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

    afterUpdate(() => {
        $RequestedServicesStore.forEach((service, index) => {
            const serviceSearchFormat = service.service.split(' ').join('-');
            if (search === serviceSearchFormat) {
                checkboxChecked = $RequestedServicesStore[index].requested;
            };
        });
    });

    onDestroy(() => {
        panel_data = [null];
    });

</script>
<div class="service_panel">
    <div class="service_info">
        {#each panel_data as serviceData, index}
            <div class="image_container">
                <img 
                    fetchpriority="high" 
                    loading="eager"
                    src={serviceData?.imageSrc} 
                    alt={serviceData?.imageAlt} 
                />
            </div>
            <p>
                {serviceData?.paragraph}
            </p>
            <ul>
                {#each serviceData?.skills as skill, index}
                    <li>
                        {skill}
                    </li>
                {/each}
            </ul>
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
    }

    .select {
        padding: 1rem;
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image_container {
        width: 100%;
    }

    .image_container > img {
        object-fit: cover;
        height: 40rem;
        width: 100%;
        object-position: center;
        
    }

    @media screen and (max-width: 1440px) {
        .image_container > img {
            height: 35rem;
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

        .image_container > img {
            height: 30rem;
        }
    }

    @media screen and (max-width: 720px) {

        .image_container > img {
            height: 20rem;
            
        }
    }

</style>