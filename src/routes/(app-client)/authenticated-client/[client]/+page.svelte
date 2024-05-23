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

    let contactInfoAdded: boolean = false;

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
            pendingClientContactInformation = false;
            getClientContactInformationSuccess = true;
        } else if (!response.ok) {
            pendingClientContactInformation = false;
            getClientContactInformationSuccess = false;
        };
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
            <p class="joined_date">joined on {dateCreated}</p>
            <h1>welcome, {nameFirstInputValue} {nameLastInputValue}</h1>
            <h2>contact details</h2>
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
                                {companyInputValue}
                            </td>
                            <td>
                                {zipCodeInputValue}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {URLInputValue}
                            </td>
                            <td>

                            </td>
                        </tr>
                    </table>
                    <EditButton bind:editClicked={editContactDetailsClicked}>
                        edit
                    </EditButton>
                {/if}
            {/if}
        {/if}
        <h2>
            consultations
        </h2>
        <h2>
            projects
        </h2>
        <h2>
            billing
        </h2>
    </div>
    
</div>

<style>

    .client_dashboard {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 1rem;
        gap: 1rem;
        width: 100%;
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

    @media screen and (max-width: 1440px) {
        table > tr > td {
            font-size: 1.175rem;
            padding: 0.25rem 0.5rem;
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