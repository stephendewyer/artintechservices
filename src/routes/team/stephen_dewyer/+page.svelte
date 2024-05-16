<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import StephenDewyer from "$lib/images/team/stephen_garrett_dewyer/stephen_dewyer_10_cropped_square.jpg";
    import ExternalLinkButton from "$lib/components/buttons/ExternalLinkButton.svelte";
    import EmailButton from "$lib/components/buttons/EmailButton.svelte";

</script>
<svelte:head>
    <title>Art in Tech Services - stephen garrett dewyer</title>
    <meta name="description" content="stephen garrett dewyer" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <div class="profile_container">
        <h1>
            stephen dewyer
        </h1>
        <h2>
            Founding Director, Full-stack Web Developer and UX Designer
        </h2>
        <div class="profile">
            <div class="left_column">
                <img src={StephenDewyer} alt="stephen dewyer profile" />
                <h3>
                    biography
                </h3>
                <p class="column_section">
                    stephen runs and directs Art in Tech Services, which he launched in the spring of 2021. 
                    He is an artist, UX designer, software web developer and Founder, UX Designer and Full-stack Web Developer of a non-profit organization called Public Arts Commission.  
                    From 2013-2017, stephen led an award-winning journal of art and culture(s) in Detroit, Michigan called ∞ mile (Infinite Mile LLC).<br /><br />
                    In his solo work, stephen makes environmentally-responsive installations as a part of performances that use digital technology.
                </p>
                <h3>
                    education
                </h3>
                <p class="column_section">
                    2009-2011, Master of Fine Arts (MFA) in Sculpture<br />
                    Yale University School of Art<br />
                    New Haven, Connecticut<br /><br />

                    2005-2008, Bachelor of Fine Arts (BFA) cum laude in Art History, Theory & Criticism<br />
                    Maryland Institute College of Art (MICA)<br />
                    Baltimore, Maryland
                </p>
            </div>
            <div class="right_column">
                <h3>
                    skills
                </h3>
                <table class="column_section">
                    <colgroup>
                        <col style="width: 25%;">
                        <col style="width: 75%;">
                    </colgroup>
                    <tr>
                        <td>
                            programming languages
                        </td>
                        <td>
                            JavaScript, TypeScript, C++, PHP, Python
                        </td>
                    </tr>
                    <tr>
                        <td>
                            artificial intelligence
                        </td>
                        <td>
                            data preprocessing, regression, classification, clustering, association rule learning, reinforcement learning, natural language processing, deep learning including artificial intelligence neural networks and convolutional neural networks, dimensionality reduction, model selection and boosting including XGBoost
                        </td>
                    </tr>
                    <tr>
                        <td>
                            stylesheet languages
                        </td>
                        <td>
                            CSS 3
                        </td>
                    </tr>
                    <tr>
                        <td>
                            markup languages
                        </td>
                        <td>
                            HTML 5
                        </td>
                    </tr>
                    <tr>
                        <td>
                            javaScript compilers, frameworks and libraries
                        </td>
                        <td>
                            SvelteKit, Svelte, Next.js, React, Vue.js, Express, Handlebars
                        </td>
                    </tr>
                    <tr>
                        <td>
                            server environments
                        </td>
                        <td>
                            Node
                        </td>
                    </tr>
                    <tr>
                        <td>
                            database management systems
                        </td>
                        <td>
                            PostgreSQL, MySQL, MongoDB
                        </td>
                    </tr>
                    <tr>
                        <td>
                            web accessibility standards
                        </td>
                        <td>
                            WCAG 2.1
                        </td>
                    </tr>
                    <tr>
                        <td>
                            user experience design
                        </td>
                        <td>
                            user interface design, user research, wire framing, prototyping, information architecture, user interviews, creating user flows, 5 stage design thinking, responsive design, content strategy, copy writing and editing
                        </td>
                    </tr>
                    <tr>
                        <td>
                            data visalization
                        </td>
                        <td>
                            D3.js
                        </td>
                    </tr>
                    <tr>
                        <td>
                            geocoding
                        </td>
                        <td>
                            TomTom, Google Maps
                        </td>
                    </tr>
                    <tr>
                        <td>
                            art direction
                        </td>
                        <td>
                            photography, videography, visual design, brand identity design, animation
                        </td>
                    </tr>
                </table>
            </div>

        </div>
        <h3>
            contact
        </h3>
        <a href="mailto:sdewyer@artintechservices.com">
            <EmailButton>
                    sdewyer@artintechservices.com
            </EmailButton>
        </a>
        <h3>
            websites
        </h3>
        <a 
            href="https://stephendewyerwebwork.com" 
            target="_blank" 
        >
            <ExternalLinkButton>
                https://stephendewyerwebwork.com
            </ExternalLinkButton>
        </a>
        <a 
            href="https://stephengdewyer.info"
            target="_blank"
        >
            <ExternalLinkButton>
                https://stephengdewyer.info
            </ExternalLinkButton>
        </a>
    </div>
</div>
<style>

    p {
        margin: 0;
    }

    .profile_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 4rem;
        padding: 0 1rem 0 1rem;
    }

    .profile {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        max-width: 80rem;
        width: 100%;
    }

    .left_column {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        gap: 1rem;
    }

    .right_column {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        gap: 1rem;
    }

    .column_section {
        width: 100%;
    }

    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
    }

    table > tr {
        height: auto;
        padding: 0;
    }

    table > tr > td {
        font-size: 1.25rem;
        padding: 1rem;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    table tr:nth-child(odd) {
        background-color: #CBC6C2;
    }

    table td:nth-child(odd) {
        font-weight: bold;
    }

    @media screen and (max-width: 1440px) {
        table > tr > td {
            font-size: 1.175rem;
            padding: 1rem;
        }
    }

    @media screen and (max-width: 1080px) {
        table > tr > td {
            font-size: 1rem;
            padding: 0.5rem;
        }
    }

    @media screen and (max-width: 720px) {
        .profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .left_column {
            width: 100%;
            gap: 1rem;
        }

        .right_column {
            width: 100%;
            gap: 1rem;
        }
    }
</style>