<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import AboutBanner from "$lib/images/about/about_banner/about_banner.jpg";

</script>
<svelte:head>
    <title>Art in Tech Services - story</title>
    <meta name="description" content="story" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="story_page">
    <div class="story_banner_container">
        <img class="story_banner" src={AboutBanner} alt="seed filled with fluffy clouds in desert" />
        <h1 class="story_headline">
            developing imaginative software solutions to human problems using state-of-the-art technology
        </h1>
    </div>
    <div class="story_section">
        <h2>story</h2>
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
                        Art in Tech Services launches to develop innovative solftware solutions using art and state-of-the-art technology. 
                    </td>
                </tr>
                <tr>
                    <td class="table_paragraph">
                        2022
                    </td>
                    <td class="table_paragraph">
                        Completed first client project.
                    </td>
                </tr>
                <tr>
                    <td class="table_paragraph">
                        2022
                    </td>
                    <td class="table_paragraph">
                        Begin work on a client portal to streamline client projects and collaboration.
                    </td>
                </tr>
                <tr>
                    <td class="table_paragraph">
                        2024
                    </td>
                    <td class="table_paragraph">
                        Begin researching and developing AI solutions with the AI boom.
                    </td>
                </tr>
                <tr>
                    <td class="table_paragraph">
                        2025
                    </td>
                    <td class="table_paragraph">
                        Begin work on original software called Moveable Farm, an app to buy farm goods directly from farmers that will use AI tools to help farmers and shoppers.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<style>

    .story_page {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .story_banner_container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .story_banner {
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

    .story_section {
        width: 100%;
        max-width: 60rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
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

    .left_column {
        width: 25%;
    }

    .right_column {
        width: 75%;
    }

    @media screen and (max-width: 1440px) {

        .story_headline {
            width: auto;
            margin: 1rem;
        }

        .table_paragraph {
            font-size: 1.4rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .table_paragraph {
            font-size: 1.3rem;
        }
    }

    @media screen and (max-width: 720px) {

        table {
            padding: 0 1rem;
        }

        .table_paragraph {
            font-size: 1.15rem;
        }

    }
</style>