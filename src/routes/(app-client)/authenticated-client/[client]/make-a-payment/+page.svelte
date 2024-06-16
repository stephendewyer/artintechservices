<script lang="ts">
    import { PUBLIC_STRIPEPUBLISHABLEKey } from '$env/static/public';
    import { loadStripe, type PaymentIntentResult, type Stripe, type StripeElements } from '@stripe/stripe-js';
    import { Elements, LinkAuthenticationElement, PaymentElement, Address } from 'svelte-stripe';
    import { onMount } from 'svelte';
    import { ModalOpenStore } from '$lib/stores/ModalOpenStore.js';
    import { DeleteConfirmationStore } from '$lib/stores/DeleteConfirmationStore.js';
    import { DeleteConfirmedStore } from '$lib/stores/DeleteConfirmedStore.js';
    import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
    import PaymentMethodCard from '$lib/components/cards/PaymentMethodCard.svelte';
    import AddItemButton from '$lib/components/buttons/AddItemButton.svelte';
    import LoadingSpinner from '$lib/components/loadingSpinners/LoadingSpinner.svelte';
    import CancelSubmitButton from '$lib/components/buttons/CancelSubmitButton.svelte';
    import SubmitButton02 from '$lib/components/buttons/SubmitButton02.svelte';
    import PendingFlashMessage from '$lib/components/flashMessages/PendingFlashMessage.svelte';
    import SuccessFlashMessage from '$lib/components/flashMessages/SuccessFlashMessage.svelte';
    import ErrorFlashMessage from '$lib/components/flashMessages/ErrorFlashMessage.svelte';
    import { page } from "$app/stores";
    import { PromptStore } from '$lib/stores/PromptStore.js';
  import { goto } from '$app/navigation';

    export let data;

    const clientEmail = $page.data.streamed.user?.email;

    const customer: any = data.customer?.data[0];
    const stripeCustomerID: string = customer.id;
    const invoice: any = data.invoice;

    let invoiceClientSecret: string = "";

    if (data.clientSecret) {
        invoiceClientSecret = data.clientSecret;
    };

    let paymentMethods: any = data.paymentMethods?.data;
    let paymentMethodID: string = "";

    if (paymentMethods.length > 0) {
        paymentMethodID = paymentMethods[0].id;
    };

    let stripe: Stripe | null = null;

    const loadStripeHandler = async () => {
        stripe = await loadStripe(PUBLIC_STRIPEPUBLISHABLEKey);
    };

    onMount(() => {
        loadStripeHandler();  
    });

    let addPaymentMethodClickHandler: boolean = false;

    let pendingPaymentSetup: boolean = false;

    let stripeClientSecret: string = "";

    const createPaymentSetup = async () => {
        pendingPaymentSetup = true;
        const response = await fetch("/authenticated-client/api/setupPaymentIntent", {
            method: "POST",
            body: JSON.stringify({
                clientEmail,
                stripeCustomerID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let clientSecretKey;
        clientSecretKey = await response.json();
        stripeClientSecret = clientSecretKey.clientSecretKey;
        if (response.ok) {
            pendingPaymentSetup = false;
        } else if (!response.ok) {
            pendingPaymentSetup = false;
        };
    };

    let addPaymentMethod: boolean = false;

    $: if (addPaymentMethodClickHandler) {
        addPaymentMethod = true;
        createPaymentSetup();
        addPaymentMethodClickHandler = false;
    };

    let elements: StripeElements | any = null;

    let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000);
    };

    let pendingSubmitPaymentHandler: null | boolean = null;

    const getPaymentMethods = async () => {
        const response = await fetch("/authenticated-client/api/getPaymentMethods", {
            method: "POST",
            body: JSON.stringify({
                clientEmail,
                stripeCustomerID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let paymentMethodsObj = await response.json();
        paymentMethods = paymentMethodsObj.data;
    };

    const submitPaymentMethodHandler = async () => {
        // avoid processing duplicates
        if (pendingSubmitPaymentHandler) {
            return;
        };
        pendingSubmitPaymentHandler = true;
        const response = await stripe?.confirmSetup({
            elements,
            redirect: "if_required"
        });
        if (response?.error) {
            // payment failed, notify the user
            responseItem.error = response?.error.message;
        };

        stripe?.retrieveSetupIntent(stripeClientSecret)
        .then(({setupIntent}) => {
            switch (setupIntent?.status) {
                case "succeeded":
                    console.log("setup intent retrieved successfully!")
                    responseItem.success = "success saving payment method!";
                    elements = null;
                    addPaymentMethod = false;
                    // get payment methods if any
                    getPaymentMethods();
                    break;
                case "processing":
                    pendingSubmitPaymentHandler = true;
                    break;
                case "requires_payment_method":
                    // payment again
                    responseItem.error = "failed to process payment method.  Please try another payment method."
                    break;
            };
        });
    };

    $: if((responseItem.success) || (responseItem.error)) {
        pendingSubmitPaymentHandler = false;
    };

    let cancelPaymentMethodClicked: boolean = false;

    $: if (cancelPaymentMethodClicked) {
        elements = null;
        addPaymentMethod = false;
        cancelPaymentMethodClicked = false;
    };

    const detachPaymentMethodHandler = async (paymentMethodID: string) => {

        $ModalOpenStore = true;

        const paymentMethodData: PaymentMethodDeleteItem | any = {
            message: "payment method",
            data: paymentMethodID
        };

        $DeleteConfirmationStore = paymentMethodData;

    };
    const ConfirmedDeletePaymentMethod = async () => {
        const response = await fetch("/authenticated-client/api/detachPaymentMethod", {
            method: "POST",
            body: JSON.stringify({
                paymentMethodID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let paymentMethod;
        paymentMethod = await response.json();
        getPaymentMethods();
    };

    $: if ($DeleteConfirmedStore === true) {
        ConfirmedDeletePaymentMethod();
        $DeleteConfirmedStore = false;
    };

    let deletePaymentMethodClicked: boolean = false;

    $: if (deletePaymentMethodClicked) {
        // delete payment method click handler
        detachPaymentMethodHandler(paymentMethodID);
        deletePaymentMethodClicked = false;
    };

    let payInvoiceClicked: boolean = false;
    let pendingPaymentConfirmation: boolean = false;
    const payInvoice = async (invoiceClientSecret: string, paymentMethodID: string) => {
        pendingPaymentConfirmation = true;
        const response: PaymentIntentResult | undefined= await stripe?.confirmPayment({
            clientSecret: invoiceClientSecret,
            confirmParams: {
                payment_method: paymentMethodID,
            },
            redirect: "if_required"
        });
        if (!response) {
            pendingPaymentConfirmation = false;
            responseItem.error = "failed to process payment on invoice";
        } else {
            pendingPaymentConfirmation = false;
            responseItem.success = "successfully made payment on invoice"
            goto("/authenticated-client/client");
        };
    };        

    $: if (payInvoiceClicked) {
        // if no payment method, prompt the use to add payment method
        if (paymentMethods.length === 0) {
            $ModalOpenStore = true;
            const promptAddPayment: any = {
                message: "payment method required",
                data: "add a payment method to pay invoice"
            };
            $PromptStore = promptAddPayment;
        } else if (paymentMethods.length > 0) {
            // if payment method exists, continue to pay the invoice
            payInvoice(invoiceClientSecret, paymentMethodID);
        };
        payInvoiceClicked = false;
    };

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
                <PaymentMethodCard 
                    paymentMethod={paymentMethod}
                    bind:deleteClicked={deletePaymentMethodClicked}
                />
            {/each}
        {:else if !addPaymentMethod && (paymentMethods.length === 0)}
            <AddItemButton bind:addItemClicked={addPaymentMethodClickHandler}>
                Add payment method
            </AddItemButton>
        {:else if addPaymentMethod && (!stripeClientSecret || !stripe)}
            <LoadingSpinner />
        {:else if addPaymentMethod && stripeClientSecret && stripe}
            <div class="stripe_save_payment_method">
                <Elements
                    stripe={stripe}
                    clientSecret={stripeClientSecret}
                    theme="flat"
                    variables={{ 
                        colorPrimary: '#838B6A',
                        colorBackground: '#EFF9F2',
                        colorText: '#36261E',
                        colorDanger: '#914732',
                    }}
                    rules={{ '.Input': { border: 'solid 2px #AEA89D' } }}
                    bind:elements
                >
                    <form on:submit|preventDefault={submitPaymentMethodHandler} >
                        <LinkAuthenticationElement />
                        <PaymentElement />
                        <Address mode="billing" />
                        <div class="buttons_container">
                            <CancelSubmitButton bind:cancelClicked={cancelPaymentMethodClicked}>
                                cancel
                            </CancelSubmitButton>
                            <SubmitButton02>
                                save
                            </SubmitButton02>
                        </div>
                    </form>
                    {#if (pendingSubmitPaymentHandler)}
                        <PendingFlashMessage >
                            please wait while we validate your data
                        </PendingFlashMessage>
                    {:else if (responseItem.error)}
                        <ErrorFlashMessage >
                            {responseItem.error}
                        </ErrorFlashMessage>
                    {:else if (responseItem.success)}
                        <SuccessFlashMessage>
                            {responseItem.success}
                        </SuccessFlashMessage>
                    {/if}
                </Elements>
            </div>
        {/if}
    </ul>
    <div class="pay_invoice_button_container">
        <SubmitButton
            bind:clicked={payInvoiceClicked}
        >
            pay invoice
        </SubmitButton>
        {#if (pendingPaymentConfirmation)}
            <PendingFlashMessage >
                please wait while we validate payment
            </PendingFlashMessage>
        {:else if (responseItem.error)}
            <ErrorFlashMessage >
                {responseItem.error}
            </ErrorFlashMessage>
        {:else if (responseItem.success)}
            <SuccessFlashMessage>
                {responseItem.success}
            </SuccessFlashMessage>
        {/if}
    </div>
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
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stripe_save_payment_method {
        width: 100%;
    }

    .buttons_container {
        padding: 1rem 0;
    }

    .pay_invoice_button_container {
        padding: 1rem;
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