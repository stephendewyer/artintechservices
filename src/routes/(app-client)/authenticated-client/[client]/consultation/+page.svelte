<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import ConsultationIcon from "$lib/images/icons/process/process_01.svg?raw";
    import EditButton from "$lib/components/buttons/EditButton.svelte";
    import DeleteButton from "$lib/components/buttons/DeleteButton.svelte";
    import { DeleteConfirmedStore } from "$lib/stores/DeleteConfirmedStore.js";
    import { DeleteConfirmationStore } from "$lib/stores/DeleteConfirmationStore.js";
    import { ModalOpenStore } from "$lib/stores/ModalOpenStore.js";
    import { goto } from "$app/navigation";
    import { ConvertTimeToStandard } from "$lib/util/convertTimeToStandard";
    import ConsultationForm from "$lib/components/forms/ConsultationForm.svelte";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import BackButton from "$lib/components/buttons/BackButton.svelte";

    export let data;

    let editConsultationRequest: boolean = false;

    let consultation: Consultation | undefined = data.consultationRow;

    let consultationRequestCreatedDate: string = "";

    if (consultation?.date_created) {
        consultationRequestCreatedDate = new Date(consultation?.date_created).toUTCString().slice(0, 16);
    };

    let consultationDate: string = "";
    if (consultation?.consultation_date) {
        consultationDate = new Date(consultation?.consultation_date).toUTCString().slice(0, 16);
    };

    interface DeleteItem {
        message: string;
        data: number;
    }

    const consultationRequestID: number | undefined = consultation?.request_ID;

    const deleteConsultationHandler = async (consultation: Consultation | undefined) => {

        $ModalOpenStore = true;

        const consultationData: DeleteItem | any = {
            message: "consultation request",
            data: consultationRequestID
        };

        $DeleteConfirmationStore = consultationData;

    };

    const confirmedDeleteConsultation = async (consultation: Consultation | undefined) => {

        const response = await fetch("/authenticated-client/api/deleteConsultation", {
            method: "DELETE",
            body: JSON.stringify({
                consultation
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let deleteResponse;
        deleteResponse = await response.json();

        if (deleteResponse.success) {
            goto("/authenticated-client/client");
        } else if (deleteResponse.error) {
            console.log("consultation failed to delete");
        };
    };

    $: if ($DeleteConfirmedStore === true) {
        confirmedDeleteConsultation(consultation);
        $DeleteConfirmedStore = false;
    };

    let deleteButtonClickHandler: boolean = false;

    $: if (deleteButtonClickHandler) {
        // handle delete button clicked
        deleteConsultationHandler(consultation);
        deleteButtonClickHandler = false;
    };

    let pendingConsultationRequestUpdate: boolean = false;

    const getConsultationRequestData = async (consultationRequestID: number) => {
        pendingConsultationRequestUpdate = true;
        const response = await fetch("/authenticated-client/api/getConsultationRequest", {
            method: "POST",
            body: JSON.stringify({
                consultationRequestID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            consultation = await response.json();
            pendingConsultationRequestUpdate = false;
        } else if (!response.ok) {
            console.log("failed to refresh consultation request after update");
            pendingConsultationRequestUpdate = false;
        };
    };

    let consultationRequestUpdated: boolean = false;

    $: if (consultationRequestUpdated) {
        editConsultationRequest = false;
        getConsultationRequestData(consultationRequestID);
        consultationRequestUpdated = false;
    };

</script>

<svelte:head>
	<title>Art in Tech Services - consultation</title>
	<meta name="description" content="consultation" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<section class="consultation">
    <a 
        href="/authenticated-client/client/consultations" 
        class="back_button_container"
    >
        <BackButton>
            consultations
        </BackButton>
    </a>
    <div class="consultation_banner">
        {@html ConsultationIcon}
    </div>
    {#if pendingConsultationRequestUpdate}
        <LoadingSpinner />
    {:else if (!pendingConsultationRequestUpdate)}
        <h1>consultation request</h1> 
        {#if !editConsultationRequest}
            <table>
                <colgroup>
                    <col class="left_table_column"/>
                    <col class="right_table_column"/>
                </colgroup>
                <tr>
                    <td>
                        date:
                    </td>
                    <td>
                        {consultationDate}
                    </td>
                </tr>
                <tr>
                    <td>
                        time:
                    </td>
                    <td>
                        {ConvertTimeToStandard(consultation?.consultation_time)} {consultation?.time_zone}
                    </td>
                </tr>
                <tr>
                    <td>
                        status:
                    </td>
                    <td>
                        {consultation?.status}
                    </td>
                </tr>
                <tr>
                    <td>
                        reason:
                    </td>
                    <td>
                        {consultation?.consultation_reason}
                    </td>
                </tr>
                <tr>
                    <td>
                        creation date:
                    </td>
                    <td>
                        {consultationRequestCreatedDate}
                    </td>
                </tr>
            </table>
            {#if (consultation?.status === "requested")}
                <div class="buttons_container">
                    <EditButton bind:editClicked={editConsultationRequest}>
                        edit consultation
                    </EditButton>
                    <DeleteButton bind:clicked={deleteButtonClickHandler}>
                        cancel consultation request
                    </DeleteButton>
                </div>
            {/if}
        {:else if editConsultationRequest}
            <ConsultationForm 
                data={data}
                consultation={consultation}
                bind:cancelEditConsultation={editConsultationRequest}
                bind:consultationRequestUpdated={consultationRequestUpdated}
            />
        {/if}
    {/if}
</section>
<style>

    .consultation {
        position: relative;
        width: 100%;
        max-width: 60rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 0 1rem 1rem 1rem;
    }

    .back_button_container {
        position: relative;
        width: 100%;
    }

    .consultation_banner {
        width: 100%;
        max-width: 20rem;
    }

    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
    }

    table > tr {
        height: auto;
        padding: 0;
    }

    table > tr > td {
        font-size: 1.25rem;
        padding: 1rem;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    table tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    table td:nth-child(odd) {
        font-weight: bold;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    .left_table_column {
        width: 25%;
    }

    .right_table_column {
        width: 75%;
    }

    @media screen and (max-width: 1440px) {
        table > tr > td {
            font-size: 1.175rem;
            padding: 1rem;
        }
    }

    @media screen and (max-width: 1080px) {
        table > tr > td {
            font-size: 1rem;
            padding: 0.5rem;
        }
    }

    @media screen and (max-width: 720px) {

        .consultation {
            padding: 0 1rem;
        }

        .back_button_container {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }

        .left_table_column {
            width: 40%;
        }

        .right_table_column {
            width: 60%;
        }
    }
</style>