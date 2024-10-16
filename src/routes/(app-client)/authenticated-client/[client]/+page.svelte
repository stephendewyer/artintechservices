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
    import ProfilePhotoDefault from "$lib/images/default/default_profile_photo.jpg";

    let clientEmail = $page.data.streamed.user?.email;

    let clientProfileData: ClientProfile;

    let dateCreated: string;

    let contactInfoAdded: boolean = false;

    let pendingClientProfileData: boolean = false;

    let getClientProfileDataSuccess: boolean | null = null;

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
    let zipCodeInputValue: number | null | string = null;
    let countryInputValue: string = "";
    let profileImageSrc: string = "";

    const getClientProfileData = async () => {
        pendingClientProfileData = true;
        const response = await fetch("/authenticated-client/api/getClientProfileData", {
            method: "POST",
            body: JSON.stringify({
                clientEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        clientProfileData = await response.json();
        // console.log(clientProfileData);

        if (response.ok) {
            if (clientProfileData.street_address) {
                contactInfoAdded = true;
            } else if (!clientProfileData.street_address) {
                contactInfoAdded = false;
            };
            dateCreated = new Date(clientProfileData?.date_created).toUTCString();
            nameFirstInputValue = clientProfileData?.name_first ? clientProfileData?.name_first : "";
            nameLastInputValue = clientProfileData?.name_last ? clientProfileData?.name_last : "";
            emailInputValue = clientProfileData?.email ? clientProfileData?.email : "";
            companyInputValue = clientProfileData?.company ? clientProfileData?.company : "";
            phoneInputValue = clientProfileData?.phone_number ? clientProfileData?.phone_number : "";
            URLInputValue = clientProfileData?.URL ? clientProfileData?.URL : "";
            streetAddressInputValue = clientProfileData?.street_address ? clientProfileData?.street_address : "";
            streetAddress02InputValue = clientProfileData?.street_address_02 ? clientProfileData?.street_address_02 : "";
            cityInputValue = clientProfileData?.city ? clientProfileData?.city : "";
            stateInputValue = clientProfileData?.state ? clientProfileData?.state : "";
            zipCodeInputValue = clientProfileData?.zip_code ? clientProfileData?.zip_code : "";
            countryInputValue = clientProfileData?.country ? clientProfileData?.country : "";
            pendingClientProfileData = false;
            getClientProfileDataSuccess = true;
        } else if (!response.ok) {
            pendingClientProfileData = false;
            getClientProfileDataSuccess = false;
        };
    };

    onMount(() => {
        getClientProfileData();
    })

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
            if (clientContactInformation?.street_address) {
                contactInfoAdded = true;
            } else if (!clientContactInformation?.street_address) {
                contactInfoAdded = false;
            };
            nameFirstInputValue = clientContactInformation?.name_first ? clientContactInformation?.name_first : "";
            nameLastInputValue = clientContactInformation?.name_last ? clientContactInformation?.name_last : "";
            emailInputValue = clientContactInformation?.email ? clientContactInformation?.email : "";
            companyInputValue = clientContactInformation?.company ? clientContactInformation?.company : "";
            phoneInputValue = clientContactInformation?.phone_number ? clientContactInformation?.phone_number : "";
            URLInputValue = clientContactInformation?.URL ? clientContactInformation?.URL : "";
            streetAddressInputValue = clientContactInformation?.street_address ? clientContactInformation?.street_address : "";
            streetAddress02InputValue = clientContactInformation?.street_address_02 ? clientContactInformation?.street_address_02 : "";
            cityInputValue = clientContactInformation?.city ? clientContactInformation?.city : "";
            stateInputValue = clientContactInformation?.state ? clientContactInformation?.state : "";
            zipCodeInputValue = clientContactInformation?.zip_code ? clientContactInformation?.zip_code : "";
            countryInputValue = clientContactInformation?.country ? clientContactInformation?.country : "";
            pendingClientContactInformation = false;
            getClientContactInformationSuccess = true;
        } else if (!response.ok) {
            pendingClientContactInformation = false;
            getClientContactInformationSuccess = false;
        };

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
	<title>Art in Tech Services - {clientProfileData?.name_first} {clientProfileData?.name_last} profile</title>
	<meta name="description" content="client portal" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="client_profile">
    {#if (pendingClientProfileData)}
        <LoadingSpinner />
    {:else if (!pendingClientProfileData)}
        <h1>
            welcome, {clientProfileData?.name_first} {clientProfileData?.name_last}
        </h1>
        <table class="dates">
            <colgroup>
                <col style="width: 30%" />
                <col style="width: 70%" />
            </colgroup>
            <tbody>
                <tr>
                    <td>
                        last login:
                    </td>
                    <td>
                        {new Date(clientProfileData?.last_login).toUTCString()}
                    </td>
                </tr>
                <tr>
                    <td>
                        account created:
                    </td>
                    <td>
                        {new Date(clientProfileData?.date_created).toUTCString()}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="profile_photo_section">
            <h2>
                profile photo
            </h2>
            <div class="profile_photo_and_action_button">
                <div class="profile_photo">
                    <img 
                        src={ProfilePhotoDefault} 
                        alt={"The Art of Living, 1967, by René Magritte" } 
                    />
                </div>
                <EditButton>
                    change image
                </EditButton>
            </div>
        </div>
        <div class="contact_details_section">
            <h2>
                contact details
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
                        values={clientProfileData}
                        bind:contactValuesSaved={contactValuesSaved}
                        bind:cancelClicked={cancelClicked}
                    />
                {/if}
            {:else if (contactInfoAdded && !addContactDetails)}
                {#if (pendingClientContactInformation)}
                    <LoadingSpinner />
                {:else if (!pendingClientContactInformation && editContactDetailsClicked && !addContactDetails)}
                    <ClientContactInfoForm 
                        values={clientProfileData} 
                        bind:contactValuesSaved={contactValuesSaved}
                        bind:cancelClicked={cancelClicked}
                    />
                {:else if (!pendingClientContactInformation && !editContactDetailsClicked && !addContactDetails)}
                    <div class="contact_info_tables">
                        <table class="contact_details">
                            <colgroup>
                                <col style="width: 30%" />
                                <col style="width: 70%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>
                                        first name: 
                                    </td>
                                    <td>
                                        {nameFirstInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        last name:
                                    </td>
                                    <td>
                                        {nameLastInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        company:
                                    </td>
                                    <td>
                                        {companyInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        phone:
                                    </td>
                                    <td>
                                        {phoneInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        email:
                                    </td>
                                    <td>
                                        {emailInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        URL:
                                    </td>
                                    <td>
                                        <a href={URLInputValue} target="_blank">
                                            {URLInputValue}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="contact_details">
                            <colgroup>
                                <col style="width: 30%" />
                                <col style="width: 70%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>
                                        street address: 
                                    </td>
                                    <td>
                                        {streetAddressInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        apartment/unit:
                                    </td>
                                    <td>
                                        {streetAddress02InputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        city:
                                    </td>
                                    <td>
                                        {cityInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        state:
                                    </td>
                                    <td>
                                        {stateInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        zip code:
                                    </td>
                                    <td>
                                        {zipCodeInputValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        country:
                                    </td>
                                    <td>
                                        {countryInputValue}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <EditButton bind:editClicked={editContactDetailsClicked}>
                        edit
                    </EditButton>
                {/if}
            {/if}
        </div>
    {/if}
</div>

<style>

    .client_profile {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
        padding: 0 0 1rem 0;
    }

    .profile_photo_section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .profile_photo_and_action_button {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .profile_photo {
        width: 12rem;
        height: 12rem;
    }

    .profile_photo > img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    .contact_details_section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .contact_info_tables {
        display: flex;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 0 1rem;
    }

    .dates {
        width: 100%;
        max-width: 40rem;
    }


    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
    }    

    table > tbody > tr {
        height: auto;
        padding: 0;
    }

    table > tbody> tr > td {
        font-size: 1.25rem;
        padding: 0.25rem 1rem;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    table > tbody > tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    @media screen and (max-width: 1440px) {
        table > tbody > tr > td {
            font-size: 1.175rem;
            padding: 0.25rem 0.5rem;
        }
    }

    @media screen and (max-width: 1080px) {

        table > tbody > tr > td {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
        }

    }

    @media screen and (max-width: 720px) {

    }
</style>