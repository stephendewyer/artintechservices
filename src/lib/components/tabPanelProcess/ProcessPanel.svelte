<script lang="ts">
    export let panel_data: ServicePanel[] | [null];

</script>
<div class="service_panel">
    <div class="service_info">
        {#each panel_data as processData, index}
            <div class="image_container">
                {@html processData?.imageSrc}
            </div>
            <p>
                {processData?.paragraph}
            </p>
        {/each}
    </div>
</div>
<style>


    @media screen and (max-width: 1440px) {
    }

    @media screen and (max-width: 1080px) {
    }

    @media screen and (max-width: 720px) {
    }

</style>