<script lang="ts">
    import ProfilePhotoDefault from "$lib/images/default/default_profile_photo.jpg";
    import letterIcon from "$lib/images/icons/email_icon.svg?raw";
    import clientsIcon from "$lib/images/icons/clients.svg?raw";
    import consultationIcon from "$lib/images/icons/consultation_icon.svg?raw";
    import projectIcon from "$lib/images/icons/project.svg?raw";
    import billingIcon from "$lib/images/icons/billing.svg?raw";
    import settingsIcon from "$lib/images/icons/settings_icon.svg?raw";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { AdministratorProfileImageUpdatedStore } from "$lib/stores/AdministratorProfileImageUpdatedStore";
    import LoadingSpinner from "../loadingSpinners/LoadingSpinner.svelte";
    import { afterNavigate } from "$app/navigation";

    export let administratorEmail: string = "";
    export let administratorProfileImageID: number | null = null;
    export let administratorProfileImageURL: string = "";
    export let mobileNavPanelFixed: boolean = false;

    let profileImageAltText = "client profile image";

    $: if (!administratorProfileImageURL) {
        administratorProfileImageURL = ProfilePhotoDefault;
        profileImageAltText = "The Art of Living, 1967, by René Magritte";
    } else {
        administratorProfileImageURL = administratorProfileImageURL;
    };

    let pendingUploadedImage: boolean = false;

    const getUploadedAdministratorProfileImage = async () => {

        pendingUploadedImage = true;

        try {
            const response = await fetch("/authenticated-administrator/api/getUploadedAdministratorProfileImage", {
                method: "POST",
                body: JSON.stringify({
                    administratorEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const uploadedImage = await response.json();

            if (response.ok) {
                administratorProfileImageURL = uploadedImage.administrator_profile_image_URL ? uploadedImage.administrator_profile_image_URL : ProfilePhotoDefault;
                administratorProfileImageID = uploadedImage.administrator_profile_image_ID ? uploadedImage.administrator_profile_image_ID : null;
            } 

        } catch (err) {
            console.log(err);
        };

        pendingUploadedImage = false;

    };

    $: if ($AdministratorProfileImageUpdatedStore) {
        getUploadedAdministratorProfileImage();
        $AdministratorProfileImageUpdatedStore = false;
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
    id="administrator_nav_panel"
    class={navPanelFixed || mobileNavPanelFixed ? "administrator_nav_panel_fixed" : navPanelAbsolute ? "administrator_nav_panel_absolute" : navPanelRelative ? "administrator_nav_panel_relative": "administrator_nav_panel_relative"}
    bind:this={navPanelElement}
    bind:clientWidth={width}
    bind:clientHeight={height}
>
    <ul class="administrator_nav_panel_tabs">
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-administrator/administrator"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-administrator/administrator"
                class="administrator_nav_panel_tab"

            >
                <div class="profile_image_container">
                    {#if (pendingUploadedImage)}
                        <LoadingSpinner />
                    {:else}
                        <img
                            src={administratorProfileImageURL} 
                            alt={profileImageAltText}
                            class="profile_image"
                        /> 
                    {/if}         
                </div>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-administrator/administrator/messages"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-administrator/administrator/messages"
                class="administrator_nav_panel_tab"
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
                $page.url.pathname === "/authenticated-administrator/administrator/clients"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-administrator/administrator/clients"
                class="administrator_nav_panel_tab"
            >
                <div class="nav_icon">
                    {@html clientsIcon}
                </div>
                <span class="label">
                    clients
                </span>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-administrator/administrator/client-billing"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-administrator/administrator/client-billing"
                class="administrator_nav_panel_tab"
            >
                <div class="nav_icon">
                    {@html billingIcon}
                </div>
                <span class="label">
                    client billing
                </span>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-administrator/administrator/client-consultations"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-administrator/administrator/client-consultations"
                class="administrator_nav_panel_tab"
            >
                <div class="nav_icon">
                    {@html consultationIcon}
                </div>
                <span class="label">
                    client consultations
                </span>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-administrator/administrator/client-projects"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-administrator/administrator/client-projects"
                class="administrator_nav_panel_tab"
            >
                <div class="nav_icon">
                    {@html projectIcon}
                </div>
                <span class="label">
                    client projects
                </span>
            </a>
        </li>
        <li
            aria-current={(
                $page.url.pathname === "/authenticated-administrator/administrator/account"
            ) ? "page" : undefined} 
        >
            <a 
                href="/authenticated-administrator/administrator/account"
                class="administrator_nav_panel_tab"
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

    #administrator_nav_panel {
        width: 12rem;
        z-index: 1;
    }

    .administrator_nav_panel_fixed {
        position: fixed;
        top: 0;
    }

    .administrator_nav_panel_absolute {
        position: absolute;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .administrator_nav_panel_relative {
        position: relative;
        width: 100%;
    }

    li[aria-current="page"] > .administrator_nav_panel_tab::after {
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

    .administrator_nav_panel_tabs {
        position: relative;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 0.5rem;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .administrator_nav_panel_tab {
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

    .administrator_nav_panel_tab:hover {
        color: #475AA7;
    }

    .administrator_nav_panel_tab:hover > .nav_icon {
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

        #administrator_nav_panel {
            width: 100%;
            background-color:#FFECEC;
        }

        .administrator_nav_panel_tabs {
            flex-direction: row;
            margin: 0;
            padding: 0 1rem;
            justify-content: space-between;
            gap: 0.125rem;
        }

        li[aria-current="page"] > .administrator_nav_panel_tab::after {
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

        .administrator_nav_panel_tab {
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

        .administrator_nav_panel_fixed {
            position: fixed;
            top: auto;
            bottom: 0;
        }
    }
    
</style>
