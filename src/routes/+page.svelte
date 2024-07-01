<script lang="ts">
    import MoonShot from "$lib/images/Art_in_Tech_Services_banner.png";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import SliderCaseStudies from "$lib/components/sliders/SliderCaseStudies.svelte";
    import Services from "$lib/components/Services.svelte";
    import InvestInUS from "$lib/images/maps/source_locally_map.svg?raw";
    import ArtTechExpertise from "$lib/images/expertise.png";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import WorkWithUsCard from "$lib/components/cards/WorkWithUsCard.svelte";
    import Consultation from "$lib/images/consultation/white-fluffy-clouds.jpg";
    import StartProject from "$lib/images/projects/Port_Mansfield_pier.jpg";
    import ManageAccount from "$lib/images/manage_account/reduced/wood_doors.jpg";
    import SaguaroCactus from "$lib/images/cactus/saguaro_cactus_cropped.png";

    const howToWorkWithUsCards: HowToWorkWithUsCard[] = [
        {
            image: Consultation,
            altText: "fluffly clouds",
            header: "FREE first consultation",
            paragraph: "We discuss with you your project to help plan for success.  Your first consultation is free.  Each consultation after the first consultation is $65 per hour.",
            pathname: [
                "/request-a-consultation"
            ]
        },
        {
            image: StartProject,
            altText: "ocean pier",
            header: "start a project",
            paragraph: "We provide the services to deliver your project to meet or exceed your expectations.",
            pathname: [
                "/request-to-start-a-project"
            ]
        },
        {
            image: ManageAccount,
            altText: "locked doors",
            header: "manage account",
            paragraph: "Keep your projects organized, view and schedule your consultations, update your account and make payments.",
            pathname: [
                "/login-client",
                "/create-a-client-account"
            ]
        },
    ];

</script>

<svelte:head>
    <title>Art in Tech Services - providing creative digital services to help businesses and communities</title>
    <meta name="description" content="creating digital products optimized to improve human experiences of technology by using advancements in art and digital technology" />
    <meta property="og:image" content={ArtInTechServicesBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN}/>
</svelte:head>

<div>
    <div class="intro_banner">
        <img class="banner_image" src={MoonShot} alt="moonshot"/>
        <div class="saguaro_cactus_container">
            <img class="saguaro_cactus" src={SaguaroCactus} alt="saguaro cactus" />
        </div>
        <div class="intro_paragraph_container">
            <h1 class="intro_paragraph">
                providing creative digital services to help businesses and communities
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
    <div class="why_choose_us_item" style="background-color: #DAE3E4;">
        <div 
            class="why_choose_us_image_and_paragraph"
            id="investing_in_local_US_talent"
        >
            <div class="choose_us_image_container">
                <div class="why_choose_us_image">
                    {@html InvestInUS}
                </div>
            </div>
            <div class="why_choose_us_paragraph_container">
                <h3 class="why_choose_us_heading">
                investing in local, world-class talent in the U.S.
                </h3>
                <p class="why_choose_us_paragraph">
                    We provide all of our services from our in-house team in the United States. We invest in building the skills of our workers.  We are a U.S. company.  Working with us is an investment in talent in the United States.
                </p>
            </div>
        </div>
    </div>
    <div class="why_choose_us_item" style="background-color: #F6E7CE;">
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
                <div class="why_choose_us_image">
                    <img src={ArtTechExpertise} alt="art and tech expertise dumbbell" />
                </div>
            </div>
        </div>
    </div>
    <h2 class="heading_02">
        how to work with us
    </h2>
    <div class="actions">
        {#each howToWorkWithUsCards as howToWorkWithUs, index}
            <WorkWithUsCard card={howToWorkWithUs} />
        {/each}
    </div>
</div>

<style>
    .intro_banner {
        position: relative;
        width: 100%;
    }

    .banner_image {
        position: relative;
        width: 100%;
        object-fit: cover;
        object-position: top;
        height: 60rem;
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

    .saguaro_cactus_container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
    }

    .saguaro_cactus {
        height: 100%;
        padding-top: 4rem;
        width: auto;
        margin-left: 12.5%;
    }

    .intro_paragraph {
        background: rgb(255,255,255, 0.75);
        padding: 0.5rem 1rem;
        max-width: 50%;
        width: auto;
        text-align: center;
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
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .why_choose_us_image {
        width: 100%;
        max-width: 100rem;
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
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding: 1rem 1rem 4rem 1rem;
        gap: 1rem;
    }

    @media screen and (max-width: 1440px) {
        .banner_image {
            height: 42rem;
        }

        .saguaro_cactus {
            padding-top: 4rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .banner_image {
            height: 34rem;
        }
        .intro_paragraph {
            padding: 0.375rem 0.75rem;
        }

        .saguaro_cactus {
            padding-top: 8rem;
        }
    }

    @media screen and (max-width: 720px) {

        .case_studies_carousel {
            padding: 0;
        }

        .intro_banner {
            padding: 0;
        }

        .banner_image {
            height: 24rem;
            object-fit: cover;
        }

        .saguaro_cactus {
            padding-top: 8rem;
            margin-left: 0.25rem;
        }

        .intro_paragraph {
            padding: 0.25rem 0.5rem;
            max-width: 60%;
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
        }
    }
    
</style>