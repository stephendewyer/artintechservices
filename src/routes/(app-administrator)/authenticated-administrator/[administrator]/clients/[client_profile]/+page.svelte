<script lang="ts">
    import LoadingSpinner from '$lib/components/loadingSpinners/LoadingSpinner.svelte';
    import { onMount } from 'svelte';
    import ProfilePhotoDefault from "$lib/images/default/default_profile_photo.jpg";
    import ActionButtonSecondary from '$lib/components/buttons/ActionButtonSecondary.svelte';
    import Panel from "$lib/components/tabPanelAdministrator/Panel.svelte";
    import Tabs from "$lib/components/tabPanelAdministrator/Tabs.svelte";
    import ClientBilling from '$lib/components/tabPanelAdministrator/ClientBilling.svelte';
    import ClientConsultations from '$lib/components/tabPanelAdministrator/ClientConsultations.svelte';
    import ClientContactDetails from '$lib/components/tabPanelAdministrator/ClientContactDetails.svelte';
    import ClientProjects from '$lib/components/tabPanelAdministrator/ClientProjects.svelte';
    import { v4 as uuidv4 } from 'uuid';

    export let data;

    const clientEmail = data.streamed.clientEmail;

    // get the client's profile

    let pendingClientProfile: boolean = false;

    let failedToGetClientProfile: boolean = false;

    let clientProfile: ClientProfileAdminView | any = {};

    let clientContactDetails: ClientContactInformation;

    const getClientProfile = async () => {

        pendingClientProfile = true;

        try {
            
            const response = await fetch("/authenticated-administrator/api/getClientProfileData", {
                method: "POST",
                body: JSON.stringify({
                    clientEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            clientProfile = await response.json();
            // console.log(clientProfile)

            if (response.ok) {
                pendingClientProfile = false;
                failedToGetClientProfile = false;
                clientContactDetails = {
                    company: clientProfile.company,
                    country: clientProfile.country,
                    city: clientProfile.city,
                    email: clientProfile.email,
                    name_first: clientProfile.name_first,
                    name_last: clientProfile.name_last,
                    phone_number: clientProfile.phone_number,
                    state: clientProfile.state,
                    street_address: clientProfile.street_address,
                    street_address_02: clientProfile.street_address_02,
                    zip_code: clientProfile.zip_code
                };
  
            } else if (!response.ok) {
                failedToGetClientProfile = true;
                pendingClientProfile = false;
            };
        } catch(err) {
            console.log(err);
        };

    };

    onMount(() => {
        getClientProfile();
    });

    let activeTabClientProfile: number = 0;

    let tabPanelsClientProfile: TabPanel[];

    $: tabPanelsClientProfile = [
        {
            id: uuidv4(),
            index: 0,
            label: "contact details",
            tabImageSrc: "",
            panel: ClientContactDetails,
            data: [clientContactDetails]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "consultations",
            tabImageSrc: "",
            panel: ClientConsultations,
            data: [clientProfile.consultations]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "projects",
            tabImageSrc: "",
            panel: ClientProjects,
            data: [clientProfile.projects]
        },
        {
            id: uuidv4(),
            index: 3,
            label: "invoices",
            tabImageSrc: "",
            panel: ClientBilling,
            data: [
                {
                    invoices: clientProfile.invoices
                },{
                    total_amount_due: clientProfile.total_amount_due
                },{
                    payment_methods: clientProfile.payment_methods
                }
            ]
        },
    ];

</script>
<section class="client_profile">
    <h1>
        client profile
    </h1>
    {#if pendingClientProfile}
        <LoadingSpinner />
    {:else if (!pendingClientProfile && failedToGetClientProfile)}
        <p>failed to get client profile</p>
    {:else if (!pendingClientProfile && !failedToGetClientProfile)}
        <div class="client_header">
            <div class="client_profile_image_container">
                <img 
                    class="client_profile_image"
                    src={clientProfile.image_URL ? clientProfile.image_URL : ProfilePhotoDefault} 
                    alt={clientProfile.alt_text ? clientProfile.alt_text: "The Art of Living, 1967, by René Magritte"} 
                />
            </div>
            <div class="header_info">
                <h1 class="client_name">{`${clientProfile.name_first} ${clientProfile.name_last}`}</h1>
                {#if clientProfile.company}
                    <h2>{clientProfile.company}</h2>
                {/if}
                <p class="date">
                    <span class="date_name">last login: </span>{new Date(clientProfile.last_login).toUTCString()}
                </p>
                <p class="date">
                    <span class="date_name">account created: </span>{new Date(clientProfile.date_created).toUTCString()}
                </p>
                <div class="message_button_container">
                    <ActionButtonSecondary>
                        message
                    </ActionButtonSecondary>
                </div>
                
            </div>
        </div>
        <div class="client_tabpanel">
            <div class="tabs_container">
                <Tabs 
                    tabPanels={tabPanelsClientProfile} 
                    bind:activeTab={activeTabClientProfile}
                />
            </div>
            <div class="tabs_panel">
                <Panel 
                    tabPanels={tabPanelsClientProfile}
                    bind:activeTab={activeTabClientProfile}
                />
            </div>
        </div>
    {/if}

</section>

<style>
    .client_profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;;
    }

    .client_header {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        width: 100%;
    }

    .client_profile_image_container {
        width: 50%;
        max-width: 20rem;
        height: 20rem;
    }

    .client_profile_image {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .header_info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 50%;
        padding: 0 1rem 0 0;
    }

    .date_name {
        font-weight: bold;
    }

    .client_name {
        font-weight: 200;
    }

    .date {
        margin: 0;
    }

    .client_tabpanel {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .tabs_container {
        width: 100%;
        overflow-x: auto;
        padding: 0 1rem;
    }

    .tabs_panel {
        width: 100%;
        padding: 0 1rem 1rem 1rem;
    }

    @media screen and (max-width: 720px) {
        .client_header {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .client_profile_image_container {
            width: 100%;
            max-width: 100%;
            height: 10rem;
        }

        .header_info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            width: 100%;
            padding: 0 1rem;
        }
    }

    
</style>