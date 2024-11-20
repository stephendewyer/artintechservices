<script lang="ts">
    import ActionButtonTertiary from "../buttons/ActionButtonTertiary.svelte";
    export let panel_data;

    const consultations: Consultation[] = panel_data[0];

</script>
<section class="consultations">
    <div class="consultations_table_container">
        <table class="consultations_table">
            <tbody>
                 <tr>
                     <th>
                         ID 
                     </th>
                     <th>
                         topic
                     </th>
                     <th>
                         date
                     </th>
                     <th>
                         time
                     </th>
                     <th>
                         time zone
                     </th>
                     <th>
                         status
                     </th>
                     <th>
     
                     </th>
                 </tr>
                 {#each consultations as consultation, index}
                     <tr>
                         <td>
                             {consultation?.request_ID}
                         </td>
                         <td>
                             {consultation?.consultation_topic.split("").length > 16 ? `${consultation?.consultation_topic.slice(0, 16)}...` : consultation?.consultation_topic}
                         </td>
                         <td>
                             {new Date(consultation?.consultation_date).toUTCString().slice(0, 16)}
                         </td>
                         <td>
                             {consultation?.consultation_time} 
                         </td>
                         <td>
                             {consultation?.time_zone}
                         </td>
                         <td>
                             {consultation?.status}
                         </td>
                         <td>
                            <a href={`/authenticated-administrator/administrator/client-consultations/consultation-id=${consultation?.request_ID}`}>
                                <ActionButtonTertiary >
                                    consultation
                                 </ActionButtonTertiary>
                            </a>
                         </td>
                     </tr>
                 {/each}
            </tbody>
         </table>
    </div>
</section>
<style>

    .consultations {
        position: relative;
        width: 100%;
    }

    .consultations_table_container {
        width: 100%;
    }

    .consultations_table {
        width: 100%;
    }

    @media screen and (max-width: 1440px) {
        table > tbody > tr > td {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 1080px) {
        table > tbody > tr > td {
            font-size: 0.95rem;
        }
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

        table > tbody > tr > td {
            font-size: 0.85rem;
        }

    }
    
</style>