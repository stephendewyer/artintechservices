<script lang="ts">
    import videojs from "video.js";
    import "video.js/dist/video-js.min.css";
    import type Player from "video.js/dist/types/player";
    import { onDestroy, onMount } from "svelte";
    import AboutVideo from "$lib/videos/expertise_video_web.mp4";
    import AboutVideoPoster from "$lib/videos/expertise_video_poster_video.jpg";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import USMap from "$lib/images/maps/Tucson,_AZ.svg"
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import ContextSamplesSlider from "$lib/components/sliders/SliderContext.svelte";
    import AboutBanner from "$lib/images/about_banner/about_banner.jpg";

    let player: Player;

    onMount(() => {
        player = videojs("player", {fluid: true});
    });

    onDestroy(() => {
        if (player) {
            player.dispose();
        };
    });

    const values: string[] = [
        "source locally",
        "overcome obstacles",
        "operate with integrity",
        "continually learn by investing in research and development of products and staff",
        "effectively communicate",
        "demonstrate excellence",
        "implement fairness",
        "design for humans"
    ];

</script>
<svelte:head>
    <title>Art in Tech Services - story</title>
    <meta name="description" content="story" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="about_page">
    <div class="about_banner_container">
        <img class="about_banner" src={AboutBanner} alt="seed filled with fluffy clouds in desert" />
        <h1 class="story_headline">
            custom and original software that improves human experiences by developing imaginative solutions to human problems using state-of-the-art technology
        </h1>
    </div>
    <div class="story_section">
        <h2>history</h2>
        <div class="video_container">
            <video 
                class="video-js"
                controls 
                id="player"
                muted={true}
                autoplay={true}
                poster={AboutVideoPoster}
                loop={true}
                playsinline={true}
            >
                <track kind="captions">
                <source src={AboutVideo} type="video/mp4"/>
            </video>
        </div>
        <table>
            <colgroup>
                <col class="left_column">
                <col class="right_column">
            </colgroup>
            <tbody>
                <tr>
                    <td class="table_paragraph">
                        2021
                    </td>
                    <td class="table_paragraph">
                        Art in Tech Services Inc. launches
                    </td>
                </tr>
                <tr>
                    <td class="table_paragraph">
                        2024
                    </td>
                    <td class="table_paragraph">
                        begin research and development in AI applications
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="story_sections">
        <div class="story_section_02">
            <h2>context</h2>
            <div class="story_image_and_paragraph">
                <div class="paragraph_container">
                    Art expands the imagination of human possibility.  Without art, there would be no technological innovation.  Unfortunately, too often the art that gave vision to technological innovation is ignored.  As a result, we often get technology that is poorly designed for human use.
                </div>
                <div class="image_container">
                    <h3 class="examples_context_heading">examples of art envisioning technological advancements</h3>
                    <ContextSamplesSlider />
                </div>
            </div>
        </div>
        <div class="story_section">
            <h2>vision</h2>
            <p class="paragraph">
                Art has always envisioned groundbreaking technological discoveries. By combining world-class artistic vision and digital technology expertise, Art in Tech Services will create groundbreaking digital products.
            </p>
        </div>
        <div class="story_section">
            <h2>mission</h2>
            <p class="paragraph">
                Art in Tech Services helps organizations better serve communities by developing imaginative software solutions to human problems using state-of-the-art technology.
            </p>
        </div>
        <div class="story_section">
            <h2>who we serve</h2>
            <p class="paragraph">
                We make custom software for clients who want to better serve their communities.  We make original software to better serve commmunities.
            </p>
            
        </div>
        <div class="story_section_02">
            <h2>
                location
            </h2>
            <div class="story_image_and_paragraph">
                <div class="image_container">
                    <img src={USMap} alt="map of U.S. showing Art in Tech Services headquarters location" />
                </div>
                <p class="paragraph_container">
                    Art in Tech Services works across the United States and is based in Tucson, Arizona.
                </p>    
            </div>
        </div>
        <div class="story_section">
            <h2>
                people
            </h2>
            <p class="paragraph">
                Our staff are some of the best in the fields of art and digital technology.
            </p>
            <a href="/about/team">
                <ActionButtonSecondary >
                    our staff
                </ActionButtonSecondary>
            </a>            
        </div>
        <div class="story_section">
            <h2>
                how we work
            </h2>
            <p class="paragraph">
                Our process has been tried and tested to produce the best results.
            </p>
            <a href="/about/process">
                <ActionButtonSecondary >
                    our process
                </ActionButtonSecondary>
            </a>       
        </div>
        <div class="story_section">
            <h2>
                values
            </h2>
            <p class="paragraph">
                Values that guide our operations and define our business:
            </p>
            <ul class="values">
                {#each values as value, index}
                    <li>
                        {value}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="story_section">
            <h2>
                organization type
            </h2>
            <p class="paragraph">
                Art in Tech Services is a C-Corporation.
            </p>
        </div>
        <div class="story_section">
            <h2>
                shareholders
            </h2>
            <p class="paragraph">
                Art in Tech Services is currently a privately-held corporation.
            </p>
        </div>
    </div>
</div>
<style>

    .about_page {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .about_banner_container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .about_banner {
        position: relative;
        object-fit: cover;
        width: 100%;
        height: 100%
    }

    .story_headline {
        position: absolute;
        padding: 1rem;
        width: 100%;
        max-width: 40rem;
        background: rgb(244,254,242, 0.5);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
        backdrop-filter: blur(10px);
    }

    .video_container {
        max-width: 60rem;
        width: 100%;
        margin: 0 auto;
    }

    .story_sections {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1rem 4rem 1rem;
    }

    .story_section {
        max-width: 40rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .story_section_02 {
        max-width: 120rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .story_image_and_paragraph {
        display: flex;
        flex-direction: row;
        align-items: center;
        max-width: 1920px;
        gap: 1rem;
    }

    .examples_context_heading {
        text-align: center;
    }

    .paragraph_container {
        width: 50%;
        font-size: 2rem;
    }

    .image_container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 50%;
    }

    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
    }

    table tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    .table_paragraph {
        font-size: 2rem;
    }

    .paragraph {
        margin: 0;
        padding: 0;
        width: 100%;
        font-size: 2rem;
    }

    .left_column {
        width: 25%;
    }

    .right_column {
        width: 75%;
    }

    .values {
        display: flex;
        flex-direction: column;
    }

    .values > li {
        width: auto;
    }

    @media screen and (max-width: 1440px) {

        .story_headline {
            width: auto;
            margin: 1rem;
        }

        .paragraph_container {
            font-size: 1.4rem;
        }

        .paragraph {
            font-size: 1.4rem;
        }

        .table_paragraph {
            font-size: 1.4rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .paragraph_container {
            font-size: 1.3rem;
        }

        .paragraph {
            font-size: 1.3rem;
        }

        .table_paragraph {
            font-size: 1.3rem;
        }
    }

    @media screen and (max-width: 720px) {

        .story_image_and_paragraph {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .image_container {
            width: 100%;
        }

        .paragraph_container {
            width: 100%;
            font-size: 1.15rem;
        }

        .paragraph {
            font-size: 1.15rem;
        }

        table {
            padding: 0 1rem;
        }

        .table_paragraph {
            font-size: 1.15rem;
        }

    }
</style>