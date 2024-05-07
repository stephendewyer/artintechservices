<script lang="ts">
    import InputErrorMessage from '$lib/components/errorMessages/InputErrorMessage.svelte';

    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let textInputValue: string;
    export let isValid: boolean;
    export let textInputErrorMessage: string = "";
    export let required: boolean;

    let errorMessage: string = "";

    let textInputTouched: boolean = false;

    const textInputValueChangedHandler = () => {
        if (required) {
            if (textInputTouched) {
                if (textInputValue === "") {
                    isValid = false;
                    errorMessage = textInputErrorMessage;
                } else if (textInputValue !== "") {
                    isValid = true;
                }
            } else if (!textInputTouched) {
                isValid = true;
            };
        };
    };

    const textInputFocusChangedHandler = () => {
        if (required) {
            if (textInputTouched) {
                if (textInputValue === "") {
                    isValid = false;
                    errorMessage = textInputErrorMessage;
                } else if (textInputValue !== "") {
                    isValid = true;
                };
            } else if (!textInputTouched) {
                isValid = true;
            };
        }
        
    };

    const textInputBlurChangedHandler = () => {
        if (required) {
            textInputTouched = true;
            if (textInputValue === "") {
                isValid = false;
                errorMessage = textInputErrorMessage;
            } else if (textInputValue !== "") {
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
    <input 
        class={isValid ? "input" : "invalid_input"}
        placeholder={placeholder}
        id={inputID}
        name={inputName}
        type="text"
        bind:value={textInputValue}
        on:input={textInputValueChangedHandler}
        on:focus={textInputFocusChangedHandler}
        on:blur={textInputBlurChangedHandler}
    />
    {#if (!isValid)}
        <InputErrorMessage>
            {errorMessage}
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
    
    .input {
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

    .invalid_input {
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

    .input:hover {
        border-color: #CB6D44;
        transition: border-color 0.2s linear;
    }

    .input:focus {
        border-color: #1C2226;
        transition: border-color 0.2s linear;
    }

    ::placeholder {
        color: #484B47;
        opacity: 50%; /* Firefox */
    }

    @media (max-width: 1440px) {

        .input {
            font-size: 1.2rem;
        }

        .invalid_input {
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

        .input {
            font-size: 1rem;
        }

        .invalid_input {
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