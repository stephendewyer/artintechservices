<script lang="ts">
  import { onDestroy } from "svelte";

    export let panel_data: ServicePanel[] | [null];

    let checkboxValue: string;

    let checkboxChecked: boolean = false;

    onDestroy(() => {
        panel_data = [null];
    })
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
        <input 
            type="checkbox" 
            value={checkboxValue}
            checked={checkboxChecked}
        />
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
        width: 25%;
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