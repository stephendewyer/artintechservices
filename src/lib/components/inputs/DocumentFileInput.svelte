<script lang="ts">
    import InputErrorMessage from '$lib/components/errorMessages/InputErrorMessage.svelte';
    import { DocumentFileExtensionTest } from "$lib/util/DocumentFileExtensionTest";
    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let documentFileInputValue: string; 
    export let document: any;
    export let isValid: boolean;
    export let documentFileInputErrorMessage: string = "";
    export let required: boolean;

    let documentFile: any;

    const documentFileChangedHandler = (event: any) => {

        document = "";

        documentFile = event.target?.files[0];

        if (required) {
            if (documentFileInputValue === "") {
                isValid = false;
            };
        } else if (documentFile?.size >  2000000) {
            isValid = false;
        } else if ((documentFile) && (DocumentFileExtensionTest(documentFile?.type) === "false")) {
            isValid = false;
        };

        const fileReader = new FileReader();

        if (documentFile && (DocumentFileExtensionTest(documentFile?.type) === "true") ) {
            isValid = true;
            documentFileInputErrorMessage = "";
            fileReader.onload = (e) => {
                // the file's text will be printed here;
                document = e.target?.result;
            };
            fileReader.readAsDataURL(documentFile);
        };
    };

    $: if (!isValid) {
        if (required) {
            if (documentFileInputValue === "") {
                documentFileInputErrorMessage = "document required!";
            };
        } else if (documentFile?.size >  2000000) {
            documentFileInputErrorMessage = "document cannot exceed 2MB in size!";
        } else if ((documentFile) && (DocumentFileExtensionTest(documentFile?.type) === "false")) {
            documentFileInputErrorMessage = "invalid file type";
        } else if ((documentFile) && (DocumentFileExtensionTest(documentFile?.type) === "false")) {
            documentFileInputErrorMessage = "invalid file type";
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
        type="file"
        bind:value={documentFileInputValue}
        on:change={documentFileChangedHandler}
    />
    {#if ((required) && (!isValid))}
        <InputErrorMessage>
            {documentFileInputErrorMessage}
        </InputErrorMessage>
    {/if}
</div>
 
<style>
    input[type="file"]::file-selector-button {
        display: none;
    }

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
        padding: 0.5rem 1rem 0.5rem 3rem;
        border-width: 2px;
        border-style: solid;
        transition: border-color 0.2s linear, fill 0.2s linear, background-color 0.2s linear, color 0.2s linear;
        outline: none;
        width: 100%;
        background-image: url('$lib/images/icons/folder_icon.svg');
        background-size: 1.8rem;
        background-repeat: no-repeat;
        background-position: 10px center;          
    }

    .input {
        border-color: #AEA89D;
        fill: #36261E;
        color: #36261E;
        background-color: #EFF9F2;
    }
    
    .invalid_input {
        background-color: #EFF9F2;
        fill: #484B47;
        color: #484B47;
        border-color: #914732;
    }

    input:hover {
        border-color: #CB6D44;
        transition: border-color 0.2s linear;
    }

    input:focus {
        border-color: #626472;
        transition: border-color 0.2s linear;
    }

    ::placeholder {
        color: #484B47;
        opacity: 50%; /* Firefox */
    }

    @media (max-width: 1440px) {

        input {
            font-size: 1.2rem;
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            background-size: 1.5rem;       
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