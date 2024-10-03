<script lang="ts">
    import MoonShot from "$lib/images/Art_in_Tech_Services_banner.png";
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import SliderTestimonials from "$lib/components/sliders/SliderTestimonials.svelte";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import WorkWithUsCard from "$lib/components/cards/WorkWithUsCard.svelte";
    import Consultation from "$lib/images/consultation/white-fluffy-clouds.jpg";
    import StartProject from "$lib/images/projects/Port_Mansfield_pier.jpg";
    import ManageAccount from "$lib/images/manage_account/reduced/wood_doors.jpg";
    import SaguaroCactus from "$lib/images/cactus/saguaro_cactus_cropped.png";
    import WaterfallGalaxy from "$lib/images/services_background/services_background.jpg";
    import { onMount } from "svelte";
    import ScrollableCaseStudies from "$lib/components/scrollables/ScrollableCaseStudies.svelte";
  import ScrollableServices from "$lib/components/scrollables/ScrollableServices.svelte";

    const howToWorkWithUsCards: HowToWorkWithUsCard[] = [
        {
            image: Consultation,
            altText: "fluffly clouds",
            header: "FREE consultations",
            paragraph: "We discuss with you your project to help plan for success.",
            pathname: [
                {
                    path: "/work-with-us/request-a-consultation",
                    label: "request a consultation"
                }
            ]
        },
        {
            image: StartProject,
            altText: "ocean pier",
            header: "start a project",
            paragraph: "We provide the services to deliver your project to meet or exceed your expectations.",
            pathname: [
                {
                    path: "/work-with-us/request-to-start-a-project",
                    label: "request to start a project"
                }
            ]
        },
        {
            image: ManageAccount,
            altText: "locked doors",
            header: "manage account",
            paragraph: "Keep your projects organized, view and schedule your consultations, update your account and make payments.",
            pathname: [
                {
                    path: "/logins/login-client",
                    label: "client login"
                },
                {
                    path: "/create-a-client-account",
                    label: "create free client account"
                }                
            ]
        },
    ];

    let introVisible: boolean = false;

    onMount(() => {
        setTimeout(() => introVisible = true, 300);
    });

    let y: number = 0;

</script>
<svelte:window bind:scrollY={y} />
<svelte:head>
    <title>Art in Tech Services - providing creative digital services to help businesses and communities</title>
    <meta name="description" content="creating digital products optimized to improve human experiences of technology by using advancements in art and digital technology" />
    <meta property="og:image" content={ArtInTechServicesBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN}/>
</svelte:head>
<div>
    <div class="intro_banner">
        <img style={`transform: translate(0, ${y}px)`} class="banner_image" src={MoonShot} alt="moonshot"/>
        <div class="saguaro_cactus_container">
            <img class="saguaro_cactus" src={SaguaroCactus} alt="saguaro cactus" />
        </div>
        <div 
            class="intro_paragraph_container"
            style={introVisible ? "opacity: 100%;" : "opacity: 0%;"}
        >
            <h1 class="intro_paragraph">
                providing creative digital services to help businesses and communities
            </h1>
        </div>
    </div>
    <h2 class="heading_02">
        case studies
    </h2>
    <ScrollableCaseStudies />
    <section class="services_section">
        <img class="services_background_image" src={ WaterfallGalaxy} alt="waterfall with galactic pool"/>
        <h2 class="heading_02" style="color: #F4FEF2; position: relative">
            services we provide
        </h2>
        <ScrollableServices />
    </section>
    <section class="why_choose_us_section">
        <h2 class="heading_02">
            why choose us?
        </h2>
        <h3 class="work_with_us_intro">Work with us to get:</h3>
        <ol class="why_choose_us_paragraphs">
            <li>
                <h4>Superior digital design capabilities</h4>
                We offer superior digital design because we combine the best of art and technology.  We understand human desire and state-of-the-art digital technology.  
            </li>
            <li>
                <h4>State-of-the-art digital technologies</h4>
                We use state-of-the-art digital technologies and are relentless in our pursuit to advance digital technology.  We&#39;re not only great people with whom to work, we also have superior technology chops.  Is your organization slow to adapt?  Work with us and we will get you up to speed.
            </li>
            <li>
                <h4>Creative problem solving</h4>
                We&#39;ll help provide digital solutions to problems you know you had in addition to helping you discover new and valuable ways to help your business and community.  We offer unmatched value by creating the digital products that help our clients transform to produce greater value for their communities. 
            </li>
            <li>
                <h4>Local support</h4>
                We&#39;re committed to making a positive impact.  We do all our work in-house from the United States.  We invest in training our staff in state-of-the-art technologies.  Working with us means you are working with a reliable partner who can guarantee quality far into the future.
            </li>
            <li>
                <h4>World-class expertise</h4>
                Working with us means working with some of the top experts in art and digital technology in the world.  We can guarantee superior quality of our products because of the quality of our staff, many of whom are nationally and internationally recognized for their work.
            </li>
            <li>
                <h4>Technology serving humans (not <span style="font-style: italic;">vice versa</span>)</h4>
                We&#39;re not a typical digital technology company.  We&#39;re on a mission to make digital technology work better for humans.
            </li>
        </ol>
    </section>
    <section class="testimonials_section">
        <h2 class="heading_02">
            testimonials
        </h2>
        <SliderTestimonials />
    </section>
    <h2 class="heading_02">
        how to work with us
    </h2>
    <div class="actions">
        {#each howToWorkWithUsCards as howToWorkWithUs, index}
            <WorkWithUsCard 
                card={howToWorkWithUs}
            />
        {/each}
    </div>
</div>

<style>

    .intro_banner {
        position: relative;
        width: 100%;
        height: 60rem;
        overflow: hidden;
    }

    .banner_image {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
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
        transition: opacity 0.2s linear;
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
        background: rgb(244,254,242, 0.75);
        padding: 0.5rem 1rem;
        max-width: 50%;
        width: auto;
        text-align: left;
    }

    .heading_02 {
        text-align: center;
        padding: 1rem;
    }

    .services_section {
        position: relative;
        width: 100%;
    }

    .services_background_image {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    .why_choose_us_section {
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .work_with_us_intro {
        padding: 0 0 1rem 0;
    }

    .why_choose_us_paragraphs {
        width: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .testimonials_section {
        width: 100%;
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
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

        .intro_banner {
            height: 42rem;
        }

        .saguaro_cactus {
            padding-top: 4rem;
        }

        .work_with_us_intro {
            padding: 0 0 0.75rem 0;
        }

        .why_choose_us_paragraphs {
            gap: 0.75rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .intro_banner {
            height: 34rem;
        }

        .intro_paragraph {
            padding: 0.375rem 0.75rem;
        }

        .saguaro_cactus {
            padding-top: 8rem;
        }

        .work_with_us_intro {
            padding: 0 0 0.5rem 0;
        }

        .why_choose_us_paragraphs {
            gap: 0.5rem;
        }
    }

    @media screen and (max-width: 720px) {

        .intro_banner {
            padding: 0;
            height: 24rem;
        }

        .saguaro_cactus {
            padding-top: 8rem;
            margin-left: 0.25rem;
        }

        .intro_paragraph {
            padding: 0.25rem 0.5rem;
            max-width: 60%;
        }

        .actions {
            flex-direction: column;
            align-items: center;
            padding: 0 1rem 1rem 1rem;
        }

        .why_choose_us_paragraphs {
            width: 100%;
            max-width: 40rem;
            margin: 0;
            padding: 0 1rem;
        }
    }
    
</style>