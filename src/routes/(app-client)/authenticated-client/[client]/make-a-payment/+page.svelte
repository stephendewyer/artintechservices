<script lang="ts">
    import { PUBLIC_STRIPEPUBLISHABLEKey } from '$env/static/public';
    import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js';
    import { Elements, LinkAuthenticationElement, PaymentElement, Address } from 'svelte-stripe';
    import { onMount } from 'svelte';
    import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
  import PaymentMethodCard from '$lib/components/cards/PaymentMethodCard.svelte';

    export let data;

    const customer: any = data.customer.data;
    const invoice: any = data.invoice;
    const paymentMethods: any = data.paymentMethods.data;

    console.log(paymentMethods)
    let stripe: Stripe | null = null;

    const loadStripeHandler = async () => {
        stripe = await loadStripe(PUBLIC_STRIPEPUBLISHABLEKey);
    };

    onMount(() => {
        loadStripeHandler();  
    });

</script>
<div class="page">
    <h1>
        invoice
    </h1>
    <table class="invoices_table">
        <colgroup>
            <col style="width: 35%;"/>
            <col style="width: 65%;" />
        </colgroup>
        <tr>
            <td>
                date created:
            </td>
            <td>
                {new Date(invoice.created * 1000).toUTCString().slice(0, 16)}
            </td>
        </tr>
        <tr>
            <td>
                due date:
            </td>
            <td>
                {new Date(invoice.due_date * 1000).toUTCString().slice(0, 16)}
            </td>
        </tr>
        <tr>
            <td>
                amount due:
            </td>
            <td>
                ${invoice.amount_due * 0.01}
            </td>
        </tr>
        <tr>
            <td>
                status:
            </td>
            <td>
                {invoice.status}
            </td>
        </tr>
        <tr>
            <td>
                details:
            </td>
            <td>
                {#each invoice.lines.data as invoiceLineItem, index}
                    {invoiceLineItem.description}
                {/each}
            </td>
    </table>
    <h2>
        payment method
    </h2>
    <ul class="payment_method_cards_container">
        {#if (paymentMethods.length > 0)}
            {#each paymentMethods as paymentMethod, index}
                <PaymentMethodCard paymentMethod={paymentMethod}/>
            {/each}
        {/if}
    </ul>
    <SubmitButton>
        pay invoice
    </SubmitButton>
</div>

<style>

    table {
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
        max-width: 60rem;
        padding: 1rem;
    }

    table > tr {
        height: auto;
        padding: 0;
    }

    table > tr > td {
        font-size: 1.25rem;
        padding: 0.25rem 1rem;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    table tr:nth-child(odd) {
        background-color: #F2F9F2;
    }

    table td:nth-child(odd) {
        font-weight: bold;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    .payment_method_cards_container {
        width: 100%;
        max-width: 60rem;
        padding: 1rem;
        margin: 0;
    }

    @media screen and (max-width: 1440px) {
        table > tr > td {
            font-size: 1.175rem;
            padding: 0.25rem 0.5rem;
        }

    }

    @media screen and (max-width: 1080px) {

        table > tr > td {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
        }

    }

    @media screen and (max-width: 720px) {

    }
</style>