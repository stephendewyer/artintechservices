<script lang="ts">
    import { onDestroy } from "svelte";
    import ConsultationCard from "$lib/components/cards/ConsultationCard.svelte";
    import Pagination from "$lib/components/pagination/Pagination.svelte";

    export let panel_data: Consultation[];

    let consultationsCurrentPage: number = 1;

    let pageSize: number = 6;

    let firstPageIndexConsultations: number;
    $: firstPageIndexConsultations = (consultationsCurrentPage -1) * pageSize;

    let lastPageIndexConsultations: number;
    $: lastPageIndexConsultations = firstPageIndexConsultations + pageSize;

    let paginatedConsultations: Consultation[];

    $: paginatedConsultations = panel_data.slice(firstPageIndexConsultations, lastPageIndexConsultations);

    onDestroy(() => {
        panel_data = []
    });

</script>
<div class="consultations">
    {#if panel_data.length > 0}
        {#each paginatedConsultations as consultation, index}
            <ConsultationCard consultation={consultation} />
        {/each}
    {/if}
    
</div>
<Pagination 
        bind:currentPage={consultationsCurrentPage}
        totalCount={panel_data.length}
        pageSize={pageSize} 
/>
<style>
    .consultations {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
    }
</style>