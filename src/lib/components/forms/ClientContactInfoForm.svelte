<script lang="ts">
    import TextInput from "$lib/components/inputs/TextInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton02.svelte";
    import type { E164Number } from 'svelte-tel-input/types';
    import PhoneInput from "$lib/components/inputs/PhoneInput.svelte";
    import SelectInput from "$lib/components/inputs/SelectInput.svelte";
    import TextInputReadOnly from "$lib/components/inputs/TextInputReadOnly.svelte";
    import States from "$lib/data/states.titlecase.json";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import NumberInput from "$lib/components/inputs/NumberInput.svelte";
    import Countries from "$lib/data/countries.json";
    import CloseButton from "../buttons/CloseButton.svelte";

    export let values: ClientContactInformation;
    export let contactValuesSaved: boolean = false;
    export let cancelClicked: boolean = false;

    let nameFirstIsValid: boolean = true;
    let nameFirstInputValue: string = values.name_first;

    let nameLastIsValid: boolean = true;
    let nameLastInputValue: string = values.name_last;

    let emailIsValid: boolean = true;
    let emailInputValue: string = values.email;

    let phoneIsValid: boolean = true;
    let phoneInputValue: any = values.phone_number;

    let URLisValid: boolean = true;
    let URLInputValue: string = values.URL;

    let companyIsValid: boolean = true;
    let companyInputValue: string = values.company;

    let streetAddressIsValid: boolean = true;
    let streetAddressInputValue: string = values.street_address;

    let streetAddress02IsValid: boolean = true;
    let streetAddress02InputValue: string = values.street_address_02;

    let cityIsValid: boolean = true;
    let cityInputValue: string = values.city;

    let stateIsValid: boolean = true;
    let stateInputValue: string = values.state;

    let zipCodeIsValid: boolean = true;
    let zipCodeInputValue: any = values.zip_code;

    let countryIsValid: boolean = true;
    let countryInputValue: string = values.country;

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

    let pending: null | boolean = null;

    const submitClientContactInfo = async (
        clientEmail: string,
        nameFirstInputValue: string,
        nameLastInputValue: string,
        emailInputValue: string,
        phoneInputValue: E164Number | string | number | null,
        companyInputValue: string,
        URLInputValue: string,
        streetAddressInputValue: string,
        streetAddress02InputValue: string,
        cityInputValue: string,
        stateInputValue: string,
        zipCodeInputValue: string | number | null,
        countryInputValue: string
    ) => {
        const response = await fetch("/authenticated-client/api/submitClientContactInfo", {
            method: 'POST',
            body: JSON.stringify({
                clientEmail,
                nameFirstInputValue,
                nameLastInputValue,
                emailInputValue,
                phoneInputValue,
                companyInputValue,
                URLInputValue,
                streetAddressInputValue,
                streetAddress02InputValue,
                cityInputValue,
                stateInputValue,
                zipCodeInputValue,
                countryInputValue
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const submitClientContactInfoHandler = async () => {

        pending = true;

        try {
            await submitClientContactInfo(
                values.email,
                nameFirstInputValue,
                nameLastInputValue,
                emailInputValue,
                phoneInputValue,
                companyInputValue,
                URLInputValue,
                streetAddressInputValue,
                streetAddress02InputValue,
                cityInputValue,
                stateInputValue,
                zipCodeInputValue,
                countryInputValue
            );

            if (responseItem.success) {
                console.log("contact values saved");
                contactValuesSaved = true;
            };

            if (responseItem.error) {
                contactValuesSaved = false;
                if (values.email === "") {
                    emailIsValid = false;
                } else if (!values.email.includes('@')) {
                    emailIsValid = false;
                } else if (values.email !== "") {
                    emailIsValid = true;
                };

                if (values.name_first === "") {
                    nameFirstIsValid = false;
                } else if (values.name_first !== "") {
                    nameFirstIsValid = true;
                };

                if (values.name_last === "") {
                    nameLastIsValid = false;
                } else if (values.name_last !== "") {
                    nameLastIsValid = true;
                };

                if (values.phone_number === "" || values.phone_number === null) {
                    phoneIsValid = false;

                } else if (values.phone_number !== "" && values.phone_number !== null) {
                    phoneIsValid = true;
                };

                if (values.street_address === "") {
                    streetAddressIsValid = false;
                };

                if (values.city === "") {
                    cityIsValid = false;
                };

                if (values.state === "") {
                    stateIsValid = false;
                };

                if (!values.zip_code) {
                    zipCodeIsValid = false;
                };

                if (!values.country) {
                    countryIsValid = false;
                };
            };
        } catch (error) {
            console.log(error);
        };
    };

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };

</script>
{#key values}
    <form class="form" on:submit|preventDefault={submitClientContactInfoHandler}>
        <div class="close_button_container">
            <CloseButton bind:closeButtonClicked={cancelClicked}/>
        </div>
        <h4 class="indicates_required_heading">*indicates required</h4>
        <div class="inputs_row">
            <div class="input_column">
                <TextInput 
                    placeholder="myFirstName"
                    inputID="name_first"
                    inputName="name_first"
                    inputLabel={true}
                    bind:textInputValue={nameFirstInputValue}
                    bind:isValid={nameFirstIsValid}
                    textInputErrorMessage="first name required"
                    required={true}
                >
                    first name*
                </TextInput>
            </div>
            <div class="input_column">
                <TextInput 
                    placeholder="myLastName"
                    inputID="name_last"
                    inputName="name_last"
                    inputLabel={true}
                    bind:textInputValue={nameLastInputValue}
                    bind:isValid={nameLastIsValid}
                    textInputErrorMessage="last name required"
                    required={true}
                >
                    last name*
                </TextInput>
            </div>        
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <TextInputReadOnly 
                    placeholder="myEmail@myCompany.com"
                    inputID="email"
                    inputName="email"
                    inputLabel={true}
                    bind:textInputValue={emailInputValue}
                    bind:isValid={emailIsValid}
                    required={true}
                >
                    email*
                </TextInputReadOnly>
            </div>  
            <div class="input_column">
                <TextInput 
                    placeholder="myCompany"
                    inputID="company"
                    inputName="company"
                    inputLabel={true}
                    bind:textInputValue={companyInputValue}
                    bind:isValid={companyIsValid}
                    textInputErrorMessage="company required"
                    required={false}
                >
                    company
                </TextInput>
            </div>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <PhoneInput
                    inputID="phone_number"
                    inputName="phone_number"
                    inputLabel={true}
                    bind:phoneInputValue={phoneInputValue}
                    bind:isValid={phoneIsValid}
                    required={true}
                    phoneInputErrorMessage="phone number required"
                >
                    phone number*
                </PhoneInput>
            </div>
            <div class="input_column">
                <TextInput
                    placeholder="https://mydomain.com"
                    inputID="URL"
                    inputName="URL"
                    inputLabel={true}
                    bind:textInputValue={URLInputValue}
                    bind:isValid={URLisValid}
                    textInputErrorMessage="URL required"
                    required={false}
                >
                    URL
                </TextInput>
            </div>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <TextInput
                    placeholder="1234 myStreet"
                    inputID="street_address"
                    inputName="street_address"
                    inputLabel={true}
                    bind:textInputValue={streetAddressInputValue}
                    bind:isValid={streetAddressIsValid}
                    textInputErrorMessage="street address required"
                    required={true}
                >
                    street address*
                </TextInput>
            </div>
            <div class="input_column">
                <TextInput
                    placeholder="apt. #"
                    inputID="street_address_2"
                    inputName="street_address_2"
                    inputLabel={true}
                    bind:textInputValue={streetAddress02InputValue}
                    bind:isValid={streetAddress02IsValid}
                    textInputErrorMessage="street address 2 required"
                    required={false}
                >
                    street address 2
                </TextInput>
            </div>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <TextInput
                    placeholder="myCity"
                    inputID="city"
                    inputName="city"
                    inputLabel={true}
                    bind:textInputValue={cityInputValue}
                    bind:isValid={cityIsValid}
                    textInputErrorMessage="city required"
                    required={true}
                >
                    city*
                </TextInput>
            </div>
            <div class="input_column">
                <SelectInput 
                    options={States}
                    inputID="states"
                    inputName="states"
                    inputLabel={true}
                    selectInputErrorMessage="state required"
                    required={true}
                    bind:selectInputValue={stateInputValue}
                    isValid={stateIsValid}
                >
                    state*
                </SelectInput>
            </div>
            <div class="input_column">
                <NumberInput
                    placeholder="12345"
                    inputID="zip_code"
                    inputName="zip_code"
                    inputLabel={true}
                    bind:numberInputValue={zipCodeInputValue}
                    bind:isValid={zipCodeIsValid}
                    numberInputErrorMessage="zip code required"
                    required={true}
                >
                    zip code*
                </NumberInput>
            </div>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <SelectInput 
                    options={Countries}
                    inputID="countries"
                    inputName="countries"
                    inputLabel={true}
                    selectInputErrorMessage="country required"
                    required={true}
                    bind:selectInputValue={countryInputValue}
                    isValid={countryIsValid}
                >
                    country*
                </SelectInput>
            </div>
        </div>
        <div class="buttons_container">
            <SubmitButton>
                save
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
{/key}

<style>

    form {
        width: 100%;
        max-width: 60rem;
        position: relative;
    }

    .buttons_container {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        align-items: center;
    }

    .close_button_container {
        position: absolute;
        right: 0;
        top: 0;
    }

</style>