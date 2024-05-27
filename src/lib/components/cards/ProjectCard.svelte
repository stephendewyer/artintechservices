<script lang="ts">
    import Meatballs from "$lib/images/icons/meaballs.svg?raw";
    export let project: Project;
    const projectInfoArray = project.project_info.split(" ");
    const projectInfoShortened = projectInfoArray.slice(0, 5).join(" ");

</script>
<div class="project_card">
    <img 
        class="background_image" 
        src={project.image_URL} 
        alt={project.image_alt_text} 
    />
    <div class="overlay" />
    <div class="project_info">
        <div class="meatballs_container">
            <div class="meatballs">
                {@html Meatballs}
            </div>
        </div>
    </div>
</div>
<style>

    .project_card {
        position: relative;
        width: 20rem;
        height: 20rem;
        transition: box-shadow 0.2s linear;
        cursor: pointer;
    }

    .project_card:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }
    .background_image {
        position: absolute;
        object-fit: cover;
        object-position: center;
        height: 100%;
        width: 100%;
    }

    .overlay {
        background-color: #ffff;
        position: absolute;
        opacity: 50%;
        width: 100%;
        height: 100%;
    }

    .project_info {
        position: relative;
        padding: 1rem;
        width: 100%;
        height: 100%;
    }

    .meatballs_container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: right;
    }

    .meatballs {
        width: 1.5rem;
    }
    

</style>