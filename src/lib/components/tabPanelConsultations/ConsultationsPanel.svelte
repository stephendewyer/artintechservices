<script lang="ts">
    import ActionButtonTertiary from "../buttons/ActionButtonTertiary.svelte";
    import Pagination from "../pagination/Pagination.svelte";
    import { ConvertTimeToStandard } from "$lib/util/convertTimeToStandard";

    export let panel_data;

    // console.log(panel_data)

    let consultationsCurrentPage: number = 1;

    let pageSize: number = 10;

    let firstPageIndexConsultations: number;
    $: firstPageIndexConsultations = (consultationsCurrentPage -1) * pageSize;

    let lastPageIndexConsultations: number;
    $: lastPageIndexConsultations = firstPageIndexConsultations + pageSize;

    let paginatedConsultations: any[];

    $: paginatedConsultations = panel_data.slice(firstPageIndexConsultations, lastPageIndexConsultations);

</script>
{#key paginatedConsultations}
    <div class="consultations_table_container">
        <table class="consultations_table">
            <tbody>
                <tr>
                    <th>
                        consultation ID
                    </th>
                    <th>
                        topic
                    </th>
                    <th>
                        time
                    </th>
                    <th>
                        date
                    </th>
                    <th>
                        status
                    </th>
                    <th>
                        client name
                    </th>
                    <th>
                        more
                    </th>
                </tr>
                {#each panel_data as consultation, index}
                    <tr>
                        <td>
                            {consultation.request_ID}
                        </td>
                        <td>
                            {#if (consultation.consultation_topic !== null)}
                                {#if consultation.consultation_topic.split(" ").length > 5}
                                    {consultation.consultation_topic.split(" ").slice(0, 5).join(" ")}...
                                {:else}
                                    {consultation.consultation_topic}
                                {/if}
                            {/if}
                        </td>
                        <td>
                            {#if consultation.consultation_time}
                                {ConvertTimeToStandard(consultation.consultation_time)} 
                            {/if}
                            {#if consultation.time_zone}
                                {consultation.time_zone}
                            {/if}
                        </td>
                        <td>
                            {new Date(consultation.consultation_date).toUTCString().slice(0, 16)}
                        </td>
                        <td>
                            {consultation.status}
                        </td>
                        <td>
                            {`${consultation.name_first} ${consultation.name_last}`}
                        </td>
                        <td>
                            <ActionButtonTertiary>
                                consultation
                                </ActionButtonTertiary>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="pagination">
        <Pagination 
            bind:currentPage={consultationsCurrentPage}
            totalCount={panel_data.length}
            pageSize={pageSize} 
        />
    </div>
{/key}
<style>

    .consultations_table_container {
        width: 100%;
        padding: 0 0 1rem 0;
    }

    .consultations_table {
        width: 100%;
    }

    @media screen and (max-width: 720px) {

        .consultations_table_container {
            position: relative;
            overflow-x: auto;
            width: 100%;
            display: block;
        }

        .consultations_table {
            position: relative;
            min-width: 60rem;
            padding: 1rem;
        }

    }
</style>