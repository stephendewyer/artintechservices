<script lang="ts">
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import DateInput from "$lib/components/inputs/DateInput.svelte";
    import TextArea from "$lib/components/inputs/TextArea.svelte";
    import TimeInput from "$lib/components/inputs/TimeInput.svelte";
    import SelectInput from "$lib/components/inputs/SelectInput.svelte";
    import TimeZones from "$lib/data/timeZones.json";
    import { ConvertDateInputFormat } from "$lib/util/convertDateInputFormat";
    import SubmitButton02 from "$lib/components/buttons/SubmitButton02.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    
    export let consultation: Consultation | undefined;
    export let cancelEditConsultation: boolean = false;
    export let data;
    export let consultationRequestUpdated: boolean = false;

    const userEmail: string | undefined | null = data.streamed.user?.email;

    let consultationRequestID: number | undefined = consultation?.request_ID;

    const TimeZonesSorted = TimeZones.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    let consultationDate: string = consultation?.consultation_date ? ConvertDateInputFormat(new Date(consultation?.consultation_date)) : "";
    let consultationTime: string = consultation?.consultation_time ? consultation?.consultation_time : "";
    let consultationTimeZone: string = consultation?.time_zone ? consultation?.time_zone : "";
    let consultationReason: string = consultation?.consultation_reason ? consultation?.consultation_reason : "";

    let consultationDateIsValid: boolean = true;
    let consultationTimeIsValid: boolean = true;
    let consultationTimeZoneIsValid: boolean = true;
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
    };

    async function updateConsultationRequest (
        consultationRequestID: number | undefined,
        userEmail: string | undefined | null,
        consultationDate: string,
        consultationTime: string,
        consultationTimeZone: string,
        consultationReason: string
    ) {	
        const response = await fetch("/authenticated-client/api/updateClientConsultationRequest", {

            method: 'PATCH',
            body: JSON.stringify({
                consultationRequestID,
                userEmail,
                consultationDate,
                consultationTime,
                consultationTimeZone,
                consultationReason
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const updateClientConsultationRequestHandler = async () => {
        pending = true;

        try {

            await updateConsultationRequest(
                consultationRequestID,
                userEmail,
                consultationDate,
                consultationTime,
                consultationTimeZone,
                consultationReason
            );

            if (responseItem.success) {
                consultationRequestUpdated = true;
                cancelEditConsultation = true;
            };

            if (responseItem.error) {
                consultationRequestUpdated = false;
                if (consultationDate === "") {
                    consultationDateIsValid = false;
                } else if (consultationDate !== "") {
                    consultationDateIsValid = true;
                };

                if (consultationTime === "") {
                    consultationTimeIsValid = false;
                } else if (consultationTime !== "") {
                    consultationTimeIsValid = true;
                };

                if (consultationTimeZone === "") {
                    consultationTimeZoneIsValid = false;
                } else if (consultationTimeZone !== "") {
                    consultationTimeZoneIsValid = true;
                };

                if (consultationReason === "") {
                    consultationReasonIsValid = false;
                } else if (consultationReason !== "") {
                    consultationReasonIsValid = true;
                };
            };
        } catch (error) {
            console.log(error);
        };

    };

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };
</script>

<div class="consultation_form">
    <form class="form" on:submit|preventDefault={updateClientConsultationRequestHandler}>
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
            <CancelButton bind:cancelClicked={cancelEditConsultation}>
                cancel
            </CancelButton>
            <SubmitButton02 disable={false}>
                {#if (consultation)}
                    update consultation
                {:else if (!consultation)}
                    send request
                {/if}
            </SubmitButton02>
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

    .buttons_container {
        display: flex;
        gap: 1rem;
        flex-direction: row;
        align-items: center;
    }

    @media screen and (max-width: 720px) {
        .buttons_container {
            flex-direction: column-reverse;
        }
    }

</style>