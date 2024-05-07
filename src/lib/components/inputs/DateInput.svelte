<script lang="ts">
    import InputErrorMessage from "../errorMessages/InputErrorMessage.svelte";

    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let dateInputValue: Date;
    export let isValid: boolean;
    export let dateInputErrorMessage: string;
    export let required: boolean;

    let errorMessage: string = "";

    let dateInputTouched: boolean = false;

    const dateInputValueChangedHandler = () => {
        if (required) {
            if (dateInputTouched) {
                if (!dateInputValue) {
                    isValid = false;
                    errorMessage = dateInputErrorMessage;
                } else if (dateInputValue) {
                    isValid = true;
                }
            } else if (!dateInputTouched) {
                isValid = true;
            };
        };
    };

    const dateInputFocusChangedHandler = () => {
        if (required) {
            if (dateInputTouched) {
                if (!dateInputValue) {
                    isValid = false;
                    errorMessage = dateInputErrorMessage;
                } else if (dateInputValue) {
                    isValid = true;
                };
            } else if (!dateInputTouched) {
                isValid = true;
            };
        };
    };

    const dateInputBlurChangedHandler = () => {
        if (required) {
            dateInputTouched = true;
            if (!dateInputValue) {
                isValid = false;
                errorMessage = dateInputErrorMessage;
            } else if (dateInputValue) {
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
        id={inputID}
        name={inputName}
        type="date"
        bind:value={dateInputValue}
        on:input={dateInputValueChangedHandler}
        on:focus={dateInputFocusChangedHandler}
        on:blur={dateInputBlurChangedHandler}
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
        border-color: #AEA89D;
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