<script lang="ts">
    import { fade } from "svelte/transition";
    import ActionButtonSecondary from "../buttons/ActionButtonSecondary.svelte";

    export let panel_data: TabPanel[];

    const aboutPanelData: AboutPanel | any = panel_data[0];

</script>
<div 
    class="about_panel" 
    in:fade={{ delay: 250, duration: 300 }}
>
    <img 
        class="about_image"
        src={aboutPanelData.imageSrc} 
        alt={aboutPanelData.imageAlt} 
    />
    <div class="about_info_container">
        <p class="about_info">
            {aboutPanelData.heading}
        </p>
        <a href={aboutPanelData.buttonLink}>
            <ActionButtonSecondary>
                {aboutPanelData.buttonText}
            </ActionButtonSecondary>
        </a>
    </div>
</div>


<style>

    .about_panel {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
    }

    .about_image {
        width: 100%;
        position: relative;
    }

    .about_info_container {
        position: absolute;
        width: 100%;
        max-width: 20rem;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
    }

    .about_info {
        position: relative;
        padding: 1rem;
        background: rgb(244,254,242, 0.5);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
        backdrop-filter: blur(10px);
    }

    @media screen and (max-width: 720px) {
        .about_info_container {
            position: absolute;
            width: auto;
            max-width: 100%;
            right: 0;
            top: 0;
            bottom: 0;
            left: 0;
            justify-content: flex-end;
            flex-direction: column;
            align-items: flex-start;
            gap: 0rem;
        }

    }

</style>