<script lang="ts">
    import InputErrorMessage from "../errorMessages/InputErrorMessage.svelte";
    import ClosedEye from "$lib/images/icons/closed_eye_icon.svg?raw";
    import OpenEye from "$lib/images/icons/open_eye_icon.svg?raw";
    export let value: string = "";
    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let isValid: boolean | null;
    export let required: boolean;
    export let passwordInputErrorMessage: string = "";
    export let passwordsMatch: boolean | null = null;
    export let inputValueChanged = false;

    let passwordMatchValidation: boolean = true;

    let errorMessage: string = "";

    export let passwordInputTouched: boolean = false;

    const passwordInputValueChangedHandler = (event: any) => {
        inputValueChanged = true;
        if (required) {
            if (event.target.value === "") {
                isValid = false;
            } else if (event.target.value !== "") {
                isValid = true;
            }
        }
    }

    const passwordInputFocusChangedHandler = (event: any) => {
        if (passwordInputTouched) {
            if (event.target.value === "") {
                isValid = false;
            } else if (event.target.value !== "") {
                isValid = true;
            }
        }
    }

    const passwordInputBlurChangedHandler = (event: any) => {
        passwordInputTouched = true;
        if (event.target.value === "") {
            isValid = false;
        } else if (event.target.value !== "") {
            isValid = true;
        }
    }

    $: if (passwordsMatch === false) {
        passwordMatchValidation = false;
    } else {
        passwordMatchValidation = true;
    };

    $: if (!isValid) {
        if (value === "") {
            errorMessage = passwordInputErrorMessage;
        }
    };

    const handleInput = (event: any) => {

        passwordInputValueChangedHandler(event);

        value = event.target.value;

    };

    let passwordVisible: boolean = false;

    let type: string = "password";

    const togglePasswordVisibility = (event: { currentTarget: { previousElementSibling: any; }; }) => {

        const input = event.currentTarget.previousElementSibling;

        if (!input) {
            return;
        };

        input.type = input.type === "password" ? "text" : "password";
        
        passwordVisible = !passwordVisible;

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
    <div class="input_container">
        <input 
            class={isValid ? "input" : "invalid_input"}
            style={!passwordMatchValidation ? "border-color: #9F1D20" : ""}
            placeholder={placeholder}
            id={inputID}
            name={inputName}
            autocomplete="off"
            {type} 
            {value}
            on:input={handleInput}
            on:focus={passwordInputFocusChangedHandler}
            on:blur={passwordInputBlurChangedHandler}
        />
        <button 
            class="toggle_password_visibility_button"
            on:click={togglePasswordVisibility}
            on:keyup={togglePasswordVisibility}
            type="button"
        >
            {#if (passwordVisible)}
                {@html OpenEye}
            {:else}
                {@html ClosedEye}
            {/if}
        </button>
    </div>
    
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

    .input_container {
        position: relative;
    }

    .toggle_password_visibility_button {
        position: absolute;
        height: 100%;
        width: 4rem;
        padding: 0.25rem;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        fill: #36261E;
        transition: fill 0.3s linear;
        background: none;
        border: none;
        cursor: pointer;
    }

    .toggle_password_visibility_button:hover {
        fill: #838B6A;
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
        will-change: border-color;
    }

    .input:hover {
        border-color: #CB6D44;
    }

    .input:focus {
        border-color: #626472;
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
        border-color: #914732;
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