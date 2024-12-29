<script lang="ts">
    import ActionButtonTertiary from "../buttons/ActionButtonTertiary.svelte";
    import DeleteButton from "../buttons/DeleteButton.svelte";
    import Pagination from "../pagination/Pagination.svelte";

    export let panel_data;

    let invoicesCurrentPage: number = 1;

    let pageSize: number = 10;

    let firstPageIndexInvoices: number;
    $: firstPageIndexInvoices = (invoicesCurrentPage -1) * pageSize;

    let lastPageIndexInvoices: number;
    $: lastPageIndexInvoices = firstPageIndexInvoices + pageSize;

    let paginatedInvoices: any[];

    $: paginatedInvoices = panel_data.slice(firstPageIndexInvoices, lastPageIndexInvoices);

</script>
{#key paginatedInvoices}
    <div class="invoices_table_container">
        <table class="invoices_table">
            <tbody>
                <tr>
                    <th>
                        invoice
                    </th>
                    <th>
                        email
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
                {#each panel_data as invoice, index}
                    <tr>
                        <td>
                            {++index}
                        </td>
                        <td>
                            {invoice.customer_name}
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
                                cancel
                            </DeleteButton>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="pagination">
        <Pagination 
            bind:currentPage={invoicesCurrentPage}
            totalCount={panel_data.length}
            pageSize={pageSize} 
        />
    </div>
{/key}
<style>

    .invoices_table_container {
        width: 100%;
        padding: 0 0 1rem 0;
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