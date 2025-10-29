<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import DeskCallBell from "$lib/images/icons/how_to_work_with_us/desk_call_bell.svg?raw";
    import ConsultationTable from "$lib/images/icons/how_to_work_with_us/process_01.svg?raw";
    import ClientPortalVideo from "$lib/videos/Art_in_Tech_Services_client_portal_overview.mp4";
    import ClientPortalVideoPoster from "$lib/videos/Art_in_Tech_Services_client_portal_overview.jpg";
    import { onDestroy, onMount } from "svelte";
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import type Player from "video.js/dist/types/player";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";

    let player: Player;

    onMount(() => {
        player = videojs("player", {fluid: true});
    });

    onDestroy(() => {
        if (player) {
            player.dispose();
        };
    });


</script>

<svelte:head>
    <title>Art in Tech Services - how to work with us</title>
    <meta name="description" content="how to work with us" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1 class="heading">
        how to work with us
    </h1>
    <h2 class="heading">
        we're open and happy to explore new collaborations
    </h2>
    <div class="methods">
        <div class="method_a">
            <div class="method_info">
                <h3>
                    schedule a consultation
                </h3>
                <p>
                    Want help with an existing project or with starting a new project?  The first step we recommend is scheduling a consultation with us.  During your consultation, we will talk with you to understand your problems and how we can help plan your project for success.  Consultations are free and can be done remotely or locally in-person. 
                </p>
                <a href="/how-to-work-with-us/request-a-consultation">
                    <ActionButtonSecondary>
                        request a consultation
                    </ActionButtonSecondary>
                </a>
            </div>
            <div class="method_image">
                {@html ConsultationTable}
            </div>
        </div>
        <div class="method_b">
            <div class="method_video">
                <video 
                    class="video-js"
                    controls 
                    id="player"
                    muted={true}
                    autoplay={true}
                    loop={true}
                    playsinline={true}
                    poster={ClientPortalVideoPoster}
                >
                    <track kind="captions">
                    <source src={ClientPortalVideo} type="video/mp4"/>
                </video>
            </div>
            <div class="method_info">
                <h3>
                    create a free client account
                </h3>
                <p>
                    We recommend creating a free client account after your first consultation.  You can manage all your consultations and projects from one location using our client portal.  Invoices, payments, messages and account details are handled through the client portal to help streamline collaboration.
                </p>
                <a href="/create-a-client-account">
                    <ActionButtonSecondary>
                        create a free client account
                    </ActionButtonSecondary>
                </a>
            </div>
        </div>
        <div class="method_a">
            <div class="method_info">
                <h3>
                    request to start a project
                </h3>
                <p>
                    After a consultation, we recommend requesting to start a project if we are aligned with your project goals.  You can select from a variety of services we offer to include in your project.            
                </p>
                <a href="/how-to-work-with-us/request-to-start-a-project">
                    <ActionButtonSecondary>
                        request to start a project
                    </ActionButtonSecondary>
                </a>
            </div>
            <div class="method_image">
                {@html DeskCallBell}
            </div>
        </div>
    </div>
    
</div>

<style>

    .heading {
        padding: 0 0 1rem 0;
    }

    .methods {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 1920px;
        padding: 0 1rem 2rem 1rem;
    }

    .method_a {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .method_info {
        width: 50%;
        display: flex;
        flex-direction: column;
    }

    .method_image {
        width: 50%;
    }

    .method_video {
        width: 50%;
    }

    .method_b {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    @media screen and (max-width: 720px) {
        .method_a {
            flex-direction: column-reverse;
        }

        .method_b {
            flex-direction: column;
        }

        .method_info {
            width: 100%;
            align-items: center;
        }

        .method_image {
            width: 100%;
        }

        .method_video {
            width: 100%;
        }
    }

</style>