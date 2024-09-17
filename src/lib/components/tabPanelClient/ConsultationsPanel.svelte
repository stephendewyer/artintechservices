<script lang="ts">
    import { onDestroy } from "svelte";
    import ConsultationCard from "$lib/components/cards/ConsultationCard.svelte";
    import Pagination from "$lib/components/pagination/Pagination.svelte";
    import { fade } from "svelte/transition";
    
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
<div 
    in:fade={{ delay: 250, duration: 300 }}
    class="consultations_container"
>
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
</div>

<style>

    .consultations_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .consultations {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem 0;
    }

</style>