<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import ConsultationIcon from "$lib/images/icons/process/process_01.svg?raw";
  import EditButton from "$lib/components/buttons/EditButton.svelte";
  import DeleteButton from "$lib/components/buttons/DeleteButton.svelte";

    export let data;

    const consultation: Consultation | undefined = data.consultationRow;

    let consultationRequestCreatedDate: string = "";

    if (consultation?.date_created) {
        consultationRequestCreatedDate = new Date(consultation?.date_created).toUTCString().slice(0, 16);
    };

    let consultationDate: string = "";
    if (consultation?.consultation_date) {
        consultationDate = new Date(consultation?.consultation_date).toUTCString().slice(0, 16);
    };

    let deleteButtonClickedHandler: boolean = false;

    $: if (deleteButtonClickedHandler) {
        // handle delete consultation clicked
    };

    let editButtonClickedHandler: boolean = false;

    $: if (editButtonClickedHandler) {
        // handle edit button clicked
    };
    
</script>

<svelte:head>
	<title>Art in Tech Services - consultation</title>
	<meta name="description" content="consultation" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <div class="consultation">
        <div class="consultation_banner">
            {@html ConsultationIcon}
        </div>
        <h1>consultation request</h1> 
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
                    {consultation?.consultation_time} {consultation?.time_zone}
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
                <EditButton bind:editClicked={editButtonClickedHandler}>
                    edit consultation
                </EditButton>
                <DeleteButton bind:clicked={deleteButtonClickedHandler}>
                    cancel consultation request
                </DeleteButton>
            </div>
        {/if}
    </div>
</div>
<style>

    .consultation {
        max-width: 60rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin: 0 0 4rem 0;
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

        .left_table_column {
            width: 40%;
        }

        .right_table_column {
            width: 60%;
        }
    }
</style>