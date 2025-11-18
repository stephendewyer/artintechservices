<script lang="ts">
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    export let service_data;

</script>  
<div class="service_card" >
    <div class="service_image">
        {@html service_data.tabImageSrc}
    </div>
    <h3 class="service_name">
        {service_data.label}
    </h3>    
    {#each service_data.data as serviceData, index}
        <p>
           {serviceData.capabilities}
        </p>
        <a href={serviceData.pathname}>
            <ActionButtonSecondary>
                details
            </ActionButtonSecondary>
        </a>
    {/each}
</div>

<style>
    .service_card {
        position: relative;
        background-color: rgb(244,254,242, 0.75);
        width: 32rem;
        padding: 1rem;
        border: none;
        text-align: left;
    }

    .service_image {
        width: 100%;
        height: 8rem;
        fill: #2D3530;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 0 1rem 0;
    }

    .service_name {
        color: #2D3530;
        text-align: left;
    }

    @media screen and (max-width: 1920px) {
        .service_card {
            min-width: 24rem;

        }

    }

    @media screen and (max-width: 1080px) {
        .service_card {
            width: 20rem;
        }

    }

    @media screen and (max-width: 750px) {
        .service_card {
            min-width: 100%;
            padding: 0.5rem;

        }

    }
</style>