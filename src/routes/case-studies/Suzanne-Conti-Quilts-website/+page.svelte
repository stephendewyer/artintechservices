<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import { page } from "$app/stores";
    import SuzanneContiQuiltsWebsiteBanner from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/Suzanne_Conti_Quilts_desktop_and_mobile.jpg";
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import { onDestroy, onMount } from "svelte";
    import type Player from "video.js/dist/types/player";
    import SuzanneContiQuiltsDemoVideo from "$lib/videos/Suzanne_Conti_Quilts_website_video_web.mp4";
    import SuzanneContiQuiltsDemoPoster from "$lib/videos/Suzanne_Conti_Quilts_website.jpg"
    import ExternalLinkButton from "$lib/components/buttons/ExternalLinkButton.svelte";
    import PreviousButton from "$lib/components/buttons/PreviousButton.svelte";
    import NextButton from "$lib/components/buttons/NextButton.svelte";
    import KatherineGuzinskiQuilt from "$lib/images/case_studies/Suzanne_Conti_Quilts_website/Katherine_Marie_Jurkiewicz_Quilt_01_01.jpg";

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
    <title>Art in Tech Services - Suzanne Conti Quilts website</title>
    <meta name="description" content="Suzanne Conti Quilts website" />
    <meta property="og:image" content={SuzanneContiQuiltsWebsiteBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>
        Suzanne Conti Quilts website
    </h1>
    <div class="case_study_banner">
        <video 
            class="video-js"
            controls 
            id="player"
            muted={true}
            autoplay={true}
            poster={SuzanneContiQuiltsDemoPoster}
            loop={true}
            playsinline={true}
        >
            <track kind="captions">
            <source src={SuzanneContiQuiltsDemoVideo} type="video/mp4"/>
        </video>
    </div>
    <div class="case_study_about">
        <div class="tagline_and_dates">
            <p class="tagline">
                a website featuring an interactive collection of quilts by Suzanne Conti and her ancestors
            </p>
            <p class="dates">
                2023 - 2024
            </p>
        </div>
        <table class="case_study_table">
            <colgroup>
                <col class="left_table_column">
                <col class="right_table_column">
            </colgroup>
            <tbody>
                <tr>
                    <td>
                        client:
                    </td>
                    <td>
                        Suzanne Conti Quilts
                    </td>
                </tr>
                <tr>
                    <td>
                        services rendered:
                    </td>
                    <td>
                        user experience design, photography, brand identity design, visual design, software development
                    </td>
                </tr>
                <tr>
                    <td>
                        tools used:
                    </td>
                    <td>
                        SvelteKit, Twilio SendGrid, Vercel, Splide, Figma, Canon EOS 70D Digital SLR camera, Adobe Creative Cloud
                    </td>
                </tr>
                <tr>
                    <td>
                        specifications:
                    </td>
                    <td>
                        <ul>
                            <li>
                                search, filter and sort quilts
                            </li>
                            <li>
                                view photos of quilt and quilt details
                            </li>
                            <li>
                                contact form
                            </li>
                            <li>
                                mobile and desktop responsive
                            </li>
                            <li>
                                about page
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <h2 class="impact_heading">impact</h2>
    <div class="impact">
        
        <img src={KatherineGuzinskiQuilt} class="impact_image" alt="quilt by Katherine Guzinski" />
        <p class="impact_paragraphs">
            An easy way to see a quilt’s collection.  Quilts from generations within a family now in one place and publicly viewable.
        </p>
    </div>
    <div class="case_study_external_link">
        <a 
            href="https://suzannecontiquilts.vercel.app/"
            target="_blank"
        >
            <ExternalLinkButton>
                visit Suzanne Conti Quilts website
            </ExternalLinkButton>
        </a>
    </div>
    <div class="case_study_nav_tabs">
        <a href="/case-studies/moveable-farm-web-app" class="next_and_previous_button_link">
            <PreviousButton>
                moveable farm web app
            </PreviousButton>
        </a>
        <a href="/case-studies/Joyfoodly-website" class="next_and_previous_button_link">
            <NextButton>
                Joyfoodly website
            </NextButton>
        </a>
    </div>
</div>

<style>

    h1 { 
        padding: 0 0 1rem 0;
    }

    .case_study_banner {
        width: 100%;
        max-width: 1920px;
        padding: 1rem;
        position: relative;
    }

    .case_study_about {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        width: 100%;
        max-width: 1920px;
        padding: 0 1rem 1rem 1rem;
    }

    .tagline_and_dates {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .tagline {
        font-size: 4rem;
        margin: 0;
    }

    .dates {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
    }

    .case_study_table {
        width: 50%;
    }

    .case_study_table > tbody > tr > td {
        font-size: 1.5rem;
    }

    .left_table_column {
        width: 25%;
    }

    .right_table_column {
        width: 75%;
    }

    .case_study_nav_tabs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        max-width: 1920px;
        padding: 0 1rem 1rem 1rem;
        gap: 1rem;
    }

    .next_and_previous_button_link {
        width: auto;
    }

    .case_study_external_link {
        padding: 0 1rem 2rem 1rem;
    }

    .impact_heading {
        padding: 1rem;
    }

    .impact {
        display: flex;
        flex-direction: row;
        width: 100%;
        max-width: 1920px;
        padding: 0 1rem 1rem 1rem;
        gap: 1rem;
    }

    .impact_image {
        width: 50%;
        height: 40rem;
        object-fit: cover;
    }

    .impact_paragraphs {
        font-size: 4rem;
        margin: 0;
        width: 50%;
    }

    @media screen and (max-width: 1440px) {
        .tagline {
            font-size: 3rem;
        }

        .dates {
            font-size: 1.25rem;
        }

        .case_study_table > tbody > tr > td {
            font-size: 1.25rem;
        }

        .left_table_column {
            width: 30%;
        }

        .right_table_column {
            width: 70%;
        }

        .impact_image {
            height: 32rem;
        }

        .impact_paragraphs {
            font-size: 3rem;
        }

    }

    @media screen and (max-width: 1080px) {
        .tagline {
            font-size: 2.5rem;
        }

        .dates {
            font-size: 1.175rem;
        }

        .case_study_table > tbody > tr > td {
            font-size: 1.175rem;
        }

        .left_table_column {
            width: 35%;
        }

        .right_table_column {
            width: 65%;
        }

        .impact_image {
            width: 50%;
            height: 28rem;
        }

        .impact_paragraphs {
            font-size: 2.5rem;
        }
    }

    @media screen and (max-width: 720px) {

        .case_study_about {
            flex-direction: column;
        }

        .tagline_and_dates {
            width: 100%;
        }

        .case_study_table {
            width: 100%;
        }

        .tagline {
            font-size: 2rem;
        }

        .dates {
            font-size: 1rem;
        }

        .next_and_previous_button_link {
            width: 50%;
        }

        .case_study_table > tbody > tr > td {
            font-size: 1rem;
        }

        .left_table_column {
            width: 35%;
        }

        .right_table_column {
            width: 65%;
        }

        .impact {
            flex-direction: column;
            gap: 0.5rem;
        }

        .impact_image {
            width: 100%;
            height: 24rem;
        }

        .impact_paragraphs {
            width: 100%;
            font-size: 2rem;
        }
    }

</style>