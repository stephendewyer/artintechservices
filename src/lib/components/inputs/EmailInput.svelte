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
            if (!emailInputTouched) {
                if (emailInputValue === "") {
                    isValid = false;
                } else if (emailInputValue !== "") {
                    isValid = true;
                }
            } else if (emailInputTouched) {
                if (
                    emailInputValue === "" || !emailInputValue.includes('@')
                ) {
                    isValid = false;
                } else if (emailInputValue !== "" && emailInputValue.includes('@')) {
                    isValid = true;
                }
            }
        }
    }

    const emailInputFocusChangedHandler = () => {
        if (required) {
            if (emailInputTouched) {
                if (emailInputValue === "") {
                    isValid = false;
                } else if (!emailInputValue.includes('@')) {
                    isValid = false;
                } else if (emailInputValue !== "") {
                    isValid = true;
                }
            }
        }
    }

    const emailInputBlurChangedHandler = () => {
        if (required) {
            emailInputTouched = true;
            if (emailInputValue === "") {
                isValid = false;
            } else if (!emailInputValue.includes('@')) {
                isValid = false;
            } else if (emailInputValue !== "") {
                isValid = true;
            }
        }
    }

    $: if (!isValid) {
        if (emailInputValue === "") {
            emailInputErrorMessage = "a valid email required";
        } else if (!emailInputValue.includes('@')) {
            emailInputErrorMessage = "email must have an @ symbol";
        }
    }
  
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
    
    input {
        border-radius: 3rem;
        font-size: 1.4rem;
        padding: 0.5rem 1rem;
        border-width: 2px;
        border-style: solid;
        will-change: border-color, color, background-color;
        transition: border-color 0.2s linear, color 0.2s linear, background-color 0.2s linear;
        outline: none;
        width: 100%;
    }

    input:hover {
        border-color: #D58E65;
    }

    input:focus {
        border-color: #626472;
    }

    .input  {
        background-color: #EFF9F2;
        color: #36261E;
        border-color: #AEA89D;
    }

    .invalid_input {
        background-color: #EFF9F2;
        color: #484B47;
        border-color: #914732;
    }

    ::placeholder {
        color: #484B47;
        opacity: 50%; /* Firefox */
    }

    @media (max-width: 1440px) {

        input {
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

        input {
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