<script lang="ts">
    import InputErrorMessage from "../errorMessages/InputErrorMessage.svelte";

    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let emailInputValue: string;
    export let isValid: boolean;
    export let required: boolean;

    let emailInputErrorMessage: string = "";

    let emailInputTouched: boolean = false;

    const emailInputValueChangedHandler = () => {
        if (required) {
            if (emailInputTouched) {
                if (emailInputValue === "") {
                    isValid = false;
                    emailInputErrorMessage = "a valid email required";
                } else if (!emailInputValue.includes('@')) {
                    isValid = false;
                    emailInputErrorMessage = "email must have an @ symbol";
                } else if (emailInputValue !== "") {
                    isValid = true;
                }
            } else if (!emailInputTouched) {
                isValid = true;
            };
        };
    };

    const emailInputFocusChangedHandler = () => {
        if (required) {
            if (emailInputTouched) {
                if (emailInputValue === "") {
                    isValid = false;
                    emailInputErrorMessage = "a valid email required";
                } else if (!emailInputValue.includes('@')) {
                    isValid = false;
                    emailInputErrorMessage = "email must have an @ symbol";
                } else if (emailInputValue !== "") {
                    isValid = true;
                };
            } else if (!emailInputTouched) {
                isValid = true;
            };
        };
    };

    const emailInputBlurChangedHandler = () => {
        if (required) {
            emailInputTouched = true;
            if (emailInputValue === "") {
                isValid = false;
                emailInputErrorMessage = "a valid email required";
            } else if (!emailInputValue.includes('@')) {
                isValid = false;
                emailInputErrorMessage = "email must have an @ symbol";
            } else if (emailInputValue !== "") {
                isValid = true;
            };
        };
    };
  
</script>

<div class="input_and_label_container">
    {#if inputLabel !== false}
        <div class="input_label">
            <label for={inputID} ><slot /></label>
        </div>
    {/if}
    <input 
        class={isValid ? "input" : "invalid_input"}
        placeholder={placeholder}
        id={inputID}
        name={inputName}
        type="text"
        bind:value={emailInputValue}
        on:input={emailInputValueChangedHandler}
        on:focus={emailInputFocusChangedHandler}
        on:blur={emailInputBlurChangedHandler}
    />
    {#if (!isValid)}
        <InputErrorMessage>
            {emailInputErrorMessage}
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
        will-change: border-color;
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
        will-change: border-color;
        border-color: #9F1D20;
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