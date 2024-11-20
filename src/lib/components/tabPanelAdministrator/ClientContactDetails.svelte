<script lang="ts">
    export let panel_data;

    const clientContactDetails: ClientContactInformation = panel_data[0];
    
</script>
<section class="contact_details">
    <div class="contact_details_tables">
        <div class="contact_details_table_container">
            <table class="contact_details_table">
                <colgroup>
                    <col class="left_column"/>
                    <col class="right_column"/>
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            first name:
                        </td>
                        <td>
                            {clientContactDetails?.name_first}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            last name:
                        </td>
                        <td>
                            {clientContactDetails?.name_last}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            company:
                        </td>
                        <td>
                            {clientContactDetails?.company}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            email:
                        </td>
                        <td>
                            {clientContactDetails?.email}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="contact_details_table_container">
            <table class="contact_details_table">
                <colgroup>
                    <col class="left_column"/>
                    <col class="right_column"/>
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            street address:
                        </td>
                        <td>
                            {clientContactDetails?.street_address}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            street address 2:
                        </td>
                        <td>
                            {clientContactDetails?.street_address_02}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            city:
                        </td>
                        <td>
                            {clientContactDetails?.city}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            state:
                        </td>
                        <td>
                            {clientContactDetails?.state}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            zip code:
                        </td>
                        <td>
                            {clientContactDetails?.zip_code}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>
<style>

    .contact_details {
        width: 100%;
    }

    .contact_details_tables {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .contact_details_table_container {
        width: 50%;
    }

    .contact_details_table {
        width: 100%;
    }

    .left_column {
        width: 35%;
    }

    .right_column {
        width: 65%;
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
        .contact_details_tables {
            flex-direction: column;
        }

        .contact_details_table_container {
            width: 100%;
            overflow-x: auto;
        }

        .contact_details_table {
            width: 100%;
            min-width: 30rem;
            padding: 1rem;

        }

        table > tbody > tr > td {
            font-size: 0.85rem;
        }
    }
    
</style>