<script lang="ts">
    import InputErrorMessage from "../errorMessages/InputErrorMessage.svelte";
    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let passwordInputValue: string;
    export let isValid: boolean | null;
    export let required: boolean;
    export let passwordInputErrorMessage: string = "";
    export let passwordsMatch: boolean | null = null;

    let passwordMatchValidation: boolean = true;

    let errorMessage: string = "";

    let passwordInputTouched: boolean = false;

    const passwordInputValueChangedHandler = () => {
        if (required) {
            if (passwordInputTouched) {
                if (passwordInputValue === "") {
                    isValid = false;
                    errorMessage = passwordInputErrorMessage;
                } else if (passwordInputValue !== "") {
                    isValid = true;
                };
            } else if (!passwordInputTouched) {
                isValid = true;
            };
        };
    };

    const passwordInputFocusChangedHandler = () => {
        if (passwordInputTouched) {
            if (passwordInputValue === "") {
                isValid = false;
                errorMessage = passwordInputErrorMessage;
            } else if (passwordInputValue !== "") {
                isValid = true;
            };
        } else if (!passwordInputTouched) {
            isValid = true;
        };
    };

    const passwordInputBlurChangedHandler = () => {

        passwordInputTouched = true;

        if (passwordInputValue === "") {
            isValid = false;
            errorMessage = passwordInputErrorMessage;
        } else if (passwordInputValue !== "") {
            isValid = true;
        };
    };

    $: if (passwordsMatch === false) {
        passwordMatchValidation = false;
    } else {
        passwordMatchValidation = true;
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
        style={!passwordMatchValidation ? "border-color: #9F1D20" : ""}
        placeholder={placeholder}
        id={inputID}
        name={inputName}
        type="password"
        autocomplete="off"
        bind:value={passwordInputValue}
        on:input={passwordInputValueChangedHandler}
        on:focus={passwordInputFocusChangedHandler}
        on:blur={passwordInputBlurChangedHandler}
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
        will-change: border-color;
    }

    .input:hover {
        border-color: #CB6D44;
        transition: border-color 0.2s linear;
    }

    .input:focus {
        border-color: #1C2226;
        transition: border-color 0.2s linear;
    }

    .invalid_input {
        background-color: #EFF9F2;
        border-radius: 3rem;
        color: #484B47;
        font-size: 1.4rem;
        padding: 0.5rem 1rem;
        border-width: 2px;
        border-style: solid;
        transition: border-color 0.2s linear;
        outline: none;
        width: 100%;
        border-color: #9F1D20;
        will-change: border-color;
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