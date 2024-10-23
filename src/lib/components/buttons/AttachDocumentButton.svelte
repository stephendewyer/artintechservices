<script lang="ts">
    import PaperClip from "$lib/images/icons/paper_clip_icon.svg?raw"
    export let attachDocumentClicked: boolean = false;

</script>
<button class="attach_document_button">
    <div class="paper_clip_container">
        {@html PaperClip}
    </div>
    document
</button>

<style>

    .attach_document_button {
        display: inline-flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
        background: none;
        border: 2px solid #263132;
        border-radius: 1.5rem;
        cursor: pointer;
        color: #263132;
        padding: 0.25rem 1rem;
        font-weight: 600;
        transition: color 0.3s linear, background-color 0.3s linear;
    }

    .paper_clip_container {
        width: 1.75rem;
        fill: #263132;
        transition: fill 0.3s linear;
    }

    .attach_document_button:hover {
        color: #F2F9F2;
        fill: #F2F9F2;
        background-color: #263132;
    }

    .attach_document_button:hover > .paper_clip_container {
        fill: #F2F9F2;
    }

    @media screen and (max-width: 720px) {
        .attach_document_button {
            gap: 0.25rem;
            border: 1px solid #263132;
        }

        .paper_clip_container {
            width: 1.25rem;
        }
    }
</style>