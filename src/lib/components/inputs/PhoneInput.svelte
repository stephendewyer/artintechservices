<script lang="ts">
    import InputErrorMessage from '../errorMessages/InputErrorMessage.svelte';
    import { TelInput, normalizedCountries } from 'svelte-tel-input';
    import type { DetailedValue, CountryCode, E164Number } from 'svelte-tel-input/types';

    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let phoneInputValue: E164Number | null = '+36301234567';
    export let isValid: boolean = true;
    export let required: boolean;

    let selectedCountry: CountryCode | null = 'US';

    // optional - extended details about the parsed phone number
    let detailedValue: DetailedValue | null = null;

    let phoneInputTouched: boolean = false;
    let phoneInputErrorMessage: string = "";

    const phoneInputValueChangedHandler = () => {
        if (required) {
            if (phoneInputTouched) {
                if (phoneInputValue === "") {
                    isValid = false;
                    phoneInputErrorMessage = "phone number required";
                } else if (phoneInputValue !== "") {
                    isValid = true;
                }
            } else if (!phoneInputTouched) {
                isValid = true;
            };
        };
    };

    const phoneInputFocusChangedHandler = () => {
        if (required) {
            if (phoneInputTouched) {
                if (phoneInputValue === "") {
                    isValid = false;
                    phoneInputErrorMessage = "phone number required";
                } else if (phoneInputValue !== "") {
                    isValid = true;
                };
            } else if (!phoneInputTouched) {
                isValid = true;
            };
        };
    };

    const phoneInputBlurChangedHandler = () => {
        if (required) {
            phoneInputTouched = true;
            if (phoneInputValue === "") {
                isValid = false;
                phoneInputErrorMessage = "phone number required";
            } else if (phoneInputValue !== "") {
                isValid = true;
            };
        };
    };

</script>

<div class="input_and_label_container">
    {#if inputLabel !== false}
        <div class="input_label">
            <label for={inputID} >
                <slot />
            </label>
        </div>
    {/if}
    <TelInput
        class={isValid ? "input" : "invalid_input"}
        id={inputID}
        name={inputName}
        bind:country={selectedCountry}
        bind:value={phoneInputValue}
        bind:detailedValue
        on:input={phoneInputValueChangedHandler}
        on:focus={phoneInputFocusChangedHandler}
        on:blur={phoneInputBlurChangedHandler}
    />
    {#if (!isValid)}
        <InputErrorMessage>
            {phoneInputErrorMessage}
        </InputErrorMessage>
    {/if}
</div>

<style>

    .input_and_label_container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    label {
        font-size: 1.4rem;
        font-weight: 600;
        color: #1C2226;
    }

    .input_label {
        padding: 0 0 0.5rem 0;
    }
    
    :global(.input) {
        background-color: #EFF9F2;
        border-radius: 3rem;
        color: #484B47;
        font-size: 1.4rem;
        padding: 0.5rem 1rem;
        border-width: 2px;
        border-color: #EFF9F2;
        border-style: solid;
        transition: border-color 0.2s linear;
        outline: none;
        width: 100%;
    }

    :global(.invalid_input) {
        background-color: #EFF9F2;
        border-radius: 3rem;
        color: #484B47;
        font-size: 1.4rem;
        padding: 0.5rem 1rem;
        border-width: 2px;
        border-color: #9F1D20;
        border-style: solid;
        transition: border-color 0.2s linear;
        outline: none;
        width: 100%;
    }

    :global(.input:hover) {
        border-color: #CB6D44;
        transition: border-color 0.2s linear;
    }

    :global(.input:focus) {
        border-color: #1C2226;
        transition: border-color 0.2s linear;
    }

    :global(::placeholder) {
        color: #484B47;
        opacity: 50%; /* Firefox */
    }

    @media (max-width: 1440px) {

        :global(.input) {
            font-size: 1.2rem;
        }

        :global(.invalid_input) {
            font-size: 1.2rem;
        }

        label {
            font-size: 1.2rem;
        }

        .input_label {
            padding: 0 0 0.4rem 0;
        }

    }

    @media (max-width: 720px) {

        :global(.input) {
            font-size: 1rem;
        }

        :global(.invalid_input) {
            font-size: 1rem;
        }

        label {
            font-size: 1rem;
        }

        .input_label {
            padding: 0 0 0.3rem 0;
        }
    }

</style>