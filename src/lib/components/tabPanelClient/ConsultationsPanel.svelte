<script lang="ts">
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

</script>
<div class="consultations_container" in:fade={{ delay: 250, duration: 300 }}>
    {#key paginatedConsultations}
        <div class="consultations" in:fade={{ delay: 250, duration: 300 }}>
            {#if panel_data.length > 0}
                {#each paginatedConsultations as consultation, index}
                    <ConsultationCard consultation={consultation} />
                {/each}
            {/if}
        </div>
    {/key}
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
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @media screen and (max-width: 1440px) {
        .consultations {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media screen and (max-width: 1080px) {
        .consultations {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.75rem;
        }
    }

    @media screen and (max-width: 720px) {
        .consultations {
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 0.5rem;
            padding: 1rem 0;
        }
        
    }

</style>