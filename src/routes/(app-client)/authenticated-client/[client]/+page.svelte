<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import EditButton from "$lib/components/buttons/EditButton.svelte";
    import { onMount } from "svelte";
    import type { E164Number } from 'svelte-tel-input/types';
    import ClientContactInfoForm from "$lib/components/forms/ClientContactInfoForm.svelte";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import AddItemButton from "$lib/components/buttons/AddItemButton.svelte";
    import Mailbox from "$lib/images/icons/mailbox_solid.svg?raw";
    import Calendar from "$lib/images/icons/calendar.svg?raw";
    import Project from "$lib/images/icons/project.svg?raw";
    import Billing from "$lib/images/icons/billing.svg?raw";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    import { PUBLIC_STRIPEPUBLISHABLEKey } from '$env/static/public';
    import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js';
    import { Elements, LinkAuthenticationElement, PaymentElement, Address } from 'svelte-stripe';
    import SubmitButton02 from "$lib/components/buttons/SubmitButton02.svelte";
    import CancelSubmitButton from "$lib/components/buttons/CancelSubmitButton.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import EditIcton from "$lib/images/icons/edit_icon.svg?raw";
    import DeleteIcon from "$lib/images/icons/delete_icon.svg?raw";
    import { ModalOpenStore } from "$lib/stores/ModalOpenStore";
    import { DeleteConfirmationStore } from "$lib/stores/DeleteConfirmationStore";
    import { DeleteConfirmedStore } from "$lib/stores/DeleteConfirmedStore";
    import Tabs from "$lib/components/tabPanelClient/Tabs.svelte";
    import Panel from "$lib/components/tabPanelClient/Panel.svelte";
    import PanelProjects from "$lib/components/tabPanelClient/ProjectsPanel.svelte";
    import PanelConsultations from "$lib/components/tabPanelClient/ConsultationsPanel.svelte";
    
    import { v4 as uuidv4 } from 'uuid';
  import PaymentMethodCard from "$lib/components/cards/PaymentMethodCard.svelte";

    let clientEmail = $page.data.streamed.user?.email;

    let stripeCustomerID: string;

    let pendingClientData: boolean = false;

    let getClientDataSuccess: boolean | null = null;

    let clientData: any;

    let dateCreated: string;

    let contactInfoAdded: boolean = false;

    let balance: number | null = null;

    let paymentMethods: PaymentMethodData;

    let consultationRequests: Consultation[] = []; 

    let upcomingConsultations: Consultation[] = [];

    let pastConsultations: Consultation[] = [];

    let projectRequests: Project[] = [];

    let startedProjects: Project[] = [];

    let completedProjects: Project[] = [];

    const getPaymentMethods = async () => {

        const response = await fetch("/authenticated-client/api/getPaymentMethods", {
            method: "POST",
            body: JSON.stringify({
                clientEmail,
                stripeCustomerID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        paymentMethods = await response.json();

    };

    let invoices: any[] = [];

    const getClientData = async () => {
        pendingClientData = true;
        const response = await fetch("/authenticated-client/api/getClientData", {
            method: "POST",
            body: JSON.stringify({
                clientEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        clientData = await response.json();

        if (response.ok) {
            if (clientData.contact_information?.street_address) {
                contactInfoAdded = true;
            } else if (!clientData.contact_information?.street_address) {
                contactInfoAdded = false;
            };
            dateCreated = new Date(clientData.client?.date_created).toUTCString();
            nameFirstInputValue = clientData.client?.name_first ? clientData.client?.name_first : "";
            nameLastInputValue = clientData.client?.name_last ? clientData.client?.name_last : "";
            emailInputValue = clientData.client?.email ? clientData.client?.email : "";
            companyInputValue = clientData.contact_information?.company ? clientData.contact_information?.company : "";
            phoneInputValue = clientData.contact_information?.phone_number ? clientData.contact_information?.phone_number : "";
            URLInputValue = clientData.contact_information?.URL ? clientData.contact_information?.URL : "";
            streetAddressInputValue = clientData.contact_information?.street_address ? clientData.contact_information?.street_address : "";
            streetAddress02InputValue = clientData.contact_information?.street_address_02 ? clientData.contact_information?.street_address_02 : "";
            cityInputValue = clientData.contact_information?.city ? clientData.contact_information?.city : "";
            stateInputValue = clientData.contact_information?.state ? clientData.contact_information?.state : "";
            zipCodeInputValue = clientData.contact_information?.zip_code ? clientData.contact_information?.zip_code : "";
            balance = clientData.billing.data[0].balance;
            stripeCustomerID = clientData.contact_information?.Stripe_customer_ID;
            invoices = clientData.invoices.data;
            clientData.consultations?.forEach((consultation: Consultation) => {
                if (consultation.status === "requested") {
                    consultationRequests = [...consultationRequests, consultation];
                } else if (consultation.status === "upcoming") {
                    upcomingConsultations = [...upcomingConsultations, consultation];
                } else if (consultation.status === "past") {
                    pastConsultations = [...pastConsultations, consultation];
                };
            });
            clientData.projects?.forEach((project: Project) => {
                if (project.status === "requested") {
                    projectRequests = [...projectRequests, project];
                } else if (project.status === "started") {
                    startedProjects = [...startedProjects, project];
                } else if (project.status === "completed") {
                    completedProjects = [...completedProjects, project];
                };
            });
            pendingClientData = false;
            getClientDataSuccess = true;
        } else if (!response.ok) {
            pendingClientData = false;
            getClientDataSuccess = false;
        };

        // get payment methods if any
        getPaymentMethods();
    };

    let pendingClientContactInformation: boolean = false;

    let getClientContactInformationSuccess: boolean | null = null;

    let clientContactInformation: any;

    const getClientContactInformation = async () => {
        pendingClientContactInformation = true;
        const response = await fetch("/authenticated-client/api/getClientContactInformation", {
            method: "POST",
            body: JSON.stringify({
                clientEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        clientContactInformation = await response.json();

        if (response.ok) {
            if (clientContactInformation.contact_information?.street_address) {
                contactInfoAdded = true;
            } else if (!clientContactInformation.contact_information?.street_address) {
                contactInfoAdded = false;
            };
            dateCreated = new Date(clientContactInformation.client?.date_created).toUTCString();
            nameFirstInputValue = clientContactInformation.client?.name_first ? clientContactInformation.client?.name_first : "";
            nameLastInputValue = clientContactInformation.client?.name_last ? clientContactInformation.client?.name_last : "";
            emailInputValue = clientContactInformation.client?.email ? clientContactInformation.client?.email : "";
            companyInputValue = clientContactInformation.contact_information?.company ? clientContactInformation.contact_information?.company : "";
            phoneInputValue = clientContactInformation.contact_information?.phone_number ? clientContactInformation.contact_information?.phone_number : "";
            URLInputValue = clientContactInformation.contact_information?.URL ? clientContactInformation.contact_information?.URL : "";
            streetAddressInputValue = clientContactInformation.contact_information?.street_address ? clientContactInformation.contact_information?.street_address : "";
            streetAddress02InputValue = clientContactInformation.contact_information?.street_address_02 ? clientContactInformation.contact_information?.street_address_02 : "";
            cityInputValue = clientContactInformation.contact_information?.city ? clientContactInformation.contact_information?.city : "";
            stateInputValue = clientContactInformation.contact_information?.state ? clientContactInformation.contact_information?.state : "";
            zipCodeInputValue = clientContactInformation.contact_information?.zip_code ? clientContactInformation.contact_information?.zip_code : "";
            balance = clientData.billing.data[0].balance;
            pendingClientContactInformation = false;
            getClientContactInformationSuccess = true;
        } else if (!response.ok) {
            pendingClientContactInformation = false;
            getClientContactInformationSuccess = false;
        };

    };

    let stripe: Stripe | null = null;

    const loadStripeHandler = async () => {
        stripe = await loadStripe(PUBLIC_STRIPEPUBLISHABLEKey);
    };

    onMount(() => {
        loadStripeHandler();   
        getClientData();
    });

    let nameFirstInputValue: string = "";
    let nameLastInputValue: string = "";
    let emailInputValue: string = "";
    let phoneInputValue: E164Number | null = null;
    let companyInputValue: string = "";
    let URLInputValue: string = "";
    let streetAddressInputValue: string = "";
    let streetAddress02InputValue: string = "";
    let cityInputValue: string = "";
    let stateInputValue: string = "";
    let zipCodeInputValue: number | null = null;

    $: contactInfoInputValues = {
        name_first: nameFirstInputValue,
        name_last: nameLastInputValue,
        email: emailInputValue,
        phone_number: phoneInputValue,
        company: companyInputValue,
        url: URLInputValue,
        street_address: streetAddressInputValue,
        street_address_02: streetAddress02InputValue,
        city: cityInputValue,
        state: stateInputValue,
        zip_code: zipCodeInputValue
    };

    let addContactDetails: boolean = false;

    let editContactDetailsClicked: boolean = false;

    let cancelClicked: boolean = false;

    $: if (cancelClicked && addContactDetails) {
        addContactDetails = false;
        cancelClicked = false;
    } else if (cancelClicked && editContactDetailsClicked) {
        editContactDetailsClicked = false;
        cancelClicked = false;
    };

    let contactValuesSaved: boolean = false;

    $: if (contactValuesSaved) {
        getClientContactInformation();
        addContactDetails = false;
        editContactDetailsClicked = false;
        contactValuesSaved = false;
    };

    let addPaymentMethodClickHandler: boolean = false;

    let pendingPaymentSetup: boolean = false;

    let stripeClientSecret: string;

    const createPaymentSetup = async () => {
        pendingPaymentSetup = true;
        const response = await fetch("/authenticated-client/api/setupPaymentIntent", {
            method: "POST",
            body: JSON.stringify({
                clientEmail,
                stripeCustomerID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let clientSecretKey;

        clientSecretKey = await response.json();

        stripeClientSecret = clientSecretKey.clientSecretKey;

        if (response.ok) {
            pendingPaymentSetup = false;
        } else if (!response.ok) {
            pendingPaymentSetup = false;
        };
    };

    let addPaymentMethod: boolean = false;

    $: if (addPaymentMethodClickHandler) {
        addPaymentMethod = true;
        createPaymentSetup();
        addPaymentMethodClickHandler = false;
    };

    let elements: StripeElements | any = null;

    let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000);
    };

    let pendingSubmitPaymentHandler: null | boolean = null;

    const submitPaymentMethodHandler = async () => {

        // avoid processing duplicates
        if (pendingSubmitPaymentHandler) {
            return;
        };

        pendingSubmitPaymentHandler = true;

        const response = await stripe?.confirmSetup({
            elements,
            redirect: "if_required"
        });

        if (response?.error) {
            // payment failed, notify the user
            responseItem.error = response?.error.message;
        };

        stripe?.retrieveSetupIntent(stripeClientSecret)
        .then(({setupIntent}) => {
            switch (setupIntent?.status) {
                case "succeeded":
                    console.log("setup intent retrieved successfully!")
                    responseItem.success = "success saving payment method!";
                    elements = null;
                    addPaymentMethod = false;
                    // get payment methods if any
                    getPaymentMethods();
                    break;
                case "processing":
                    pendingSubmitPaymentHandler = true;
                    break;
                case "requires_payment_method":
                    // payment again
                    responseItem.error = "failed to process payment method.  Please try another payment method."
                    break;
            };
        });
    };

    $: if((responseItem.success) || (responseItem.error)) {
        pendingSubmitPaymentHandler = false;
    };

    let cancelPaymentMethodClicked: boolean = false;

    $: if (cancelPaymentMethodClicked) {
        elements = null;
        addPaymentMethod = false;
        cancelPaymentMethodClicked = false;
    };

    const detachPaymentMethodHandler = async (paymentMethodID: string) => {

        $ModalOpenStore = true;

        const paymentMethodData: PaymentMethodDeleteItem | any = {
            message: "payment method",
            data: paymentMethodID
        };

        $DeleteConfirmationStore = paymentMethodData;

    };

    const ConfirmedDeletePaymentMethod = async () => {

        const paymentMethodID = paymentMethods?.data[0].id;

        const response = await fetch("/authenticated-client/api/detachPaymentMethod", {
            method: "POST",
            body: JSON.stringify({
                paymentMethodID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        let paymentMethod;
        paymentMethod = await response.json();

        getPaymentMethods();

    };

    $: if ($DeleteConfirmedStore === true) {
        ConfirmedDeletePaymentMethod();
        $DeleteConfirmedStore = false;
    };

    let activeTabConsultations: number = 0;
    let activeTabProjects: number = 0;

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

    let tabPanelsProjects: TabPanel[];

    $: tabPanelsProjects = [
        {
            id: uuidv4(),
            index: 0,
            label: "project requests",
            tabImageSrc: "",
            panel: PanelProjects,
            data: [...projectRequests]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "started projects",
            tabImageSrc: "",
            panel: PanelProjects,
            data: [...startedProjects]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "completed projects",
            tabImageSrc: "",
            panel: PanelProjects,
            data: [...completedProjects]
        },
    ];
    
</script>

<svelte:head>
	<title>Art in Tech Services - {nameFirstInputValue} {nameLastInputValue} client portal</title>
	<meta name="description" content="client portal" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page">
    <div class="client_dashboard">
        {#if (pendingClientData)}
            <LoadingSpinner />
        {:else if (!pendingClientData)}
            <p class="joined_date">
                joined on {dateCreated}
            </p>
            <h1>
                welcome, {nameFirstInputValue} {nameLastInputValue}
            </h1>
            <section class="section_odd">
                <h2 class="section_header">
                    contact details 
                    <div class="mailbox_container">
                        {@html Mailbox}
                    </div>
                </h2>
                {#if (!contactInfoAdded && !addContactDetails && !editContactDetailsClicked)}
                    <AddItemButton
                        bind:addItemClicked={addContactDetails}
                    >
                        contact details
                    </AddItemButton>
                {:else if (addContactDetails && !contactInfoAdded && !editContactDetailsClicked)}
                    {#if (pendingClientContactInformation)}
                        <LoadingSpinner />
                    {:else if (!pendingClientContactInformation)}
                        <ClientContactInfoForm 
                            values={contactInfoInputValues} 
                            clientEmail={clientEmail}
                            bind:contactValuesSaved={contactValuesSaved}
                            bind:cancelClicked={cancelClicked}
                        />
                    {/if}
                {:else if (contactInfoAdded && !addContactDetails)}
                    {#if (pendingClientContactInformation)}
                        <LoadingSpinner />
                    {:else if (!pendingClientContactInformation && editContactDetailsClicked && !addContactDetails)}
                        <ClientContactInfoForm 
                            values={contactInfoInputValues} 
                            clientEmail={clientEmail}
                            bind:contactValuesSaved={contactValuesSaved}
                            bind:cancelClicked={cancelClicked}
                        />
                    {:else if (!pendingClientContactInformation && !editContactDetailsClicked && !addContactDetails)}
                        <table>
                            <colgroup>
                                <col style="width: 50%;" />
                                <col style="width: 50%;" /> 
                            </colgroup>
                            <tr>
                                <td>
                                    {nameFirstInputValue} {nameLastInputValue}
                                </td>
                                <td>
                                    {streetAddressInputValue}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {emailInputValue}
                                </td>
                                <td>
                                    {streetAddress02InputValue}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {companyInputValue}
                                </td>
                                <td>
                                    {cityInputValue}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {phoneInputValue}
                                </td>
                                <td>    
                                    {stateInputValue}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href={URLInputValue} target="_blank">
                                        {URLInputValue}
                                    </a>
                                </td>
                                <td>
                                    {zipCodeInputValue}
                                </td>
                            </tr>
                        </table>
                        <EditButton bind:editClicked={editContactDetailsClicked}>
                            edit
                        </EditButton>
                    {/if}
                {/if}
            </section>
            <section class="section_even">
                <h2 class="section_header">
                    consultations
                    <div class="heading_icon_container">
                        {@html Calendar}
                    </div>
                </h2>
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
                <a href="/authenticated-client/client/request-a-consultation">
                    <ActionButtonSecondary>
                        request a consultation
                    </ActionButtonSecondary>
                </a>
            </section>
            <section class="section_odd">
                <h2 class="section_header">
                    projects
                    <div class="heading_icon_container">
                        {@html Project}
                    </div>
                </h2>
                <div class="projects">
                    <Tabs 
                        tabPanels={tabPanelsProjects} 
                        bind:activeTab={activeTabProjects}
                    />
                    <Panel 
                        tabPanels={tabPanelsProjects} 
                        bind:activeTab={activeTabProjects}
                    />
                </div>
                <a href="/authenticated-client/client/request-to-start-a-project">
                    <ActionButtonSecondary>
                        request to start a project
                    </ActionButtonSecondary>
                </a>
            </section>
            <section class="section_even">
                <h2 class="section_header">
                    billing
                    <div class="heading_icon_container">
                        {@html Billing}
                    </div>
                </h2>
                <h3><span style="font-weight: 400;">balance: </span>${balance}</h3>
                <div class="table_container">
                    <table class="invoices_table">
                        <tr>
                            <th>
                                invoice
                            </th>
                            <th>
                                date created
                            </th>
                            <th>
                                due date
                            </th>
                            <th>
                                amount due
                            </th>
                            <th>
                                status
                            </th>
                            <th>
                                details
                            </th>
                            <th>
                                action
                            </th>
                        </tr>
                        {#each invoices as invoice, index}
                            <tr>
                                <td>
                                    {++index}
                                </td>
                                <td>
                                    {new Date(invoice.created * 1000).toUTCString().slice(0, 16)}
                                </td>
                                <td>
                                    {new Date(invoice.due_date * 1000).toUTCString().slice(0, 16)}
                                </td>
                                <td>
                                    ${invoice.amount_due * 0.01}
                                </td>
                                <td>
                                    {invoice.status}
                                </td>
                                <td>
                                    {#each invoice.lines.data as invoiceLineItem, index}
                                        {invoiceLineItem.description}
                                    {/each}
                                </td>
                                <td>
                                    {#if !invoice.paid}
                                        <a href={`/authenticated-client/client/make-a-payment?invoice-ID=${invoice.id}&client-email=${clientEmail}`}>
                                            make payment
                                        </a>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    </table>
                </div>
                <section class="section_even">
                </section>
                <h3>
                    billing information
                </h3>
                {#if (paymentMethods?.data?.length > 0)}
                    {#each paymentMethods.data as paymentMethod, index}
                        <PaymentMethodCard paymentMethod={paymentMethod} />
                    {/each}
                {:else if !addPaymentMethod && (paymentMethods?.data?.length === 0)}
                    <AddItemButton bind:addItemClicked={addPaymentMethodClickHandler}>
                        Add payment method
                    </AddItemButton>
                {:else if addPaymentMethod && (!stripeClientSecret || !stripe)}
                    <LoadingSpinner />
                {:else if addPaymentMethod && stripeClientSecret && stripe}
                    <div class="stripe_save_payment_method">
                        <Elements
                            stripe={stripe}
                            clientSecret={stripeClientSecret}
                            theme="flat"
                            variables={{ 
                                colorPrimary: '#838B6A',
                                colorBackground: '#EFF9F2',
                                colorText: '#36261E',
                                colorDanger: '#914732',
                            }}
                            rules={{ '.Input': { border: 'solid 2px #AEA89D' } }}
                            bind:elements
                        >
                            <form on:submit|preventDefault={submitPaymentMethodHandler} >
                                <LinkAuthenticationElement />
                                <PaymentElement />
                                <Address mode="billing" />
                                <div class="buttons_container">
                                    <CancelSubmitButton bind:cancelClicked={cancelPaymentMethodClicked}>
                                        cancel
                                    </CancelSubmitButton>
                                    <SubmitButton02>
                                        save
                                    </SubmitButton02>
                                </div>
                            </form>
                            {#if (pendingSubmitPaymentHandler)}
                                <PendingFlashMessage >
                                    please wait while we validate your data
                                </PendingFlashMessage>
                            {:else if (responseItem.error)}
                                <ErrorFlashMessage >
                                    {responseItem.error}
                                </ErrorFlashMessage>
                            {:else if (responseItem.success)}
                                <SuccessFlashMessage>
                                    {responseItem.success}
                                </SuccessFlashMessage>
                            {/if}
                        </Elements>
                    </div>
                {/if}
            </section>
        {/if}
    </div>
</div>

<style>

    .client_dashboard {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        gap: 1rem;
        width: 100%;
    }

    .section_odd {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
        width: 100%;
    }

    .section_even {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
        width: 100%;
        background-color: #E0E0DD;
    }

    .consultations {
        width: 100%;
        max-width: 60rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .projects {
        width: 100%;
        max-width: 60rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .joined_date {
        position: absolute;
        left: auto;
        right: 0;
        padding: 0.5rem 1rem;
        margin: 0;
    }

    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
        max-width: 60rem;
    }

    .section_header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .heading_icon_container {
        width: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .mailbox_container {
        width: 1.75rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .table_container {
        width: 100%;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .invoices_table {
        min-width: 40rem;
        margin: 0 auto;
    }

    table > tr {
        height: auto;
        padding: 0;
    }

    table > tr > td {
        font-size: 1.25rem;
        padding: 0.25rem 1rem;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    table tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .stripe_save_payment_method {
        width: 100%;
        max-width: 60rem;
    }
    
    .delete_icon {
        width: 1.25rem;
    }

    @media screen and (max-width: 1440px) {
        table > tr > td {
            font-size: 1.175rem;
            padding: 0.25rem 0.5rem;
        }

        .button_table {
            font-size: 1.175rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .joined_date {
            position: absolute;
            left: auto;
            right: 0;
            padding: 0.5rem 1rem;
            margin: 0;
            width: 15rem;
        }

        table > tr > td {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
        }

        .button_table {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 720px) {
        .joined_date {
            position: relative;
            left: auto;
            right: auto;
            padding: 0.25rem 0.5rem;
            width: auto;
        }
    }
</style>