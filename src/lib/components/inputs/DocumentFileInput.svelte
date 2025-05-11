<script lang="ts">
    import InputErrorMessage from '$lib/components/errorMessages/InputErrorMessage.svelte';
    import { DocumentFileExtensionTest } from "$lib/util/DocumentFileExtensionTest";
    import CloseButton from '$lib/components/buttons/CloseButton.svelte';
    import DocumentIcon from "$lib/images/icons/document.svg?raw";
    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let documentFileInputValue: string; 
    export let document: any;
    export let isValid: boolean = true;
    export let documentFileInputErrorMessage: string = "";
    export let required: boolean;
    export let documentFileInputElement: HTMLInputElement;
    export let files: FileList | null = null;
    export let deleteDocument: boolean = false;

    let cancelDocumentUpload: boolean = false;

    let documentFile: File | null = null;
    
    let documentFileName: string = document ? documentFileInputValue.split(`\\`)[2] : "";

    const documentFileChangedHandler = () => {

        document = "";

        documentFileName = documentFileInputValue.split(`\\`)[2];

        if (required) {
            if (documentFileInputValue === "") {
                isValid = false;
                documentFileInputErrorMessage = "document required!";
            };
        };

        if (files !== null) {
            documentFile = files[0];
            if (documentFile.size > 2000000) {
                isValid = false;
                documentFileInputErrorMessage = "document cannot exceed 2MB in size!";
            } else if (!DocumentFileExtensionTest(files[0].type)) {
                isValid = false;
                documentFileInputErrorMessage = "invalid file type";
            } else {
                const fileReader = new FileReader();
                isValid = true;
                documentFileInputErrorMessage = "";
                fileReader.onload = (e) => {
                    // the file's text will be printed here;
                    document = e.target?.result;
                };
                fileReader.readAsDataURL(files[0]);
            };
        };        
    };

    $: if (cancelDocumentUpload) {
        documentFileInputElement.value = "";
        document = null;
        documentFileInputValue = "";
        deleteDocument = true;
        cancelDocumentUpload = false;
    } else {
        deleteDocument = false;
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
        bind:this={documentFileInputElement}
        bind:files={files}
        bind:value={documentFileInputValue}
        on:change={documentFileChangedHandler}
        style={document ? "display: none" : ""}
    />
    {#if (!isValid)}
        <InputErrorMessage>
            {documentFileInputErrorMessage}
        </InputErrorMessage>
    {/if}
    {#if (document)}
        <div class="project_document_container">
            <div class="document_icon_and_label">
                <div class="document_icon">
                    {@html DocumentIcon}
                </div>
                <p class="document_label">
                    {documentFileName.length > 15 ? `...${documentFileName.slice(-15, documentFileName.length)}` : documentFileName}
                </p>
            </div>
            <div class="cancel_button_container">
                <CloseButton bind:closeButtonClicked={cancelDocumentUpload} />
            </div>
        </div>
    {/if}
    <p class="constraints">* file formats accepted: <span style="font-weight: bold">PDF, pdf</span></p>
    <p class="constraints">* maximum file size: <span style="font-weight: bold">2MB</span></p>
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

    .cancel_button_container {
        position: absolute;
        right: 1rem;
        top: 1rem;
    }

    .project_document_container {
        position: relative;
        padding: 1rem;
    }

    .document_icon_and_label {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .document_icon {
        width: 4rem;
        min-width: 4rem;
    }

    .document_label {
        word-wrap: break-word;
        width: 80%;
        max-width: 12rem;
        margin: 0;
        padding: 0 4rem 0 0 ;
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

        .document_icon {
            width: 3rem;
            min-width: 3rem;
        }

        .cancel_button_container {
            right: 0.75rem;
            top: 0.75rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .cancel_button_container {
            right: 0.5rem;
            top: 0.5rem;
        }

        .document_icon {
            width: 2rem;
            min-width: 2rem;
        }

        .document_label {
            margin-right: 2.5rem;
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


        .document_label {
            margin-right: 2.5rem;
        }

        .cancel_button_container {
            right: 0.25rem;
            top: 0.25rem;
        }
    }

</style>