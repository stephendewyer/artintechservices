<script lang="ts">
    import MoonShot from "$lib/images/Art_in_Tech_Services_banner.png";
    import Supermoon from "$lib/images/banner/supermoon.png";
    import Stripes from "$lib/images/banner/Art_in_Tech_Services_banner_stripes_02.png"
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import SliderTestimonials from "$lib/components/sliders/SliderTestimonials.svelte";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import SaguaroCactus from "$lib/images/cactus/saguaro_cactus_cropped.png";
    import WaterfallGalaxy from "$lib/images/services_background/services_background.jpg";
    import ScrollableCaseStudies from "$lib/components/scrollables/ScrollableCaseStudies.svelte";
    import ScrollableServices from "$lib/components/scrollables/ScrollableServices.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import LoginClient from "$lib/components/logins/LoginClient.svelte";

    import { onMount } from "svelte";

    let introVisible: boolean = false;

    let scrolledY: number = 0;

    let innerHeight: number = 0;

    let innerWidth: number = 0;

    let scaleY: number = 1 - (scrolledY * 0.001);

    let saguaroMarginLeftPercentage: number | string = 12.5;

    let saguaroHeightPercentage: number = 90;

    $: if (scaleY >= 0) {
        if (innerWidth > 720) {
            saguaroMarginLeftPercentage = 12.5 * scaleY;
        } else {
            saguaroMarginLeftPercentage = "auto";
        };
    } else  {
        saguaroMarginLeftPercentage = 0;
    };

    $: saguaroHeightPercentage = 90 + (scrolledY/10);

    onMount(() => {
        setTimeout(() => introVisible = true, 300);
    });

    let debouncedY: number = 0;

    const debounce = (v: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        timeout = setTimeout(() => debouncedY = v, 40);
    };
    
    const handleScroll = () => {
        scaleY = 1 - (scrolledY * 0.001);
        debounce(scrolledY);
    };
    
</script>
<svelte:window 
    on:scroll={handleScroll}
    bind:scrollY={scrolledY}
    bind:innerHeight
    bind:innerWidth
/>
<svelte:head>
    <title>Art in Tech Services - artfully crafting software that helps businesses better serve communities</title>
    <meta name="description" content="Art in Tech Services develops imaginative software solutions to human problems using state-of-the-art technology" />
    <meta property="og:image" content={ArtInTechServicesBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN}/>
</svelte:head>
<div>
    <section class="intro_banner">
        <div class="banner_image">
            <img 
                style={`transform: translate(0, ${debouncedY}px)`} 
                class="supermoon" 
                src={Supermoon} 
                alt="moonshot"
            />
        </div>
        <img 
            src={Stripes}
            class="stripes"
            alt="alternating stripes"
        />
        <div class="saguaro_cactus_container">
            <img 
                style={`margin-left: ${saguaroMarginLeftPercentage}%; height: ${saguaroHeightPercentage}%;`}
                class="saguaro_cactus" 
                src={SaguaroCactus} 
                alt="saguaro cactus" 
            />
        </div>
        <div 
            class="banner_text" 
            style={introVisible ? "opacity: 100%;" : "opacity: 0%;"}
        >
            <h1 class="intro_paragraph">
                artfully crafting software that helps businesses better serve communities
            </h1>
            <a href="/how-to-work-with-us/request-a-consultation" class="schedule_consultation_button">
                <ActionButtonSecondary>
                    schedule a consultation
                </ActionButtonSecondary>
            </a>
        </div>
        
    </section>
    <section class="second_paragraph_section">
        <h2>
            state-of-the-art technology, designed for humans
        </h2>
        <p>
            We help organizations better serve their communities through custom software that blends art, design, and modern technology.
        </p>
    </section>
    <section id="login_client_section" >
        <h2 class="login_heading">
            login client
        </h2>
        <LoginClient />
    </section>
    <section>
        <h2 class="heading_02">
            case studies
        </h2>
        <ScrollableCaseStudies />
    </section>
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
        <p class="why_choose_us">
            Art in Tech Services exists to bridge the gap between creativity and technology. With a background in UX design, software engineering, and the arts, we bring a unique perspective to every project—one that values people as much as code.
        </p>
        <ol class="why_choose_us_paragraphs">
            <li class="why_choose_us_reason">
                <h4>Envisioning solutions to real-world problems</h4>
                Our team brings award-winning expertise in envisioning software that solves real-world problems.  We are able to define the problem to solve by seeing how your product will fit into the bigger picture.
            </li>
            <li class="why_choose_us_reason">
                <h4>Superior digital design capabilities</h4>
                We offer superior digital design because we know how to design for humans using the best of art and technology. 
            </li>
            <li class="why_choose_us_reason">
                <h4>State-of-the-art digital technologies</h4>
                We use state-of-the-art digital technologies and are relentless in our pursuit to advance digital technology.  We&#39;re not only great people with whom to work, we also have superior technology chops.  Is your organization slow to adapt?  Work with us and we will get you up to speed.
            </li>
            <li class="why_choose_us_reason">
                <h4>Creative problem solving</h4>
                Have a difficult problem to solve?  We think outside the box to find solutions to difficult problems.  
            </li>
            <li class="why_choose_us_reason">
                <h4>Investing in the United States</h4>
                We&#39;re committed to making a positive impact.  We do not outsource our work, which is a large reason we can guarantee the finest quality work.  We do all our work in-house from the United States.  We invest in training our staff in state-of-the-art technologies.  Working with us means you are working with a reliable partner who can guarantee quality far into the future.
            </li>
            <li class="why_choose_us_reason">
                <h4>World-class expertise</h4>
                Working with us means working with some of the top experts in art and digital technology in the world.  We can guarantee superior quality of our products because of the quality of our staff, many of whom are nationally and internationally recognized for their work.
            </li>
            <li class="why_choose_us_reason">
                <h4>Technology serving humans (not <span style="font-style: italic;">vice versa</span>)</h4>
                We&#39;re not a typical digital technology company.  We&#39;re on a mission to make digital technology work better for humans.
            </li>
            <li class="why_choose_us_reason">
                <h4>Innovation comes from seeing people as who they are and not as just a number</h4>
                Big Tech (i.e. the FAANG companies) sees people as numbers.  We see people for who they are: human beings.  For that reason, our innovations are focused on bringing greater value to the communities we serve and not just shareholders, which, in turn, keeps our focus on innovating instead of wealth extraction.
            </li>
        </ol>
    </section>
    <section class="testimonials_section">
        <h2 class="heading_02">
            testimonials
        </h2>
        <SliderTestimonials />
    </section>
    <section class="how_to_work_with_us">
        <h2 class="heading_02">
            how to work with us
        </h2>
        <h3 class="actions">
            We’re currently open to new collaborations.
        </h3>
        <a href="/how-to-work-with-us">
            <ActionButtonSecondary>
                learn ways to work with us
            </ActionButtonSecondary>
        </a>
    </section>
</div>

<style>

    .intro_banner {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: #7da9bc;
    }

    .banner_image {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        will-change: transform;
    }

    .supermoon {
        width: 100%;
        height: 100%;
        max-width: 1920px;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        object-fit: cover;
        object-position: top;
        margin: 0 auto;
    }

    .stripes {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .banner_text {
        position: absolute;
        top: 0;
        bottom: 0;
        left: auto;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 40%;
        padding: 1rem 1rem 1rem 0;
        gap: 1rem;
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
        width: auto;
    }

    .intro_paragraph {
        background: #FFCE78;
        width: 100%;
        padding: 1rem 2rem;
        text-align: left;
        font-size: 4rem;
        border-radius: 2rem;
    }

    .heading_02 {
        text-align: center;
        padding: 1rem;
    }

    #login_client_section {
        width: 100%;
        background-color: #F9E4CD;
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .login_heading {
        font-size: 1.5rem;
    }

    .why_choose_us_section {
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
    }

    .why_choose_us_paragraphs {
        display: grid;
        grid-template-columns: auto auto auto auto;
        column-gap: 1rem;
        row-gap: 1rem;
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 1rem;
    }

    .why_choose_us_reason {
        width: 100%;
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
        padding: 1rem;
        gap: 1rem;
    }

    .second_paragraph_section {
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
    }

    .how_to_work_with_us {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        padding: 0 0 2rem 0;
    }

    .why_choose_us {
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;
        padding: 1rem;
    }

    @media screen and (max-width: 1440px) {

        .banner_text {
            width: 40%;
        }

        .intro_paragraph {
            font-size: 3rem;
        }

        .why_choose_us_paragraphs {
            gap: 0.75rem;
        }

        .why_choose_us_paragraphs {
            grid-template-columns: auto auto auto;
        }

        .login_heading {
            font-size: 1.35rem;
        }

    }

    @media screen and (max-width: 1080px) {

        .login_heading {
            font-size: 2rem;
        }

        .intro_paragraph {
            font-size: 2rem;
            padding: 0.5rem 1rem;
        }

        .why_choose_us_paragraphs {
            grid-template-columns: auto auto;
        }

    }

    @media screen and (max-width: 720px) {

        .saguaro_cactus {
            /* padding-top: 1rem; */
            margin-left: 60%;
        }

        .banner_text {
            left: 1rem;
            right: auto;
            width: 60%;
            top: 0;
            bottom: 0;
        }

        .intro_paragraph {
            font-size: 1.5rem;
        }

        .schedule_consultation_button {
            padding: 0 0 0 1rem;
        }

        .actions {
            flex-direction: column;
            align-items: center;
            padding: 0 1rem 1rem 1rem;
        }

        .why_choose_us_paragraphs {
            width: 100%;
            grid-template-columns: auto;
        }

        .why_choose_us_reason {
            padding: 0;
        }

    }
    
</style>