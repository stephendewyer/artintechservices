<script lang="ts">
    import Meatballs from "$lib/images/icons/meaballs.svg?raw";
    export let consultation: Consultation;

    const reasonArray = consultation.consultation_reason.split(" ");
    const reasonShortened = reasonArray.slice(0, 5).join(" ");

</script>
<div class="consultation">
    <div class="meatballs_container">
        <div class="meatballs">
            {@html Meatballs}
        </div>
    </div>
    <h4 style="margin: 0;">{new Date(consultation.consultation_date).toUTCString().slice(0, 16)}</h4>
    <h5 style="margin: 0;">{consultation.consultation_time} {consultation.time_zone}</h5>
    <p style="margin: 0;">{reasonShortened}...</p>
</div>
<style>
    .consultation {
        width: 14rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        cursor: pointer;
        border-radius: 1rem;
        transition: box-shadow 0.2s linear;
    }

    .meatballs_container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: right;
    }

    .meatballs {
        width: 1.5rem;
    }

    .consultation:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }
</style>