<script lang="ts">
    import { onDestroy } from "svelte";
    import ConsultationCard from "$lib/components/cards/ConsultationCard.svelte";

    export let panel_data: Consultation[];

    console.log(panel_data)

    onDestroy(() => {
        panel_data = []
    });

</script>
<div class="consultations">
    {#if panel_data.length > 0}
        {#each panel_data as consultation, index}
            <ConsultationCard consultation={consultation} />
        {/each}
    {/if}
</div>

<style>
    .consultations {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
    }
</style>