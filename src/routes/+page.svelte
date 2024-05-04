<script lang="ts">
    import MoonShot from "$lib/images/Art_in_Tech_Services_banner.png";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import SliderCaseStudies from "$lib/components/sliders/SliderCaseStudies.svelte";
    import Services from "$lib/components/Services.svelte";
    import InvestInUS from "$lib/images/maps/source_locally_map.svg?raw";
    import ArtTechExpertise from "$lib/images/expertise.png";
    import ActionButton from "$lib/components/buttons/ActionButton.svelte";
    import Consultation from "$lib/images/icons/actions/consultation_solid.svg?raw";
    import StartProject from "$lib/images/icons/actions/desk_call_bell_solid.svg?raw";
    import ManageAccount from "$lib/images/icons/actions/manage_account_solid.svg?raw"

    const actions: Action[] = [
        {
            image: Consultation,
            pathname: "/request-a-consultation",
            label: "request a consultation"
        },
        {
            image: StartProject,
            pathname: "/request-to-start-a-project",
            label: "request to start a project"
        },
        {
            image: ManageAccount,
            pathname: "/login-client",
            label: "manage account"
        }
    ];

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
        <div class="banner_image_container">
            <img src={MoonShot} alt="moonshot"/>
        </div>
        <div class="intro_paragraph_container">
            <h1 class="intro_paragraph">
                delivering state-of-the-art digital technology products since 2021
            </h1>
        </div>
    </div>
    <h2 class="heading_02">
        case studies
    </h2>
    <div class="case_studies_carousel">
        <SliderCaseStudies />
    </div>
    <h2 class="heading_02">
        services we provide
    </h2>
    <div class="services">
        <Services />
    </div>
    <h2 class="heading_02">
        why choose us?
    </h2>
    <div class="why_choose_us_item">
        <div 
            class="why_choose_us_image_and_paragraph"
            id="investing_in_local_US_talent"
        >
            <div class="choose_us_image_container">
                {@html InvestInUS}
            </div>
            <div class="why_choose_us_paragraph_container">
                <h3 class="why_choose_us_heading">
                investing in local, world-class talent in the U.S.
                </h3>
                <p class="why_choose_us_paragraph">
                    We provide all of our services from our in-house team with talent cultivated in the United States. We are a U.S. company.  Working with us is an investment in the cultivation of talent in the United States.
                </p>
            </div>
        </div>
    </div>
    <div class="why_choose_us_item">
        <div 
            class="why_choose_us_image_and_paragraph"
            id="art_and_tech_expertise"
        >
            <div class="why_choose_us_paragraph_container">
                <h3 class="why_choose_us_heading">
                    receive expertise on art and digital technology to create digital products optimized for human experiences
                </h3>
                <p class="why_choose_us_paragraph">
                    We combine the vision and technical expertise to make groundbreaking digital products.
                </p> 
            </div>
            <div class="choose_us_image_container">
                <img src={ArtTechExpertise} alt="art and tech expertise dumbbell" />
            </div>
        </div>
    </div>
    <h2 class="heading_02">
        work with us
    </h2>
    <div class="actions">
        {#each actions as action, index}
            <ActionButton action={action} />
        {/each}
    </div>
</div>

<style>
    .intro_banner {
        position: relative;
        width: 100%;
    }

    .banner_image_container {
        position: relative;
        width: 100%;
        height: auto;
        display: flex;
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
        padding: 1rem;
    }

    .case_studies_carousel {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 1rem;
    }

    .why_choose_us_item {
        max-width: 1440px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0 1rem;
    }

    .why_choose_us_heading {
        width: 100%;
        max-width: 40rem;
        text-align: center;
    }

    .why_choose_us_image_and_paragraph {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .choose_us_image_container {
        width: 50%;
    }

    .why_choose_us_paragraph_container {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .why_choose_us_paragraph {
        width: 100%;
        max-width: 40rem;
    }

    .actions {
        max-width: 1440px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem 1rem 2rem 1rem;
        gap: 1rem;
    }

    @media screen and (max-width: 1040px) {
        .intro_paragraph {
            padding: 0.75rem;
        }

        .actions {
            gap: 0.75rem;
        }
    }

    @media screen and (max-width: 720px) {

        .case_studies_carousel {
            padding: 0;
        }

        .intro_banner {
            padding: 7.75rem 0  0 0;
        }
        .intro_paragraph_container {
            position: relative;
            padding: 0;
        }
        .intro_paragraph {
            width: 100%;
        }

        .choose_us_image_container {
            width: 100%;
        }

        .why_choose_us_paragraph_container {
            width: 100%;
        }

        #investing_in_local_US_talent {
            flex-direction: column;
        }

        #art_and_tech_expertise {
            flex-direction: column-reverse;
        }

        .actions {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
    }
    
</style>