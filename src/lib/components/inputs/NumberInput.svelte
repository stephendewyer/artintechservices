<script lang="ts">
    import InputErrorMessage from "../errorMessages/InputErrorMessage.svelte";
    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let numberInputValue: number | null;
    export let isValid: boolean;
    export let required: boolean;
    export let numberInputErrorMessage: string = "";

    let numberInputTouched: boolean = false;
    let errorMessage: string = "";

    const numberInputValueChangedHandler = () => {
        if (required) {
            if (numberInputTouched) {
                if (numberInputValue === null) {
                    isValid = false;
                } else if (numberInputValue !== null) {
                    isValid = true;
                }
            } else if (!numberInputTouched) {
                isValid = true;
            };
        };
    };

    const numberInputFocusChangedHandler = () => {
        if (required) {
            if (numberInputTouched) {
                if (numberInputValue === null) {
                    isValid = false;
                } else if (numberInputValue !== null) {
                    isValid = true;
                };
            } else if (!numberInputTouched) {
                isValid = true;
            };
        };
    };

    const numberInputBlurChangedHandler = () => {
        if (required) {
            numberInputTouched = true;
            if (numberInputValue === null) {
                isValid = false;
            } else if (numberInputValue !== null) {
                isValid = true;
            };
        };
    };

    $: if (!isValid) {
        if (numberInputValue === null) {
            errorMessage = numberInputErrorMessage;
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
        type="number"
        bind:value={numberInputValue}
        on:input={numberInputValueChangedHandler}
        on:focus={numberInputFocusChangedHandler}
        on:blur={numberInputBlurChangedHandler}
    />
    {#if (!isValid)}
        <InputErrorMessage>{errorMessage}</InputErrorMessage>
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
        color: #36261E;
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
        border-color: #914732;
        border-style: solid;
        transition: border-color 0.2s linear;
        outline: none;
        width: 100%;
    }

    .input:hover {
        border-color: #CB6D44;
    }

    .input:focus {
        border-color: #626472;
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