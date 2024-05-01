<script lang="ts">
    import MoonShot from "$lib/images/Art_in_Tech_Services_banner.png";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import SliderCaseStudies from "$lib/components/sliders/SliderCaseStudies.svelte";
</script>

<svelte:head>
    <title>Art in Tech Services - delivering state-of-the-art digital products since 2021</title>
    <meta name="description" content="creating digital products optimized to improve human experiences of technology by using advancements in art and digital technology" />
    <meta property="og:image" content={ArtInTechServicesBanner} />
    <meta property="og:url" content="https://artintechservices.vercel.app/" />
    <meta name="robots" content="index, follow" />
</svelte:head>

<div>
    <div class="intro_banner">
        <img src={MoonShot} alt="moonshot" />
        <div class="intro_paragraph_container">
            <h1 class="intro_paragraph">
                delivering state-of-the-art digital technology products since 2001
            </h1>
        </div>
    </div>
    <h2 class="heading_02">
        case studies
    </h2>
    <SliderCaseStudies />
    <h2 class="heading_02">
        services we provide
    </h2>
    <h2 class="heading_02">
        why choose us?
    </h2>
    <h2 class="heading_02">
        work with us
    </h2>

</div>

<style>
    .intro_banner {
        position: relative;
        width: 100%;
    }

    .intro_paragraph_container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }

    .intro_paragraph {
        background-color: #F4FEF2; 
        padding: 1rem;
    }

    .heading_02 {
        text-align: center;
    }

    @media screen and (max-width: 1040px) {
        .intro_paragraph {
            padding: 0.75rem;
        }
    }

    @media screen and (max-width: 720px) {
        .intro_paragraph_container {
            position: relative;
            padding: 0;
        }
    }
    
</style>