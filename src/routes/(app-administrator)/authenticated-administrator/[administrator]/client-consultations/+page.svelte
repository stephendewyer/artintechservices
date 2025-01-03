<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import SearchInput from "$lib/components/inputs/SearchInput.svelte";
    import ConsultationsPanel from "$lib/components/tabPanelConsultations/ConsultationsPanel.svelte";
    import Panel from "$lib/components/tabPanelConsultations/Panel.svelte";
    import Tabs from "$lib/components/tabPanelConsultations/Tabs.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import ConsultationsIcon from "$lib/images/icons/consultation_icon.svg?raw";
    import { onMount } from "svelte";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";

    let pendingConsultationsAllClients: boolean = false;

    let getConsultationsAllClientsSuccess: boolean = false;

    let allClientConsultations: any[] = [];

    let consultationsRequested: any[] = [];

    let consultationsScheduled: any[] = [];

    let consultationsCompleted: any[] = [];

    // get the consultations
    const getAllClientConsultations = async () => {

        pendingConsultationsAllClients = true;

        try {
            
            const response = await fetch("/authenticated-administrator/api/getAllClientConsultations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            allClientConsultations = await response.json();
            console.log(allClientConsultations);

            if (response.ok) {
                pendingConsultationsAllClients = false;
                getConsultationsAllClientsSuccess = true;
                
                allClientConsultations.forEach((consultation, index) => {
                    if (consultation.status === "requested" || consultation.status === null) {
                        consultationsRequested = [...consultationsRequested, consultation];
                    } else if (consultation.status === "scheduled") {
                        consultationsScheduled = [...consultationsScheduled, consultation];
                    } else if (consultation.status === "completed") {
                        consultationsCompleted = [...consultationsCompleted, consultation];;
                    }
                });

                console.log("requested consultations: ", consultationsRequested)

            } else if (!response.ok) {
                pendingConsultationsAllClients = false;
                getConsultationsAllClientsSuccess = false;
            };
        } catch(err) {
            console.log(err);
        };

    };

    onMount(() => {
        getAllClientConsultations();
        
    });

    let searchInputValue: string = "";
    let searchInputValueChange: boolean = false;

    let activeTabConsultations: number = 0;

    $: tabPanelsConsultations = [
        {
            id: uuidv4(),
            index: 0,
            label: "all",
            tabImageSrc: "",
            panel: ConsultationsPanel,
            data: [...allClientConsultations]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "requested",
            tabImageSrc: "",
            panel: ConsultationsPanel,
            data: [...consultationsRequested]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "scheduled",
            tabImageSrc: "",
            panel: ConsultationsPanel,
            data: [...consultationsScheduled]
        },
        {
            id: uuidv4(),
            index: 3,
            label: "completed",
            tabImageSrc: "",
            panel: ConsultationsPanel,
            data: [...consultationsCompleted]
        },
    ];

</script>

<svelte:head>
	<title>Art in Tech Services - clients' consultations</title>
	<meta name="description" content="clients' consultations page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<section class="client_consultations">
    <div class="client_consultations_heading">
        <h1>
            client consultations
        </h1>
        <div class="consultations_icon">
            {@html ConsultationsIcon}
        </div>
    </div>
    <ActionButtonSecondary>
        schedule a consultation
    </ActionButtonSecondary>
    <div class="invoices search">
        <SearchInput 
            placeholder="nameFirst nameLast | subject | XXXXXXXXXX"
            inputID="search invoices"
            inputName="search invoices"
            inputLabel={true}
            bind:searchInputValue
            bind:searchInputValueChange
        >  
            client | subject | consultation ID
        </SearchInput>
    </div>
    <h2>
        consultations
    </h2>
    {#if pendingConsultationsAllClients}
        <LoadingSpinner />
    {:else if !pendingConsultationsAllClients && getConsultationsAllClientsSuccess}
        <div class="tabs">
            <Tabs 
                tabPanels={tabPanelsConsultations} 
                bind:activeTab={activeTabConsultations}
            />
        </div>
        <div class="panel">
            <Panel 
                tabPanels={tabPanelsConsultations} 
                bind:activeTab={activeTabConsultations}
            />
        </div>
    {:else if !pendingConsultationsAllClients && !getConsultationsAllClientsSuccess}
        failed to load consultations
    {/if}
</section>
<style>
    .client_consultations {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .client_consultations_heading {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .consultations_icon {
        width: 8rem;
    }
</style>