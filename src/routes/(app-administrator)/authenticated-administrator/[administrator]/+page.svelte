<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import EditButton from "$lib/components/buttons/EditButton.svelte";
    import { onMount } from "svelte";
    import type { E164Number } from 'svelte-tel-input/types';
    import AdministratorContactInfoForm from "$lib/components/forms/AdministratorContactInfoForm.svelte";
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
    import { AdministratorProfileImageUpdatedStore } from "$lib/stores/AdministratorProfileImageUpdatedStore";

    let administratorEmail = $page.data.streamed.user?.email;

    let administratorProfileData: AdministratorProfile;

    let dateCreated: string = "";

    let contactInfoAdded: boolean = false;

    let pendingAdministratorProfileData: boolean = false;

    let getAdministratorProfileDataSuccess: boolean | null = null;

    let administratorID: number | null = null;
    let userNameInputValue: string = "";
    let nameFirstInputValue: string = "";
    let nameLastInputValue: string = "";
    let phoneInputValue: E164Number | string | number | null = null;
    let companyInputValue: string = "";
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

    const getAdministratorProfileData = async () => {
        pendingAdministratorProfileData = true;
        const response = await fetch("/authenticated-administrator/api/getAdministratorProfileData", {
            method: "POST",
            body: JSON.stringify({
                administratorEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        administratorProfileData = await response.json();
        // console.log(administratorProfileData);

        if (response.ok) {
            if (administratorProfileData.street_address) {
                contactInfoAdded = true;
            } else if (!administratorProfileData.street_address) {
                contactInfoAdded = false;
            };
            dateCreated = new Date(administratorProfileData?.date_created).toUTCString();
            administratorID = administratorProfileData?.ID ? administratorProfileData?.ID : null;
            userNameInputValue = administratorProfileData?.username ? administratorProfileData?.username : "";
            nameFirstInputValue = administratorProfileData?.name_first ? administratorProfileData?.name_first : "";
            nameLastInputValue = administratorProfileData?.name_last ? administratorProfileData?.name_last : "";
            phoneInputValue = administratorProfileData?.phone_number ? administratorProfileData?.phone_number : "";
            streetAddressInputValue = administratorProfileData?.street_address ? administratorProfileData?.street_address : "";
            streetAddress02InputValue = administratorProfileData?.street_address_02 ? administratorProfileData?.street_address_02 : "";
            cityInputValue = administratorProfileData?.city ? administratorProfileData?.city : "";
            stateInputValue = administratorProfileData?.state ? administratorProfileData?.state : "";
            zipCodeInputValue = administratorProfileData?.zip_code ? administratorProfileData?.zip_code : "";
            countryInputValue = administratorProfileData?.country ? administratorProfileData?.country : "";
            public_ID = administratorProfileData?.public_ID ? administratorProfileData?.public_ID : "";
            alt_text = administratorProfileData?.alt_text ? administratorProfileData?.alt_text : "The Art of Living, 1967, by René Magritte";
            image_URL = administratorProfileData?.image_URL ? administratorProfileData?.image_URL : ProfilePhotoDefault;
            image_ID = administratorProfileData?.image_ID ? administratorProfileData?.image_ID : null;
            pendingAdministratorProfileData = false;
            getAdministratorProfileDataSuccess = true;
        } else if (!response.ok) {
            pendingAdministratorProfileData = false;
            getAdministratorProfileDataSuccess = false;
        };
    };

    onMount(() => {
        getAdministratorProfileData();
    })

    let pendingAdministratorContactInformation: boolean = false;

    let getAdministratorContactInformationSuccess: boolean | null = null;

    let administratorContactInformation: any;

    const getAdministratorContactInformation = async () => {
        pendingAdministratorContactInformation = true;
        const response = await fetch("/authenticated-administrator/api/getAdministratorContactInformation", {
            method: "POST",
            body: JSON.stringify({
                administratorEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        administratorContactInformation = await response.json();

        if (response.ok) {
            if (administratorContactInformation?.street_address) {
                contactInfoAdded = true;
            } else if (!administratorContactInformation?.street_address) {
                contactInfoAdded = false;
            };
            userNameInputValue = administratorContactInformation?.username ? administratorContactInformation?.username : "";
            nameFirstInputValue = administratorContactInformation?.name_first ? administratorContactInformation?.name_first : "";
            nameLastInputValue = administratorContactInformation?.name_last ? administratorContactInformation?.name_last : "";
            companyInputValue = administratorContactInformation?.company ? administratorContactInformation?.company : "";
            phoneInputValue = administratorContactInformation?.phone_number ? administratorContactInformation?.phone_number : "";
            streetAddressInputValue = administratorContactInformation?.street_address ? administratorContactInformation?.street_address : "";
            streetAddress02InputValue = administratorContactInformation?.street_address_02 ? administratorContactInformation?.street_address_02 : "";
            cityInputValue = administratorContactInformation?.city ? administratorContactInformation?.city : "";
            stateInputValue = administratorContactInformation?.state ? administratorContactInformation?.state : "";
            zipCodeInputValue = administratorContactInformation?.zip_code ? administratorContactInformation?.zip_code : "";
            countryInputValue = administratorContactInformation?.country ? administratorContactInformation?.country : "";
            pendingAdministratorContactInformation = false;
            getAdministratorContactInformationSuccess = true;
        } else if (!response.ok) {
            pendingAdministratorContactInformation = false;
            getAdministratorContactInformationSuccess = false;
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
        getAdministratorContactInformation();
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

    const getUploadedAdministratorProfileImage = async () => {

        pendingUploadedImage = true;

        try {
            const response = await fetch("/authenticated-administrator/api/getUploadedAdministratorProfileImage", {
                method: "POST",
                body: JSON.stringify({
                    administratorEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const uploadedImage = await response.json();

            if (response.ok) {
                image_URL = uploadedImage.administrator_profile_image_URL ? uploadedImage.administrator_profile_image_URL : ProfilePhotoDefault;
                image_ID = uploadedImage.administrator_profile_image_ID ? uploadedImage.administrator_profile_image_ID : null;
                public_ID = uploadedImage.administrator_profile_image_public_ID ? uploadedImage.administrator_profile_image_public_ID : "";
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
            const response = await fetch("/authenticated-administrator/api/uploadProfileImage", {
                method: "POST",
                body: JSON.stringify({
                    administratorEmail,
                    imageFileInputValue,
                    image,
                    public_ID,
                    image_ID,
                    administratorID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            responseItem = await response.json();

            if (responseItem.success) {
                $AdministratorProfileImageUpdatedStore = true;
                changeImageClicked = false;
                getUploadedAdministratorProfileImage();
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
	<title>Art in Tech Services - {administratorProfileData?.username} profile</title>
	<meta name="description" content="administrator portal" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="administrator_profile">
    {#if (pendingAdministratorProfileData)}
        <LoadingSpinner />
    {:else if (!pendingAdministratorProfileData)}
        <h1>
            welcome, {administratorProfileData?.username}!
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
                            {new Date(administratorProfileData?.last_login).toUTCString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            account created:
                        </td>
                        <td>
                            {new Date(administratorProfileData?.date_created).toUTCString()}
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
                {#if (pendingAdministratorContactInformation)}
                    <LoadingSpinner />
                {:else if (!pendingAdministratorContactInformation)}
                    <AdministratorContactInfoForm 
                        values={administratorProfileData}
                        bind:contactValuesSaved={contactValuesSaved}
                        bind:cancelClicked={cancelClicked}
                    />
                {/if}
            {:else if (contactInfoAdded && !addContactDetails)}
                {#if (pendingAdministratorContactInformation)}
                    <LoadingSpinner />
                {:else if (!pendingAdministratorContactInformation && editContactDetailsClicked && !addContactDetails)}
                    <AdministratorContactInfoForm 
                        values={administratorProfileData} 
                        bind:contactValuesSaved={contactValuesSaved}
                        bind:cancelClicked={cancelClicked}
                    />
                {:else if (!pendingAdministratorContactInformation && !editContactDetailsClicked && !addContactDetails)}
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
                                        username:
                                    </td>
                                    <td>
                                        {userNameInputValue}
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
                                        {administratorEmail}
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
        <div class="reset_password_section">
            <h2>
                reset password
            </h2>
        </div>
    {/if}
</div>

<style>

    .administrator_profile {
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