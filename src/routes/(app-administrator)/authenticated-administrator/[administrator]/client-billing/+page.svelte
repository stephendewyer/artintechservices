<script lang="ts">
    import InvoicingIcon from "$lib/images/icons/billing.svg?raw";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import SearchInput from "$lib/components/inputs/SearchInput.svelte";
    import Tabs from "$lib/components/tabPanelInvoices/Tabs.svelte";
    import Panel from "$lib/components/tabPanelInvoices/Panel.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import InvoicesPanel from "$lib/components/tabPanelInvoices/InvoicesPanel.svelte";
    import { onMount } from "svelte";
  import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";

    let searchInputValue: string = "";

    let searchInputValueChange: boolean = false;

    let pendingInvoicesAllClients: boolean = false;

    let getInvoicesAllClientsSuccess: boolean = false;

    let allClientInvoices: any[] = [];

    let unpaidInvoices: any[] = [];

    let paidInvoices: any[] = [];

    const getClientFinancials = async () => {

        pendingInvoicesAllClients = true;

        try {
            
            const response = await fetch("/authenticated-administrator/api/getAllClientInvoices", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            allClientInvoices = [...await response.json()];
            // console.log(allClientInvoices);

            if (response.ok) {

                allClientInvoices.forEach((invoice: any, index: number) => {
                    if (invoice.paid) {
                        paidInvoices = [...paidInvoices, invoice];
                    } else if (!invoice.paid) {
                        unpaidInvoices = [...unpaidInvoices, invoice];
                    };
                });

                pendingInvoicesAllClients = false;
                getInvoicesAllClientsSuccess = true;
            } else if (!response.ok) {
                pendingInvoicesAllClients = false;
                getInvoicesAllClientsSuccess = false;
            };
        } catch(err) {
            console.log(err);
        };

    };

    onMount(() => {
        getClientFinancials();
    });

    let activeTabInvoices: number = 0;

    $: tabPanelsInvoices = [
        {
            id: uuidv4(),
            index: 0,
            label: "all",
            tabImageSrc: "",
            panel: InvoicesPanel,
            data: [...allClientInvoices]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "unpaid",
            tabImageSrc: "",
            panel: InvoicesPanel,
            data: [...unpaidInvoices]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "paid",
            tabImageSrc: "",
            panel: InvoicesPanel,
            data: [...paidInvoices]
        },
    ];

</script>

<section class="billing_page">
    <div class="billing_heading">
        <h1>
            billing
        </h1> 
        <div class="invoicing_icon_container">
            {@html InvoicingIcon}
        </div>
    </div>
    <ActionButtonSecondary>
        create invoice
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
        invoices
    </h2>
    {#if pendingInvoicesAllClients}
        <LoadingSpinner />
    {:else if !pendingInvoicesAllClients && getInvoicesAllClientsSuccess}
        <div class="tabs">
            <Tabs 
                tabPanels={tabPanelsInvoices} 
                bind:activeTab={activeTabInvoices}
            />
        </div>
        <div class="panel">
            <Panel 
                tabPanels={tabPanelsInvoices} 
                bind:activeTab={activeTabInvoices}
            />
        </div>
    {:else if (!pendingInvoicesAllClients && !getInvoicesAllClientsSuccess)}
        failed to load invoices
    {/if}
</section>

<style>

    .billing_page {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .billing_heading {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .invoicing_icon_container {
        width: 8rem;
    }

</style>