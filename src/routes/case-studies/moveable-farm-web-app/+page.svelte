<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import moveableFarmWebAppBanner from "$lib/images/case_studies/moveable_farm_web_app/moveable_farm_banner.jpg";
    import { page } from "$app/stores";
    import NextButton from "$lib/components/buttons/NextButton.svelte";
    import PreviousButton from "$lib/components/buttons/PreviousButton.svelte";

</script>

<svelte:head>
    <title>Art in Tech Services - moveable farm web app</title>
    <meta name="description" content="moveable farm web app" />
    <meta property="og:image" content={moveableFarmWebAppBanner} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <h1>
        moveable farm web app
    </h1>
    <div class="case_study_banner">
        <img src={moveableFarmWebAppBanner} alt="moveable farm web app banner" />
        <h2 class="forthcoming">
            forthcoming!
        </h2>
    </div>
    <div class="case_study_about">
        <div class="tagline_and_dates">
            <p class="tagline">
                a web application to buy farm goods directly from farmers
            </p>
            <p class="dates">
                2025 (expected launch date)
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
                        moveable farm
                    </td>
                </tr>
                <tr>
                    <td>
                        services rendered:
                    </td>
                    <td>
                        user experience design, photography, brand identity design, visual design, artificial intelligence, software development
                    </td>
                </tr>
                <tr>
                    <td>
                        tools used:
                    </td>
                    <td>
                        SvelteKit, Twilio SendGrid, Vercel, TomTom, Figma, Canon EOS 70D Digital SLR camera, Adobe Creative Cloud
                    </td>
                </tr>
                <tr>
                    <td>
                        specifications:
                    </td>
                    <td>
                        <ul>
                            <li>
                                geolocate local farmers using user's location
                            </li>
                            <li>
                                filter farms based on renewable energy use, sustainable farming practices, fair labor practices, type of farm goods and organic growing practices
                            </li>
                            <li>
                                subscriptions for farmers to list on web app
                            </li>
                            <li>
                                allow users to place orders to buy directly from farms
                            </li>
                            <li>
                                mobile, tablet and desktop
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="case_study_nav_tabs">
        <a href="/case-studies/Joyfoodly-website" class="next_and_previous_button_link">
            <PreviousButton>
                Joyfoodly website
            </PreviousButton>
        </a>
        <a href="/case-studies/Suzanne-Conti-Quilts-website" class="next_and_previous_button_link">
            <NextButton>
                Suzanne Conti Quilts website
            </NextButton>
        </a>
    </div>
</div>

<style>

    .case_study_banner {
        width: 100%;
        max-width: 1920px;
        padding: 1rem;
        position: relative;
    }

    .forthcoming {
        position: absolute;
        top: 0;
        left: 0;
        padding: 1rem;
        background-color: #263132;
        color: #F2F9F2;
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
    }

</style>