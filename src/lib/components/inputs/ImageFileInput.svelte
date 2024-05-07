<script lang="ts">
    import InputErrorMessage from '$lib/components/errorMessages/InputErrorMessage.svelte';
    import { ImageFileExtensionTest } from "$lib/util/ImageFileExtensionTest";
    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let imageFileInputValue: string; 
    export let image: any;
    export let isValid: boolean;
    export let imageFileInputErrorMessage: string = "";
    export let required: boolean;

    let imageFile: any;

    const imageFileChangedHandler = (event: any) => {

        image = "";

        imageFile = event.target?.files[0];

        if (required) {
            if (imageFileInputValue === "") {
                isValid = false;
                imageFileInputErrorMessage = "image required!";
            };

        };

        if (imageFile?.size >  2000000) {
            isValid = false;
            imageFileInputErrorMessage = "images cannot exceed 2MB in size!";
            return;
        };
        
        if ((imageFile) && (ImageFileExtensionTest(imageFile?.type) === "false")) {
            isValid = false;
            imageFileInputErrorMessage = "invalid file type";
            return;
        };

        const fileReader = new FileReader();

        if (imageFile && (ImageFileExtensionTest(imageFile?.type) === "true") ) {
            isValid = true;
            imageFileInputErrorMessage = "";
            fileReader.onload = (e) => {
                // the file's text will be printed here;
                image = e.target?.result;
            };
            fileReader.readAsDataURL(imageFile);
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
        bind:value={imageFileInputValue}
        on:change={imageFileChangedHandler}
    />
    {#if ((required) && (!isValid))}
        <InputErrorMessage>
            {imageFileInputErrorMessage}
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
        background-color: #EFF9F2;
        border-radius: 3rem;
        fill: #484B47;
        color: #484B47;
        font-size: 1.4rem;
        padding: 0.5rem 1rem 0.5rem 3rem;
        border-width: 2px;
        border-color: #AEA89D;
        border-style: solid;
        transition: border-color 0.2s linear;
        outline: none;
        width: 100%;
        background-image: url('$lib/images/icons/folder_icon.svg');
        background-size: 1.8rem;
        background-repeat: no-repeat;
        background-position: 10px center;          
    }

    input:hover {
        border-color: #CB6D44;
        transition: border-color 0.2s linear;
    }

    input:focus {
        border-color: #1C2226;
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