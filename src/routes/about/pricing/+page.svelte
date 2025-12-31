<script lang="ts">
    import { page } from "$app/stores";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import PricingCard from "$lib/components/cards/PricingCard.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    const prices: Price[] = [
        {
            title: "websites",
            range: "$3,000 - $7,000",
            header: "Typical projects include:",
            details: [
                "custom design",
                "5-10 pages",
                "mobile responsiveness",
                "basic CMS setup",
                "accessibility best practices"
            ]
        },
        {
            title: "custom software and web applications",
            range: "$8,000 - $25,000+",
            header: "Pricing depends on:",
            details: [
                "scope and complexity",
                "integrations",
                "user roles and permissions",
                "data and API requirements"
            ]
        },
        {
            title: "UX and design engagements",
            range: "$2,000 - $6,0000",
            header: "Includes:",
            details: [
                "research and discovery",
                "wireframes and design concepts",
                "usability and accessibility review"
            ]
        },
        {
            title: "e-commerce and fundraising platforms",
            range: "$5,000 - $15,000",
            header: "Includes:",
            details: [
                "shop or donation setup",
                "payment processing",
                "product or campaign configuration",
                "custom design"
            ]
        },
        {
            title: "ongoing support",
            range: "60 - $120 per hour",
            header: "Or monthly retainers starting at $500 per month.",
            details: []
        }
    ];
</script>
<svelte:head>
    <title>Art in Tech Services - pricing</title>
    <meta name="description" content="pricing" />
    <meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <div class="headings">
        <h1>
        pricing guidance
        </h1>
        <h2>
            Every project is unique, but the ranges below help set expectations.
        </h2>
    </div>
    <div class="prices">
        {#each prices as price}
            <PricingCard price={price} />
        {/each}
    </div>
    <div class="start_a_project">
        <h3>
            Want to start a project?
        </h3>
        <a href="/how-to-work-with-us/request-to-start-a-project">
            <ActionButtonSecondary>
                request to start a project
            </ActionButtonSecondary>
        </a>
    </div>
</div>
<style>

    .headings {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        padding: 0 1rem;
    }
    .prices {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        padding: 1rem;
        gap: 1rem;
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
    }

    .start_a_project {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        align-items: center;
    }

    @media screen and (max-width: 720) {
        .prices {
            flex-direction: column;
            width: 100%;
        }
    }


</style>