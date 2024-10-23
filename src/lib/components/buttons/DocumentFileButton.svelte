<script lang="ts">
    import DocumentIcon from "$lib/images/icons/document.svg?raw";
    export let documentURL: string = "";
</script>
<a href={documentURL} target="_blank" class="document_button_container">
    <button class="document_button">
        <div class="icon_container">
            {@html DocumentIcon}
        </div>
        <p class="label">
            {documentURL.split("/")[documentURL.split("/").length - 1]}
        </p>
    </button> 
</a>

<style>

    .document_button_container {
        display: inline-flex;
    }

    .document_button {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        border: 2px solid #424635;
        background-color: #EFD5C9;
        padding: 0.25rem 0.5rem;
        color: #424635;
        transition: color 0.3s linear, border 0.3s linear;
    }

    .icon_container {
        fill: #424635;
        width: 1.5rem;
        min-width: 1.5rem;
        transition: fill 0.3s linear;
    }

    .label {
        color: #424635;
        transition: color 0.3s linear;
    }

    .document_button:hover {
        color: #838B6A;
        border: 2px solid #838B6A;
    }

    .document_button:hover > .label {
        color: #838B6A;
    }

    .document_button:hover > .icon_container {
        fill: #838B6A;
    }

    .label {
        overflow-wrap: break-word;
        hyphens: auto;
        margin: 0;
        width: 100%;
        max-width: 100%;
        text-align: left;
    }

    @media screen and (max-width: 720px) {

        .label {
            max-width: 6rem;
            font-size: 0.85rem;
        }

        .document_button {
            border: 1px solid #424635;
        }

        .document_button:hover {
            border: 1px solid #838B6A;
        }
    }

</style>