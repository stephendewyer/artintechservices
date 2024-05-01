<script lang="ts">
    import Logo from "$lib/images/logo/Art_in_Tech_Services_logo.svg?raw";
    import FooterExternalLinkButton from "$lib/components/buttons/FooterExternalLinkButton.svelte";
    import { page } from "$app/stores";
    import { afterNavigate } from "$app/navigation";
    import NavigationData from "$lib/data/navigation.json";

    export let footerHeight;

    const footerNavTabsLeft: NavTab[] = NavigationData.slice(0, (NavigationData.length/2));

    const footerNavTabsRight: NavTab[] = NavigationData.slice((NavigationData.length/2), NavigationData.length);

    const currentPageHandler = (navTab: NavTab) => {
        if (navTab.content === null) {
            if ($page.url.pathname === navTab.slug) {
                return true;
            } else {
                return false;
            };
        } else if (navTab.content.length > 0) {
            let tabActive: boolean = false;
            navTab.content.map((tab) => {
                if (tab.slug === $page.url.pathname) {
                    tabActive = true;
                };
            });
            if (tabActive) {
                return true;
            } else {
                return false;
            };
        };
    };

    let tabIsActive: NavTab;

    afterNavigate(() => {
        footerNavTabsLeft.forEach((mainNavTab) =>  {
            if (currentPageHandler(mainNavTab)) {
                tabIsActive = mainNavTab;
            };
        });
        footerNavTabsRight.forEach((mainNavTab) =>  {
            if (currentPageHandler(mainNavTab)) {
                tabIsActive = mainNavTab;
            };
        });
    });

    const today = new Date();
    const year = today.getFullYear();

</script>

<footer bind:clientHeight={footerHeight}>
    <ul class="footer_nav_top_mobile">
        <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
            <a href="/" class="logo">
                {@html Logo}
            </a>
        </li>
        <div class="nav_columns_mobile">
            <ul class="nav_column_mobile">
                <div class="nav_column_mobile_inner">
                    {#each footerNavTabsLeft as footerNavTab, index}
                        {#if footerNavTab.content === null}
                            <div class="nav_section_mobile">
                                <li 
                                    aria-current={tabIsActive?.label === footerNavTab.label ? "page" : undefined}
                                >
                                    <a 
                                        href={footerNavTab.slug}
                                        class="footer_nav_heading"
                                    >
                                        {footerNavTab.label}
                                    </a>
                                </li>   
                            </div>
                        {:else}
                            <div class="nav_section_mobile">
                                <li aria-current={tabIsActive?.label === footerNavTab.label ? "page" : undefined}>
                                    <a 
                                        href={footerNavTab.slug} 
                                        class="footer_nav_heading"
                                    >
                                        {footerNavTab.label}
                                    </a>
                                </li>
                                {#each footerNavTab.content as footerNavTabSub, index}
                                    <li aria-current={$page.url.pathname === footerNavTabSub.slug ? "page" : undefined}>
                                        <a 
                                            href={footerNavTabSub.slug} 
                                            class="nav_link"
                                        >
                                            {footerNavTabSub.label}
                                        </a>
                                    </li>
                                {/each}
                            </div>
                        {/if}
                    {/each}
                </div>
            </ul>
            <ul class="nav_column_mobile">
                <div class="nav_column_mobile_inner">
                    {#each footerNavTabsRight as footerNavTab, index}
                        {#if footerNavTab.content === null}
                            <div class="nav_section_mobile">
                                <li 
                                    aria-current={tabIsActive?.label === footerNavTab.label ? "page" : undefined}
                                >
                                    <a 
                                        href={footerNavTab.slug}
                                        class="footer_nav_heading"
                                    >
                                        {footerNavTab.label}
                                    </a>
                                </li>  
                            </div>
                        {:else}
                            <div class="nav_section_mobile">
                                <li aria-current={tabIsActive?.label === footerNavTab.label ? "page" : undefined}>
                                    <a 
                                        href={footerNavTab.slug} 
                                        class="footer_nav_heading"
                                    >
                                        {footerNavTab.label}
                                    </a>
                                </li>
                                {#each footerNavTab.content as footerNavTabSub, index}
                                    <li aria-current={$page.url.pathname === footerNavTabSub.slug ? "page" : undefined}>
                                        <a 
                                            href={footerNavTabSub.slug} 
                                            class="nav_link"
                                        >
                                            {footerNavTabSub.label}
                                        </a>
                                    </li>
                                {/each}
                            </div>
                        {/if}
                    {/each}
                </div>
            </ul>
        </div>
    </ul>
    <ul class="footer_nav_top_desktop">
        {#each footerNavTabsLeft as footerNavTab, index}
            {#if footerNavTab.content === null}
                <li 
                    aria-current={tabIsActive?.label === footerNavTab.label ? "page" : undefined}
                    class="nav_column"
                >
                    <a 
                        href={footerNavTab.slug}
                        class="footer_nav_heading"
                    >
                        {footerNavTab.label}
                    </a>
                </li>   
            {:else}
                <li>
                    <ul class="nav_column">
                        <li aria-current={tabIsActive?.label === footerNavTab.label ? "page" : undefined}>
                            <a 
                                href={footerNavTab.slug} 
                                class="footer_nav_heading"
                            >
                                {footerNavTab.label}
                            </a>
                        </li>
                        {#each footerNavTab.content as footerNavTabSub, index}
                            <li aria-current={$page.url.pathname === footerNavTabSub.slug ? "page" : undefined}>
                                <a 
                                    href={footerNavTabSub.slug} 
                                    class="nav_link"
                                >
                                    {footerNavTabSub.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </li>
            {/if}
        {/each}
        <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
            <a href="/" class="logo">
                {@html Logo}
            </a>
        </li>
        {#each footerNavTabsRight as footerNavTab, index}
            {#if footerNavTab.content === null}
                <li 
                    aria-current={tabIsActive?.label === footerNavTab.label ? "page" : undefined}
                    class="nav_column"
                >
                    <a 
                        href={footerNavTab.slug}
                        class="footer_nav_heading"
                    >
                        {footerNavTab.label}
                    </a>
                </li>   
            {:else}
                <li>
                    <ul class="nav_column">
                        <li aria-current={tabIsActive?.label === footerNavTab.label ? "page" : undefined}>
                            <a 
                                href={footerNavTab.slug} 
                                class="footer_nav_heading"
                            >
                                {footerNavTab.label}
                            </a> 
                        </li>
                        {#each footerNavTab.content as footerNavTabSub, index}
                            <li aria-current={$page.url.pathname === footerNavTabSub.slug ? "page" : undefined}>
                                <a 
                                    href={footerNavTabSub.slug} 
                                    class="nav_link"
                                >
                                    {footerNavTabSub.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </li>
            {/if}
        {/each}
    </ul>
    <div class="social_media_links">
        <a 
            href="https://twitter.com/artintechservi3" 
            aria-label="link to Art in Tech Services Twitter account"
            target="_blank"
        >
            <FooterExternalLinkButton>
                Twitter
            </FooterExternalLinkButton>
        </a>
        <a
            href="https://www.instagram.com/artintechservices/"
            aria-label="link to Art in Tech Services Instagram account"
            target="_blank" 
        >
            <FooterExternalLinkButton>
                Instagram
            </FooterExternalLinkButton>
        </a>
        <a
            href="https://www.linkedin.com/company/72628711/"
            aria-label="link to Art in Tech Services LinkedIn account"
            target="_blank"
        >
            <FooterExternalLinkButton>
                LinkedIn
            </FooterExternalLinkButton>
        </a>
    </div>
    <p class="footer_info">
        Art in Tech Services Inc © {year}.  All rights reserved.
    </p>
</footer>

<style>
    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 1rem 2rem;
        margin: 2rem 0 0 0;
        color: #FAE6D8;
        background-color: #171F29;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    .footer_nav_top_mobile {
        display: none;
    }

    .footer_nav_top_desktop > li {
        width: 10rem;
    }

    .footer_nav_top_desktop {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        gap: 2rem;
    }

    .footer_nav_top_desktop > li {
        width: 10rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li[aria-current="page"] > a {
        color: #CCD9D3;
        fill: #CCD9D3;
        will-change: color, fill;
        transition: fill 0.2s ease-in-out, color 0.2s ease-in-out;
	}

    .nav_column {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .logo {
        min-width: 10rem;
        fill: #FAE6D8;
        will-change: fill;
        transition: fill 0.2s ease-in-out;
    }

    .logo:hover {
        fill: #CFF5F8;
    }

    .footer_nav_heading {
        color: #FAE6D8;
        font-size: 1.25rem;
        margin: 0 0 0.5rem 0;
        font-weight: bold;
        letter-spacing: 0.05rem;
        will-change: color;
        transition: color 0.2s ease-in-out;
        cursor: pointer;
    }

    .footer_nav_heading:hover {
        color: #CFF5F8;
    }

    .nav_link {
        color: #FAE6D8;
        will-change: color;
        transition: color 0.2s ease-in-out;
        font-weight: normal;
        letter-spacing: 0.05rem;
        font-size: 1.2rem;
    }

    .nav_link:hover {
        color: #CFF5F8;
        will-change: color;
        transition: color 0.2s ease-in-out;
    }

    .social_media_links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
        margin: 0 auto;
    }

    .footer_info {
        width: 100%;
        text-align: center;
        margin: 0;
    }

    @media screen and (max-width: 1440px) {

        footer {
            gap: 1.75rem;
        }

        .footer_nav_top_desktop {
            gap: 1.75rem;
        }

        .footer_nav_top_desktop > li {
            width: 8rem;
        }

        .logo {
            min-width: 8rem;
        }

        .nav_column {
            gap: 0.75rem;
        }

        .footer_nav_heading {
            font-size: 1.175rem;
        }

        .nav_link {
            font-size: 1.1rem;
        }

    }


    @media screen and (max-width: 1080px) {

        .footer_nav_top_desktop {
            display: none;
        }

        .footer_nav_top_mobile {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .logo {
            width: 6rem;
            min-width: 6rem;
        }

        .nav_columns_mobile {
            display: flex;
            flex-direction: row;
            gap: 1rem;
        }

        .nav_column_mobile {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }

        .nav_column_mobile_inner {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .nav_section_mobile {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .footer_nav_top_mobile > li {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        footer {
            gap: 1.5rem;
        }

        .footer_nav_heading {
            font-size: 1.1rem;
        }

        .nav_link {
            font-size: 1rem;
        }

        .footer_nav_top_desktop > li {
            width: 10rem;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

    }

    @media screen and (max-width: 750px) {

        .logo {
            width: 5rem;
        }

        footer {
            padding: 1rem;
            margin: 1rem 0 0 0;
        }

        .nav_column {
            display: flex;
            flex-direction: column;
            gap: 0;
            width: auto;
            white-space: normal;
        }
        
    }

</style>