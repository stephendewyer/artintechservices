<script lang="ts">
    export let panel_data: ServicePanel[] | [null];

</script>
<div class="process_panel">
    <div class="process_info">
        {#each panel_data as processData, index}
            <div class="image_container">
                {@html processData?.imageSrc}
            </div>
            <p class="process_paragraph">
                {processData?.paragraph}
            </p>
        {/each}
    </div>
</div>
<style>

    .process_panel {
        padding: 0;
        margin: 0;
        width: 100%;
    }

    .process_info {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .image_container {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 20rem;
        max-width: 20rem;
    }

    .process_paragraph {
        width: 50%;
    }
    @media screen and (max-width: 1440px) {
    }

    @media screen and (max-width: 1080px) {
    }

    @media screen and (max-width: 720px) {
    }

</style>