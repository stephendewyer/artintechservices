<script lang="ts">
    import { fade } from 'svelte/transition';

    export let panel_data: ProcessPanel[];

</script>
<div 
    in:fade={{ delay: 250, duration: 300 }}
    class="process_panel"
>
    {#key panel_data}
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
    {/key}
</div>
<style>

    .process_panel {
        padding: 0 1rem 1rem 1rem;
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
    }

    .process_paragraph {
        width: 50%;
        font-size: 2rem;
        max-width: 40rem;
    }

    @media screen and (max-width: 1440px) {

        .process_paragraph {
            font-size: 1.5rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .process_paragraph {
            font-size: 1.25rem;
        }
    }

    @media screen and (max-width: 720px) {

        .process_panel {
            padding: 1rem;
            
        }

        .image_container {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-height: 10rem;
        }

        .process_info {
            flex-direction: column;
            gap: 0.5rem;
        }

        .image_container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-height: 20rem;
        }

        .process_paragraph {
            width: 100%;
            font-size: 1rem;
        }
    }

</style>