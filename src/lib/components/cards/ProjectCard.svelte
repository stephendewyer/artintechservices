<script lang="ts">
    import Meatballs from "$lib/images/icons/meaballs.svg?raw";
    import DefaultProjectImage from "$lib/images/projects/Port_Mansfield_pier.jpg";
    export let project: Project;

    let projectInfo: string = "";
    let projectInfoShortened: boolean = false;

    if (project.project_info.split(" ").length >= 8) {
        projectInfo = project.project_info.split(" ").slice(0, 8).join(" ");
        projectInfoShortened = true;
    } else {
        projectInfo = project.project_info;
        projectInfoShortened = false;
    };

    let cardHovered: boolean = false;

    const cardHoveredHandler = () => {
        cardHovered = true;
    };

    const cardExitedHandler = () => {
        cardHovered = false;
    };

</script>
<a 
    class="project_card"
    on:mouseover={cardHoveredHandler}
    on:mouseenter={cardHoveredHandler}
    on:focus={cardHoveredHandler}
    on:mouseout={cardExitedHandler}
    on:mouseleave={cardExitedHandler}
    on:blur={cardExitedHandler}
    href={`/authenticated-client/client/project?id=${project.project_ID}`}
>
    <img 
        class="background_image" 
        src={(project.image_URL) ? project.image_URL : DefaultProjectImage} 
        alt={(project.image_alt_text) ? project.image_alt_text : "phases of the moon"} 
    />
    <div class="overlay" />
    <div class="project_info">
        <div class="meatballs_container">
            <div 
                class="meatballs"
                style={cardHovered ? "fill: #d79679;": "fill: #36261E;"}
            >
                {@html Meatballs}
            </div>
        </div>
        <div class="project_text">
            <h4>{project.project_name}</h4>
            <p style="margin: 0; font-weight: bold;">{projectInfo}{#if projectInfoShortened}...{/if}</p>
            <p style="margin: 0;">created on {new Date(project.date_created).toUTCString().slice(0, 16)}</p>
        </div>
    </div>
</a>
<style>

    .project_card {
        position: relative;
        width: 100%;
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

    .project_info {
        position: relative;
        padding: 1rem;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .meatballs_container {
        position: absolute;
        padding: 0 2rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: right;
    }

    .meatballs {
        width: 1.5rem;
        transition: fill 0.2s linear;
    }
    
    .project_text {
        margin: auto;
        height: auto;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: rgb(255,255,255, 0.75);
    }
    
</style>