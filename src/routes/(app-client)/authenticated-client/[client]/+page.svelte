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

    let clientEmail = $page.data.streamed.user?.email;

    let pendingClientData: boolean = false;

    let getClientDataSuccess: boolean | null = null;

    let clientData: any;

    let dateCreated: string;

    let clientContactData: any;

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
            clientContactData = clientData.contact_information;
            dateCreated = new Date(clientData.client?.date_created).toUTCString();
            nameFirstInputValue = clientData.client?.name_first !== "undefined" ? clientData.client?.name_first : "";
            nameLastInputValue = clientData.client?.name_last !== "undefined" ? clientData.client?.name_last : "";
            emailInputValue = clientData.client?.email !== "undefined" ? clientData.client?.email : "";
            companyInputValue = clientData.contact_information?.company !== "undefined" ? clientData.contact_information?.company : "";
            phoneInputValue = clientData.contact_information?.phone_number !== "undefined" ? clientData.contact_information?.phone_number : "";
            URLInputValue = clientData.contact_information?.URL !== "undefined" ? clientData.contact_information?.URL : "";
            streetAddressInputValue = clientData.contact_information?.street_address !== "undefined" ? clientData.contact_information?.street_address : "";
            streetAddress02InputValue = clientData.contact_information?.street_address_02 !== "undefined" ? clientData.contact_information?.street_address_02 : "";
            cityInputValue = clientData.contact_information?.city !== "undefined" ? clientData.contact_information?.city : "";
            stateInputValue = clientData.contact_information?.state !== "undefined" ? clientData.contact_information?.state : "";
            zipCodeInputValue = clientData.contact_information?.zip_code !== 0 || clientData.contact_information?.zip_code !== null ? clientData.contact_information?.zip_code : null;
            pendingClientData = false;
            getClientDataSuccess = true;
        } else if (!response.ok) {
            pendingClientData = false;
            getClientDataSuccess = false;
        };
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
            dateCreated = new Date(clientContactInformation.client?.date_created).toUTCString();
            nameFirstInputValue = clientContactInformation.client?.name_first !== "undefined" ? clientContactInformation.client?.name_first : "";
            nameLastInputValue = clientContactInformation.client?.name_last !== "undefined" ? clientContactInformation.client?.name_last : "";
            emailInputValue = clientContactInformation.client?.email !== "undefined" ? clientContactInformation.client?.email : "";
            companyInputValue = clientContactInformation.contact_information?.company !== "undefined" ? clientContactInformation.contact_information?.company : "";
            phoneInputValue = clientContactInformation.contact_information?.phone_number !== "undefined" ? clientContactInformation.contact_information?.phone_number : "";
            URLInputValue = clientContactInformation.contact_information?.URL !== "undefined" ? clientContactInformation.contact_information?.URL : "";
            streetAddressInputValue = clientContactInformation.contact_information?.street_address !== "undefined" ? clientContactInformation.contact_information?.street_address : "";
            streetAddress02InputValue = clientContactInformation.contact_information?.street_address_02 !== "undefined" ? clientContactInformation.contact_information?.street_address_02 : "";
            cityInputValue = clientContactInformation.contact_information?.city !== "undefined" ? clientContactInformation.contact_information?.city : "";
            stateInputValue = clientContactInformation.contact_information?.state !== "undefined" ? clientContactInformation.contact_information?.state : "";
            zipCodeInputValue = clientContactInformation.contact_information?.zip_code !== 0 || clientContactInformation.contact_information?.zip_code !== null ? clientContactInformation.contact_information?.zip_code : null;
            pendingClientContactInformation = false;
            getClientContactInformationSuccess = true;
        } else if (!response.ok) {
            pendingClientContactInformation = false;
            getClientContactInformationSuccess = false;
        };
    };

    let contactValuesSaved: boolean = false;

    $: if (contactValuesSaved) {
        getClientContactInformation();
        contactValuesSaved = false;
    };

    onMount(() => {
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

    let addContactDetails: boolean;

    let cancelClicked: boolean = false;

    $: if (cancelClicked) {
        addContactDetails = false;
        cancelClicked = false;
    };

</script>

<svelte:head>
	<title>Art in Tech Services - {nameFirstInputValue} {nameLastInputValue} client portal</title>
	<meta name="description" content="client portal" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<div class="page" style="gap: 1rem;">
    {#if (pendingClientData)}
        <LoadingSpinner />
    {:else if (!pendingClientData)}
        <h1>welcome, {nameFirstInputValue} {nameLastInputValue}</h1>
        <h2>joined on {dateCreated}</h2>
        <h3>contact details</h3>
        {#if (!clientContactData && !addContactDetails)}
            <AddItemButton
                bind:addItemClicked={addContactDetails}
            >
                contact details
            </AddItemButton>
        {:else if (addContactDetails && !clientContactData)}
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
        {:else if (clientContactData)}
            {#if (pendingClientContactInformation)}
                <LoadingSpinner />
            {:else if (!pendingClientContactInformation)}
                <ClientContactInfoForm 
                    values={contactInfoInputValues} 
                    clientEmail={clientEmail}
                    bind:contactValuesSaved={contactValuesSaved}
                />
            {/if}
        {/if}
        
        <EditButton>
            edit
        </EditButton>
    {/if}
</div>