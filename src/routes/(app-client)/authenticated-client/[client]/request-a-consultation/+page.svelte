<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import ConsultationIcon from "$lib/images/icons/process/process_01.svg?raw";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import DateInput from "$lib/components/inputs/DateInput.svelte";
    import TextArea from "$lib/components/inputs/TextArea.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import TimeInput from "$lib/components/inputs/TimeInput.svelte";
    import SelectInput from "$lib/components/inputs/SelectInput.svelte";
    import TimeZones from "$lib/data/timeZones.json";
    import { goto } from "$app/navigation";
    import BackButton from "$lib/components/buttons/BackButton.svelte";
    import TextInput from "$lib/components/inputs/TextInput.svelte";

    // sort time zones by alphabetical order

    export let data;

    const userEmail: string | undefined | null = data.streamed.user?.email;

    const TimeZonesSorted = TimeZones.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    let consultationDate: string = "";
    let consultationTime: string = "";
    let consultationTimeZone: string = "";
    let consultationTopic: string = "";
    let consultationReason: string = "";

    let consultationDateIsValid: boolean = true;
    let consultationTimeIsValid: boolean = true;
    let consultationTimeZoneIsValid: boolean = true;
    let consultationTopicIsValid: boolean = true;
    let consultationReasonIsValid: boolean = true;

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
    }

    async function createConsultationRequest (
        userEmail: string | undefined | null,
        consultationDate: string,
        consultationTime: string,
        consultationTimeZone: string,
        consultationTopic: string,
        consultationReason: string
    ) {	
        const response = await fetch("/authenticated-client/api/sendClientConsultationRequest", {

            method: 'POST',
            body: JSON.stringify({
                userEmail,
                consultationDate,
                consultationTime,
                consultationTimeZone,
                consultationTopic,
                consultationReason
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const sendClientConsultationRequestHandler = async () => {
        pending = true;

        try {

            await createConsultationRequest(
                userEmail,
                consultationDate,
                consultationTime,
                consultationTimeZone,
                consultationTopic,
                consultationReason
            )

            if (responseItem.success) {
                consultationDate = "";
                consultationTime = "";
                consultationTimeZone = "";
                consultationTopic = "";
                consultationReason = "";
                goto("/authenticated-client/client");
            }

            if (responseItem.error) {

                if (consultationDate === "") {
                    consultationDateIsValid = false;
                } else if (consultationDate !== "") {
                    consultationDateIsValid = true;
                }

                if (consultationTime === "") {
                    consultationTimeIsValid = false;
                } else if (consultationTime !== "") {
                    consultationTimeIsValid = true;
                }

                if (consultationTimeZone === "") {
                    consultationTimeZoneIsValid = false;
                } else if (consultationTimeZone !== "") {
                    consultationTimeZoneIsValid = true;
                }

                if (consultationTopic === "") {
                    consultationTopicIsValid = false;
                } else if (consultationTopic !== "") {
                    consultationTopicIsValid = true;
                }

                if (consultationReason === "") {
                    consultationReasonIsValid = false;
                } else if (consultationReason !== "") {
                    consultationReasonIsValid = true;
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    }
</script>
<svelte:head>
	<title>Art in Tech Services - request a consultation</title>
	<meta name="description" content="request a consultation" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<div class="page">
    <form 
        class="form" 
        on:submit|preventDefault={sendClientConsultationRequestHandler}
    >
        <a 
            href="/authenticated-client/client" 
            class="back_button_container"
        >
            <BackButton>
                back
            </BackButton>
        </a>
        <h1>
            request a consultation 
        </h1>
        <div class="consultation_icon">
            {@html ConsultationIcon}
        </div>
        <p>We recommend scheduling a consultation before starting a project.  During a consultation, we help you plan your project for success.</p>
        <table>
            <colgroup>
                <col style="width:30%">
                <col style="width:70%">
            </colgroup>
            <tbody>
                <tr>
                    <td class="table_heading">
                        hours:
                    </td>
                    <td>
                        9 a.m. and 4 p.m. U.S. Mountain Standard Time Monday through Friday except for holidays.
                    </td>
                </tr>
                <tr>
                    <td class="table_heading">
                        fee:
                    </td>
                    <td>
                        Consultations are free.
                    </td>
                </tr>
                <tr>
                    <td class="table_heading">
                        location:
                    </td>
                    <td>
                        Remote or in-person.
                    </td>
                </tr>
            </tbody>
        </table>
        <h4 class="indicates_required_heading">*indicates required</h4>
        <div class="inputs_row">
            <div class="input_column">
                <DateInput
                    inputID="consultation_date"
                    inputName="consultation_date"
                    inputLabel={true}
                    bind:dateInputValue={consultationDate}
                    bind:isValid={consultationDateIsValid}
                    dateInputErrorMessage="consultation date required"
                    required={true}
                >
                    consultation date*
                </DateInput>
            </div>
            <div class="input_column">
                <TimeInput
                    inputID="consultation_time"
                    inputName="consultation_time"
                    inputLabel={true}
                    bind:timeInputValue={consultationTime}
                    bind:isValid={consultationTimeIsValid}
                    timeInputErrorMessage="consultation time required"
                    required={true}
                >
                    consultation time*
                </TimeInput>
            </div>
            <div class="input_column">
                <SelectInput 
                    inputID="time_zome"
                    inputName="time_zone"
                    inputLabel={true}
                    bind:selectInputValue={consultationTimeZone}
                    bind:isValid={consultationTimeZoneIsValid}
                    selectInputErrorMessage="time zone required"
                    options={TimeZonesSorted}
                    required={true}
                >
                    time zone*
                </SelectInput>
            </div>
        </div>
        <div class="inputs_row">
            <TextInput 
                placeholder="need help with software"
                inputID="consultation_topic"
                inputName="consultation_topic"
                inputLabel={true}
                bind:textInputValue={consultationTopic}
                bind:isValid={consultationTopicIsValid}
                textInputErrorMessage="consultation topic required"
                required={false}
            >
                what is your consultation topic?*
            </TextInput>
        </div>
        <div class="inputs_row">
            <TextArea
                placeholder="I want a consultation about a project I have that ..."
                inputID="consultation_reason"
                inputName="consultation_reason"
                inputLabel={true}
                bind:textareaInputValue={consultationReason}
                bind:isValid={consultationReasonIsValid}
                textAreaInputErrorMessage="consultation reason required"
                required={true}
            >
                what is the reason for the consultation?*
            </TextArea>
        </div>
        <p>
            After you request a consultation, a representative from Art in Tech Services will contact you within 48 hours to schedule your consultation.
        </p>
        <div class="buttons_container">
            <SubmitButton disable={false}>
                send request
            </SubmitButton>
        </div>
    </form>
    {#if (pending)}
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
</div>
<style>

    .form {
        position: relative;
        width: 100%;
        max-width: 50rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 1rem;
    }

    .back_button_container {
        position: absolute;
        left: 0;
        top: 0;
    }

    .consultation_icon {
        width: 12rem;
        height: 12rem;
    }

    table {
        border-spacing: 0;
        table-layout: fixed;
    }

    tbody > tr {
        height: auto;
        padding: 0;
    }

    tbody > tr > td {
        padding: 0.5rem 1rem;
        margin: 0;
    }

    .table_heading {
        font-weight: bold;
    }

    tbody tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    .buttons_container {
        display: flex;
        gap: 1rem;
        flex-direction: row;
        align-items: center;
    }

    @media screen and (max-width: 720px) {
        .back_button_container {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }
    }

</style>