<script lang="ts">
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import SearchInput from "$lib/components/inputs/SearchInput.svelte";
    import ConsultationsPanel from "$lib/components/tabPanelConsultations/ConsultationsPanel.svelte";
    import Panel from "$lib/components/tabPanelConsultations/Panel.svelte";
    import Tabs from "$lib/components/tabPanelConsultations/Tabs.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import ConsultationsIcon from "$lib/images/icons/consultation_icon.svg?raw"
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
            data: []
        },
        {
            id: uuidv4(),
            index: 1,
            label: "requested",
            tabImageSrc: "",
            panel: ConsultationsPanel,
            data: []
        },
        {
            id: uuidv4(),
            index: 2,
            label: "scheduled",
            tabImageSrc: "",
            panel: ConsultationsPanel,
            data: []
        },
        {
            id: uuidv4(),
            index: 3,
            label: "completed",
            tabImageSrc: "",
            panel: ConsultationsPanel,
            data: []
        },
    ];

</script>
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
            client | subject | invoice ID
        </SearchInput>
    </div>
    <h2>
        consultations
    </h2>
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