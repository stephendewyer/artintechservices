<script lang="ts">
    import SuzanneContiQuiltsCaseStudy from "$lib/images/case_studies/Suzanne_Conti_Quilts_desktop_and_mobile.jpg";
    import JoyfoodlyCaseStudy from "$lib/images/case_studies/Joyfoodly_desktop_and_mobile.jpg";
    import ExternalLinkIcon from "$lib/images/icons/external_link_icon.svg?raw";

    interface CaseStudy {
        image: string;
        alt: string;
        url: string;
        label: string;
        date: string;
        paragraph: string;
    };

    const caseStudies: CaseStudy[] = [
        {
            image: SuzanneContiQuiltsCaseStudy,
            alt: "Suzanne Conti Quilts desktop and mobile website",
            url: "https://suzannecontiquilts.vercel.app/",
            label: "Suzanne Conti Quilts website",
            date: "2023 - 2024",
            paragraph: "A website of quilts relating to Suzanne Conti, a quilter with decades of experience producing quilts for family and friends."
        },
        {
            image: JoyfoodlyCaseStudy,
            alt: "Joyfoodly desktop and mobile website",
            url: "https://joyfoodly.vercel.app/",
            label: "Joyfoodly website",
            date: "2022",
            paragraph: "A website for a culinary education service that helps families learn to eat more fruits and vegetables."
        }
    ];

</script>

<svelte:head>
    <title>Art in Tech Services - case studies</title>
    <meta name="description" content="case studies" />
    <meta property="og:image" content={SuzanneContiQuiltsCaseStudy} />
    <meta property="og:url" content="https://artintechservices.vercel.app/case-studies" />
    <meta name="robots" content="index, follow" />
</svelte:head>

<div class="page">
    <h1>
        case studies
    </h1>
    <div class="case_studies">
        {#each caseStudies as caseStudy, index}
            <div class="case_study">
                <img src={caseStudy.image} alt={caseStudy.alt} />
                <a 
                    class="case_study_heading_link"
                    href={caseStudy.url}
                >
                    <h2 class="case_study_heading">
                        {caseStudy.label}
                    </h2>
                    <div class="external_link_icon">
                        {@html ExternalLinkIcon}
                    </div>
                </a>
                <h3 class="year">
                    {caseStudy.date}
                </h3>
                <p class="paragraph">
                    {caseStudy.paragraph}
                </p>
            </div>
        {/each}
    </div>
</div>

<style>

    .case_studies {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem 0;
        width: 100%;
        max-width: 2000px;
    }

    .case_study {
        display: flex;
        flex-direction: column;
    }

    .case_study_heading_link {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        margin: 0 auto;
    }

    .case_study_heading_link:hover > .case_study_heading {
        color: #d79679;
    }

    .case_study_heading_link:hover > .external_link_icon {
        fill: #d79679;
    }

    .case_study_heading {
        color: #838b6a;
        transition: color 0.3s linear;
    }

    .external_link_icon {
        width: 2.5rem;
        fill: #838b6a;
        transition: fill 0.3s linear;
    }

    .year {
        margin: 0 auto;
        padding: 0 0 1rem 0;
    }

    .paragraph {
        margin: 0 auto;
        width: 100%;
        max-width: 40rem;
        padding: 0 1rem;
    }

    @media screen and (max-width: 1440px) {

        .case_study_heading_link {
            gap: 0.9rem;
            padding: 0.90rem;
        }
        
        .external_link_icon {
            width: 2rem;
        }

        .year {
            padding: 0 0 0.9rem 0;
        }

        .paragraph {
            padding: 0 0.9rem;
        }

    }

    @media screen and (max-width: 1080px) {
        .case_study_heading_link {
            gap: 0.75rem;
            padding: 0.75rem;
        }
        
        .external_link_icon {
            width: 1.75rem;
        }

        .year {
            padding: 0 0 0.75rem 0;
        }

        .paragraph {
            padding: 0 0.75rem;
        }
    }

    @media screen and (max-width: 720px) {

            .case_studies {
            gap: 2rem;
            padding: 1rem 0;
        }

        .case_study_heading_link {
            gap: 0.5rem;
            padding: 0.5rem;
        }
        
        .external_link_icon {
            width: 1.5rem;
            fill: #838b6a;
            transition: fill 0.3s linear;
        }

        .year {
            padding: 0 0 0.5rem 0;
        }

        .paragraph {
            margin: 0;
            padding: 0 0.5rem;
        }
    }
</style>