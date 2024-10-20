<script lang="ts">
    import ProfilePhotoDefault from "$lib/images/default/default_profile_photo.jpg";
    import letterIcon from "$lib/images/icons/email_icon.svg?raw";
    import consultationIcon from "$lib/images/icons/consultation_icon.svg?raw";
    import projectIcon from "$lib/images/icons/project.svg?raw";
    import billingIcon from "$lib/images/icons/billing.svg?raw";
    import settingsIcon from "$lib/images/icons/settings_icon.svg?raw";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { ClientProfileImageUpdatedStore } from "$lib/stores/ClientProfileImageUpdatedStore";
    import LoadingSpinner from "../loadingSpinners/LoadingSpinner.svelte";
    import { afterNavigate } from "$app/navigation";

    export let clientEmail: string = "";
    export let clientProfileImageID: number | null = null;
    export let clientProfileImageURL: string = "";
    export let mobileNavPanelFixed: boolean = false;

    let profileImageAltText = "client profile image";

    $: if (!clientProfileImageURL) {
        clientProfileImageURL = ProfilePhotoDefault;
        profileImageAltText = "The Art of Living, 1967, by René Magritte";
    } else {
        clientProfileImageURL = clientProfileImageURL;
    };

    let pendingUploadedImage: boolean = false;

    const getUploadedClientProfileImage = async () => {

        pendingUploadedImage = true;

        try {
            const response = await fetch("/authenticated-client/api/getUploadedClientProfileImage", {
                method: "POST",
                body: JSON.stringify({
                    clientEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const uploadedImage = await response.json();

            if (response.ok) {
                clientProfileImageURL = uploadedImage.client_profile_image_URL ? uploadedImage.client_profile_image_URL : ProfilePhotoDefault;
                clientProfileImageID = uploadedImage.client_profile_image_ID ? uploadedImage.client_profile_image_ID : null;
            } 

        } catch (err) {
            console.log(err);
        };

        pendingUploadedImage = false;

    };

    $: if ($ClientProfileImageUpdatedStore) {
        getUploadedClientProfileImage();
        $ClientProfileImageUpdatedStore = false;
    };

    export let width: number = 0;
    export let height: number = 0;
    export let navPanelTopYPosition: number = 0;
    export let navPanelFixed: boolean = false;
    export let navPanelAbsolute: boolean = false;
    export let navPanelRelative: boolean = false;
    // export let navPanelContainerTopYPosition: number = 0;

    let navPanelElement: HTMLElement;

    onMount(() => {
        navPanelTopYPosition = navPanelElement.getBoundingClientRect().top + window.scrollY;
    });

    const windowResizeHandler = () => {
        navPanelTopYPosition = navPanelElement.getBoundingClientRect().top + window.scrollY;
    };

    const scrollHandler = () => {
        navPanelTopYPosition = navPanelElement.getBoundingClientRect().top + window.scrollY;
    };

    afterNavigate(() => {
        navPanelTopYPosition = navPanelElement.getBoundingClientRect().top + window.scrollY;
    });
    
</script>

<svelte:window on:resize={windowResizeHandler} on:scroll={scrollHandler}/>

<nav 
    id="client_nav_panel"
    class={navPanelFixed || mobileNavPanelFixed ? "client_nav_panel_fixed" : navPanelAbsolute ? "client_nav_panel_absolute" : navPanelRelative ? "client_nav_panel_relative": "client_nav_panel_relative"}
    bind:this={navPanelElement}
    bind:clientWidth={width}
    bind:clientHeight={height}
>
    <ul class="client_nav_panel_tabs">
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-client/client"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-client/client"
                class="client_nav_panel_tab"

            >
                <div class="profile_image_container">
                    {#if (pendingUploadedImage)}
                        <LoadingSpinner />
                    {:else}
                        <img
                            src={clientProfileImageURL} 
                            alt={profileImageAltText}
                            class="profile_image"
                        /> 
                    {/if}         
                </div>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-client/client/messages"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-client/client/messages"
                class="client_nav_panel_tab"
            >
                <div class="nav_icon">
                    {@html letterIcon}
                </div>
                <span class="label">
                    messages
                </span>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-client/client/consultations"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-client/client/consultations"
                class="client_nav_panel_tab"
            >
                <div class="nav_icon">
                    {@html consultationIcon}
                </div>
                <span class="label">
                    consultations
                </span>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-client/client/projects"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-client/client/projects"
                class="client_nav_panel_tab"
            >
                <div class="nav_icon">
                    {@html projectIcon}
                </div>
                <span class="label">
                    projects
                </span>
            </a>
            
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-client/client/invoicing"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-client/client/invoicing"
                class="client_nav_panel_tab"
            >
                <div class="nav_icon">
                    {@html billingIcon}
                </div>
                <span class="label">
                    invoicing
                </span>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-client/client/account"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-client/client/account"
                class="client_nav_panel_tab"
                >
                <div class="nav_icon">
                    {@html settingsIcon}
                </div>
                <span class="label">
                    account
                </span>
            </a>
        </li>
    </ul>
</nav>

<style>

    #client_nav_panel {
        width: 12rem;
        z-index: 1;
    }

    .client_nav_panel_fixed {
        position: fixed;
        top: 0;
    }

    .client_nav_panel_absolute {
        position: absolute;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .client_nav_panel_relative {
        position: relative;
        width: 100%;
    }

    li[aria-current="page"] > .client_nav_panel_tab::after {
        --size: 6px;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom:0;
		border: var(--size) solid transparent;
		border-left: 6px solid #3D3832;
		overflow: visible;

    }

    .client_nav_panel_tabs {
        position: relative;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 0.5rem;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .client_nav_panel_tab {
        position: relative;
        display:  flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        padding-left: 1rem;
        color: #3D3832;
        transition: color 0.3s linear;
    }

    .client_nav_panel_tab:hover {
        color: #475AA7;
    }

    .client_nav_panel_tab:hover > .nav_icon {
        fill: #475AA7;
    }

    .profile_image_container {
        width: 100%;
        height: 12rem;
        transition: box-shadow 0.3s linear;
        box-shadow: none;
    }

    .profile_image_container:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .profile_image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .nav_icon {
        position: relative;
        width: 3rem;
        max-height: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        fill: #3D3832;
        transition: fill 0.3s linear;
    }

    .label {
        display: block;
        font-size: 1rem;
    }

    @media screen and (max-width: 720px) {

        #client_nav_panel {
            width: 100%;
            background-color:#FFECEC;
        }

        .client_nav_panel_tabs {
            flex-direction: row;
            margin: 0;
            padding: 0 1rem;
            justify-content: space-between;
            gap: 0.125rem;
        }

        li[aria-current="page"] > .client_nav_panel_tab::after {
            --size: 6px;
            content: '';
            position: absolute;
            top: auto;
            left: 0;
            right: 0;
            bottom:0;
            border: var(--size) solid transparent;
            border-bottom: 6px solid #3D3832;
            overflow: visible;
        }

        .client_nav_panel_tab {
            gap: 0;
            padding: 0 0 1rem 0;
            height: 100%;
        }

        .nav_icon {
            width: 2.5rem;
            height: 2rem;
        }

        .label {
            display: none;
        }

        .profile_image_container {
            width: 3rem;
            height: 3rem;
        }

        .client_nav_panel_fixed {
            position: fixed;
            top: auto;
            bottom: 0;
        }
    }
    
</style>
