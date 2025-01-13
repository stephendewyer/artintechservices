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
    import ImageFileInput from "$lib/components/inputs/ImageFileInput.svelte";
    import CloseButton from "$lib/components/buttons/CloseButton.svelte";
    import SubmitButton02 from "$lib/components/buttons/SubmitButton02.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import { ClientProfileImageUpdatedStore } from "$lib/stores/ClientProfileImageUpdatedStore";

    let clientEmail = $page.data.streamed.user?.email;

    let clientProfileData: ClientProfile;

    let dateCreated: string = "";

    let contactInfoAdded: boolean = false;

    let pendingClientProfileData: boolean = false;

    let getClientProfileDataSuccess: boolean | null = null;

    let clientID: number | null = null;
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

    let image_ID: number | null = null;
    let image_URL: string = "";
    let alt_text: string = "";
    let public_ID: string = "";

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
            clientID = clientProfileData?.user_ID ? clientProfileData?.user_ID : null;
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
            public_ID = clientProfileData?.public_ID ? clientProfileData?.public_ID : "";
            alt_text = clientProfileData?.alt_text ? clientProfileData?.alt_text : "The Art of Living, 1967, by René Magritte";
            image_URL = clientProfileData?.image_URL ? clientProfileData?.image_URL : ProfilePhotoDefault;
            image_ID = clientProfileData?.image_ID ? clientProfileData?.image_ID : null;
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

    let changeImageClicked: boolean = false;

    let imageFileInputValue: string = "";
    let image: any;
    let imageFileIsValid: boolean = true;
    let imageInputElement: HTMLInputElement;
    let imageInputFiles: FileList | null = null;
    let cancelImageUpload: boolean = false;

    $: if (cancelImageUpload) {
        imageInputElement.value = "";
        image = null;
        imageInputFiles = null;
        imageFileInputValue = "";
        cancelImageUpload = false;
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

    let cancelImageSelect: boolean = false;

    $: if (cancelImageSelect) {
        changeImageClicked = false;
        cancelImageSelect = false;
    };

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
        }, 4000)
    };

    let pendingUploadedImage: boolean = false;

    const getUploadedClientProfileImage = async () => {

        pendingUploadedImage = true;

        try {
            const response = await fetch("/authenticated-client/api/getUploadedClientProfileImage", {
                method: "POST",
                body: JSON.stringify({
                    clientEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const uploadedImage = await response.json();

            if (response.ok) {
                image_URL = uploadedImage.client_profile_image_URL ? uploadedImage.client_profile_image_URL : ProfilePhotoDefault;
                image_ID = uploadedImage.client_profile_image_ID ? uploadedImage.client_profile_image_ID : null;
                public_ID = uploadedImage.client_profile_image_public_ID ? uploadedImage.client_profile_image_public_ID : "";
                image = "";
                imageFileInputValue = "";
            };

        } catch (err) {
            console.log(err);
        };

        pendingUploadedImage = false;

    };


    let pendingImageUpload: boolean = false;

    const uploadImageSubmitHandler = async () => {
        pendingImageUpload = true;
        try {
            const response = await fetch("/authenticated-client/api/uploadProfileImage", {
                method: "POST",
                body: JSON.stringify({
                    clientEmail,
                    imageFileInputValue,
                    image,
                    public_ID,
                    image_ID,
                    clientID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            responseItem = await response.json();

            if (responseItem.success) {
                $ClientProfileImageUpdatedStore = true;
                changeImageClicked = false;
                getUploadedClientProfileImage();
            };

        } catch (err) {
            console.log(err);
        };

    };

    $: if((responseItem.success) || (responseItem.error)) {
        pendingImageUpload = false;
    };
    
</script>

<svelte:head>
	<title>Art in Tech Services - client profile</title>
	<meta name="description" content="client portal" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="client_profile">
    {#if (pendingClientProfileData)}
        <LoadingSpinner />
    {:else if (!pendingClientProfileData)}
        <h1>
            welcome, {clientProfileData?.name_first} {clientProfileData?.name_last}!
        </h1>
        <div class="profile_photo_and_dates">
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
                {#if changeImageClicked}
                    <form on:submit|preventDefault={uploadImageSubmitHandler} class="upload_profile_photo_form">
                        <ImageFileInput
                            inputLabel={true}
                            bind:imageFileInputValue={imageFileInputValue}
                            bind:image={image}
                            placeholder="/image.jpg"
                            inputName="project_image_file"
                            inputID="project_image_file"
                            bind:isValid={imageFileIsValid}
                            bind:files={imageInputFiles}
                            bind:imageFileInputElement={imageInputElement}
                            required={false}
                            imageFileInputErrorMessage="image file required"
                        >
                            select
                        </ImageFileInput>
                        {#if (image)}
                            <div class="project_image_container">
                                <img src={image} alt="project"/>
                                <div class="cancel_button_container">
                                    <CloseButton bind:closeButtonClicked={cancelImageUpload} />
                                </div>
                            </div>
                        {/if}
                        <p class="constraints">* file formats accepted: JPG, PNG, GIF, jpg, png, gif</p>
                        <p class="constraints">* maximum file size: 2MB</p>
                        <SubmitButton02 disable={!imageFileInputValue}>
                            upload image
                        </SubmitButton02>
                        <CancelButton bind:cancelClicked={cancelImageSelect}>
                            cancel
                        </CancelButton>    
                    </form>
                    {#if (pendingImageUpload)}
                        <PendingFlashMessage >
                            uploading profile image
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
                {:else}
                    <div class="profile_photo_and_action_button">
                        {#if pendingUploadedImage}
                            <LoadingSpinner />
                        {:else}
                            <div class="profile_photo">
                                <img 
                                    src={image_URL} 
                                    alt={"The Art of Living, 1967, by René Magritte"} 
                                />
                                <div class="change_profile_photo_button_container">
                                    <EditButton bind:editClicked={changeImageClicked}>
                                        change image
                                    </EditButton>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}
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
        padding: 0 1rem 1rem 1rem;
    }

    .profile_photo_and_dates {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
    }

    .dates {
        max-width: 40rem;
        width: 100%;
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .profile_photo_section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        width: 60%;
        min-width: 20rem;
    }

    .upload_profile_photo_form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .profile_photo_and_action_button {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        gap: 1rem;
        width: 20rem;
        height: 20rem;
    }

    .profile_photo {
        width: 100%;
        height: 100%;
    }

    .profile_photo > img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    .change_profile_photo_button_container {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
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
    }

    .contact_details {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
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

    .project_image_container {
        position: relative;
        width: 20rem;
        height: 20rem;
    }

    .project_image_container > img  {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .cancel_button_container {
        position: absolute;
        right: 1rem;
        top: 1rem;
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

        .contact_info_tables {
            flex-direction: column;
        }

    }
</style>