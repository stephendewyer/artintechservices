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
    import ScrollableCaseStudies from "$lib/components/scrollables/ScrollableCaseStudies.svelte";
    import ScrollableServices from "$lib/components/scrollables/ScrollableServices.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import PasswordInput from "$lib/components/inputs/PasswordInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import { signIn } from "@auth/sveltekit/client";
    import ConsultationIcon from "$lib/images/icons/consultation_icon.svg?raw";
    import ProjectIcon from "$lib/images/icons/project.svg?raw";
    import ManageAccountIcon from "$lib/images/icons/manage_account_solid.svg?raw";
    import { onMount } from "svelte";
    import ArtInTechServicesClientPortalVideo from "$lib/videos/Art_in_Tech_Services_client_portal_overview.mp4";
    import ArtInTechServicesClientPortalPosterImage from "$lib/videos/Art_in_Tech_Services_client_portal_overview.jpg";

    const howToWorkWithUsCards: HowToWorkWithUsCard[] = [
        {
            video: null,
            video_poster: null,
            image: Consultation,
            icon: ConsultationIcon,
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
            video: null,
            video_poster: null,
            image: StartProject,
            icon: ProjectIcon,
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
            video: ArtInTechServicesClientPortalVideo,
            video_poster: ArtInTechServicesClientPortalPosterImage,
            image: ManageAccount,
            icon: ManageAccountIcon,
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

    let scrolledY: number = 0;

    let innerHeight: number = 0;

    let innerWidth: number = 0;

    onMount(() => {
        setTimeout(() => introVisible = true, 300);
    });

    let debouncedY: number = 0;

    const debounce = (v: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        timeout = setTimeout(() => debouncedY = v, 40);
    };
    
    const handleScroll = () => {
        debounce(window.scrollY);
    };
    
    // receive form data from server

    let emailInputValue: string = "";
    let emailIsValid: boolean = true;

    let passwordInputValue: string = "";
    let passwordIsValid: boolean = true;

    let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000)
    };

    const loginClient = async (
        email: string,
        password: string
    ) => {
        const response = await fetch("/api/authentication/signInClient", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const loginClientHandler = async () => {
        pending = true;
        try {
            await loginClient(emailInputValue, passwordInputValue);
            if (responseItem.success) {
                try {
                    await signIn("credentials", {
                        providerId: "client-login",
                        email: emailInputValue,
                        password: passwordInputValue,
                        redirect: true,
                        callbackUrl: "/authenticated-client/client"
                    });
                } catch (error) {
                    console.log(error);
                };
            } else if (responseItem.error) {
                if ((emailInputValue === "") || (!emailInputValue.includes('@'))) {
                    emailIsValid = false;
                };
                if (passwordInputValue === "") {
                    passwordIsValid = false;
                };
            };
        } catch (error) {
            console.log(error);
        };
    };

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };

</script>
<svelte:window 
    on:scroll={handleScroll}
    bind:scrollY={scrolledY}
    bind:innerHeight
    bind:innerWidth
/>
<svelte:head>
    <title>Art in Tech Services - creative software that combines art and state-of-the-art technology</title>
    <meta name="description" content="creating digital products optimized to improve human experiences of technology by using advancements in art and digital technology" />
    <meta property="og:image" content={ArtInTechServicesBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN}/>
</svelte:head>
<div>
    <section class="intro_banner">
        <img 
            style={`transform: translate(0, ${debouncedY}px)`} 
            class="banner_image" 
            src={MoonShot} 
            alt="moonshot"
        />
        <div class="saguaro_cactus_container">
            <img class="saguaro_cactus" src={SaguaroCactus} alt="saguaro cactus" />
        </div>
        <div 
            class="intro_paragraph_container"
            style={introVisible ? "opacity: 100%;" : "opacity: 0%;"}
        >
            <h1 
                style={`transform: translate(0, ${(debouncedY/2)}px)`}
                class="intro_paragraph"
            >
                creative software that combines art and state-of-the-art technology
            </h1>
        </div>
    </section>
    <section class="second_paragraph_section">
        <h2>
            Our software focuses on the human impact of technological advancements to help organizations better serve communities.
        </h2>
    </section>
    <section id="login_client_section" >
        <h2 class="login_heading">
            login client
        </h2>
        <form class="form" on:submit|preventDefault={loginClientHandler}>
            <div class="input_row">
                <EmailInput
                    bind:isValid={emailIsValid}
                    placeholder="myEmail@myDomain.com"
                    inputID="client_email"
                    inputName="client_email"
                    bind:emailInputValue={emailInputValue}
                    inputLabel={true}
                    required={true}
                >
                    email:
                </EmailInput>
            </div>
            <div class="input_row">
                <PasswordInput
                    bind:isValid={passwordIsValid}
                    placeholder="myPassword"
                    inputID="client_password"
                    inputName="client_password"
                    inputLabel={true}
                    bind:value={passwordInputValue}
                    required={true}
                    passwordInputErrorMessage="password required"
                >
                    password:
                </PasswordInput>
            </div>
            <div class="buttons_container">
                <SubmitButton 
                    disable={false}
                >
                    login
                </SubmitButton>
            </div>
        </form>
        {#if (pending)}
            <PendingFlashMessage >
                please wait while we validate your credentials
            </PendingFlashMessage>
        {:else if (responseItem.error)}
            <ErrorFlashMessage >
                {responseItem.error}
            </ErrorFlashMessage>
        {:else if (responseItem.success)}
            <SuccessFlashMessage>
                {responseItem.success}
            </SuccessFlashMessage>
        {/if}
        <div class="login_helpers_container">
            <div class="login_helpers_column">
                <h4 class="login_helper_prompt">
                    don't have an account?
                </h4>
                <a href="/create-a-client-account">
                    <ActionButtonSecondary>
                        create a free account
                    </ActionButtonSecondary>
                </a>
            </div>
            <div class="login_helpers_column">
                <h4 class="login_helper_prompt">
                    forgot your password?
                </h4>
                <a href="/reset-client-password">
                    <ActionButtonSecondary>
                        reset password
                    </ActionButtonSecondary>
                </a>
            </div>
        </div>
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
    <section>
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
    </section>
</div>

<style>

    .intro_banner {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: #443F3B;
    }

    .banner_image {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        object-fit: cover;
        object-position: top;
        display: flex;
        will-change: transform;
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
        background: rgb(244,254,242, 0.5);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
        backdrop-filter: blur(10px);
        padding: 0.5rem 1rem;
        max-width: 40rem;
        width: auto;
        text-align: left;
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

    .input_row {
        width: 100%;
        max-width: 28rem;
    }

    .login_helpers_container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
        width: 100%;
    }

    .login_helpers_column {
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
    }

    .login_helper_prompt {
        font-size: 1.175rem;
        text-align: center;
        width: 100%;
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
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .second_paragraph_section > h2 {
        width: 100%;
        max-width: 40rem;
        font-size: 2rem;
        padding: 5rem 1rem;
    }

    @media screen and (max-width: 1440px) {

        .saguaro_cactus {
            padding-top: 4rem;
        }

        .why_choose_us_paragraphs {
            gap: 0.75rem;
        }

        .why_choose_us_paragraphs {
            grid-template-columns: auto auto auto;
        }

        .second_paragraph_section > h2 {
            font-size: 1.75rem;
        }

        .login_heading {
            font-size: 1.35rem;
        }

    }

    @media screen and (max-width: 1080px) {

        .login_helpers_column {
            width: 100%;
        }

        .login_heading {
            font-size: 1.25rem;
        }

        .intro_paragraph {
            padding: 0.375rem 0.75rem;
        }

        .saguaro_cactus {
            padding-top: 8rem;
        }

        .why_choose_us_paragraphs {
            grid-template-columns: auto auto;
        }

        .second_paragraph_section > h2 {
            font-size: 1.5rem;
        }
    }

    @media screen and (max-width: 720px) {

        .saguaro_cactus {
            padding-top: 1rem;
            margin-left: 50%;
        }

        .intro_paragraph {
            padding: 0.25rem 0.5rem ;
            max-width: 100%;
        }

        .login_helpers_container {
            flex-direction: column;
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

        .second_paragraph_section > h2 {
            font-size: 1.25rem;
        }

    }
    
</style>