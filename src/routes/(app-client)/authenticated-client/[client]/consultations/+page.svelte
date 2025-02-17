<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import Tabs from "$lib/components/tabPanelClient/Tabs.svelte";
    import Panel from "$lib/components/tabPanelClient/Panel.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import PanelConsultations from "$lib/components/tabPanelClient/ConsultationsPanel.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import { onMount } from "svelte";
    import ConsultationIcon from "$lib/images/icons/process/process_01.svg?raw";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";

    let clientEmail = $page.data.streamed.user?.email;

    let pendingClientConsultations: boolean = false;

    let getClientConsultationsSuccess: boolean = false;

    let clientConsultations: Consultation[] = [];

    let consultationRequests: Consultation[] = []; 

    let upcomingConsultations: Consultation[] = [];

    let pastConsultations: Consultation[] = [];

    const getClientConsultations = async () => {
        pendingClientConsultations = true;
        try {
            const response = await fetch("/authenticated-client/api/getClientConsultations", {
                method: "POST",
                body: JSON.stringify({
                    clientEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            clientConsultations = await response.json();

            if (response.ok) {
                clientConsultations?.forEach((consultation: Consultation) => {
                    if (consultation.status === "requested") {
                        consultationRequests = [...consultationRequests, consultation];
                    } else if (consultation.status === "upcoming") {
                        upcomingConsultations = [...upcomingConsultations, consultation];
                    } else if (consultation.status === "past") {
                        pastConsultations = [...pastConsultations, consultation];
                    };
                });
                pendingClientConsultations = false;
                getClientConsultationsSuccess = true;
            } else if (!response.ok) {
                pendingClientConsultations = false;
                getClientConsultationsSuccess = false;
            };
        } catch(err) {
            pendingClientConsultations = false;
            getClientConsultationsSuccess = false;
            console.log(err);
        };
        
    };

    onMount(() => {
        getClientConsultations();
    });

    let activeTabConsultations: number = 0;

    let tabPanelsConsultations: TabPanel[];

    $: tabPanelsConsultations = [
        {
            id: uuidv4(),
            index: 0,
            label: "consultation requests",
            tabImageSrc: "",
            panel: PanelConsultations,
            data: [...consultationRequests]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "upcoming consultations",
            tabImageSrc: "",
            panel: PanelConsultations,
            data: [...upcomingConsultations]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "past consultations",
            tabImageSrc: "",
            panel: PanelConsultations,
            data: [...pastConsultations]
        },
    ];

    
</script>

<section class="consultations_page">
    <h1 class="section_header">
        consultations
        <div class="heading_icon_container">
            {@html ConsultationIcon}
        </div>
    </h1>
    <a href="/authenticated-client/client/request-a-consultation">
        <ActionButtonSecondary>
            request a consultation
        </ActionButtonSecondary>
    </a>
    {#if pendingClientConsultations}
        <LoadingSpinner />
    {:else}
        <div class="consultations">
            <Tabs 
                tabPanels={tabPanelsConsultations} 
                bind:activeTab={activeTabConsultations}
            />
            <Panel 
                tabPanels={tabPanelsConsultations} 
                bind:activeTab={activeTabConsultations}
            />
        </div>
    {/if}
</section>

<svelte:head>
	<title>Art in Tech Services - my consultations</title>
	<meta name="description" content="my consultations page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<style>

    .consultations_page {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 0 0 1rem 0;
        width: 100%;
        max-width: 80rem;
        margin: 0 auto;
    }

    .section_header {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .heading_icon_container {
        width: 12rem;
    }

    .consultations {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 1rem 1rem 1rem;
    }
    
</style>

