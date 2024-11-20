<script lang="ts">
    import ActionButtonTertiary from "../buttons/ActionButtonTertiary.svelte";
  import DeleteButton from "../buttons/DeleteButton.svelte";

    export let panel_data;

    const invoices = panel_data[0].invoices;

    console.log(invoices);
</script>
<section class="billing">
    billing
    <div class="invoices_table_container">
        <table class="invoices_table">
            <tbody>
                <tr>
                    <th>
                        invoice
                    </th>
                    <th>
                        date created
                    </th>
                    <th>
                        due date
                    </th>
                    <th>
                        amount due
                    </th>
                    <th>
                        status
                    </th>
                    <th>
                        details
                    </th>
                    <th>
                        
                    </th>
                    <th>
                        
                    </th>
                </tr>
                {#each invoices as invoice, index}
                    <tr>
                        <td>
                            {++index}
                        </td>
                        <td>
                            {new Date(invoice.created * 1000).toUTCString().slice(0, 16)}
                        </td>
                        <td>
                            {new Date(invoice.due_date * 1000).toUTCString().slice(0, 16)}
                        </td>
                        <td>
                            {(invoice.amount_due/ 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </td>
                        <td>
                            {invoice.status}
                        </td>
                        <td>
                            {#each invoice.lines.data as invoiceLineItem, index}
                                {invoiceLineItem.description}
                            {/each}
                        </td>
                        <td>
                            {#if (!invoice.paid)}
                                <a href={`/authenticated-administrator/administrator/edit-invoice?invoice-ID=${invoice.id}&client-email=${invoice.customer_email}`}>
                                    <ActionButtonTertiary parentControlled={false}>
                                        edit
                                    </ActionButtonTertiary>
                                </a>
                            {:else if (invoice.paid)}
                                payment completed
                            {/if}
                        </td>
                        <td>
                            <DeleteButton>
                                delete
                            </DeleteButton>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>    
</section>
<style>
    .billing {
        position: relative;
        width: 100%;
        max-width: 100%;
    }

    .invoices_table_container {
        width: 100%;
    }

    .invoices_table {
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

        .invoices_table_container {
            position: relative;
            overflow-x: auto;
            width: 100%;
            display: block;
        }

        .invoices_table {
            position: relative;
            min-width: 60rem;
            padding: 1rem;
        }

        table > tbody > tr > td {
            font-size: 0.85rem;
        }

    }
</style>