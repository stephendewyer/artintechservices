<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_STRIPEPUBLISHABLEKey } from '$env/static/public';
    import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js';
    import { Elements, LinkAuthenticationElement, PaymentElement, Address } from 'svelte-stripe';
    import PaymentMethodCard from "$lib/components/cards/PaymentMethodCard.svelte";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import AddItemButton from "$lib/components/buttons/AddItemButton.svelte";
    import { page } from "$app/stores";
    import { ModalOpenStore } from "$lib/stores/ModalOpenStore";
    import { DeleteConfirmationStore } from "$lib/stores/DeleteConfirmationStore";
    import { DeleteConfirmedStore } from "$lib/stores/DeleteConfirmedStore";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SubmitButton02 from "$lib/components/buttons/SubmitButton02.svelte";
    import Billing from "$lib/images/icons/billing.svg?raw";
    import ActionButtonTertiary from "$lib/components/buttons/ActionButtonTertiary.svelte";
    import { ClientPageWidthStore } from "$lib/stores/ClientPageWidthStore";

    $: console.log("$clientPageWidthStore: ", $ClientPageWidthStore);

    let clientEmail = $page.data.streamed.user?.email;

    let elements: StripeElements | any = null;

    let stripe: Stripe | null = null;

    const loadStripeHandler = async () => {
        stripe = await loadStripe(PUBLIC_STRIPEPUBLISHABLEKey);
    };

    onMount(() => {
        loadStripeHandler(); 
    });

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

    let stripeCustomerID: string;

    let clientFinancials: any = {};

    let balance: number | null = null;

    let paymentMethods: PaymentMethodData;

    let pendingClientFinancials: boolean = false;

    let getClientInvoicesSuccess: boolean = false;

    let clientInvoices: any[] = [];

    let totalAmountDue: number = 0;

    const getClientFinancials = async () => {

        pendingClientFinancials = true;

        try {
            
            const response = await fetch("/authenticated-client/api/getClientFinancials", {
                method: "POST",
                body: JSON.stringify({
                    clientEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            clientFinancials = {...await response.json()};
            console.log(clientFinancials)

            if (response.ok) {
                totalAmountDue = clientFinancials.totalAmountDue
                balance = clientFinancials.billing.data[0]?.balance !== undefined ? clientFinancials.billing.data[0].balance : "";
                stripeCustomerID = clientFinancials.contact_information?.Stripe_customer_ID;
                clientInvoices = [...clientFinancials.invoices.data];
                paymentMethods = clientFinancials.payment_methods;
                pendingClientFinancials = false;
                getClientInvoicesSuccess = true;
            } else if (!response.ok) {
                pendingClientFinancials = false;
                getClientInvoicesSuccess = false;
            };
        } catch(err) {
            console.log(err);
        };
        
    };

    onMount(() => {
        getClientFinancials();
    });

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
        paymentMethods = await response.json();
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

    let addPaymentMethodClickHandler: boolean = false;

    let pendingPaymentSetup: boolean = false;

    let stripeClientSecret: string;

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
        const paymentMethodID = paymentMethods?.data[0].id;
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
        detachPaymentMethodHandler(paymentMethods?.data[0].id);
        deletePaymentMethodClicked = false;
    };

    let innerWidth: number = 0;

</script>

<svelte:window bind:innerWidth />

<section class="invoicing_page" style={innerWidth >= 720 ? `max-width: ${$ClientPageWidthStore}px;` : "max-width: 100%;"}>
    <h1 class="header_and_icon">
        invoicing
        <div class="invoicing_icon_container">
            {@html Billing}
        </div>
    </h1>
    {#if pendingClientFinancials}
        <LoadingSpinner />
    {:else}
    <div class="total_amount_due_container">
        <table>
            <tbody>
                <tr>
                    <td>
                        total amount due:
                    </td>
                    <td>
                        {(totalAmountDue / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
        
        <h2>
            invoices
        </h2>
        <div class="table_container" >
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
                            action
                        </th>
                    </tr>
                    {#each clientInvoices as invoice, index}
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
                                    <a href={`/authenticated-client/client/make-a-payment?invoice-ID=${invoice.id}&client-email=${clientEmail}`}>
                                        <ActionButtonTertiary parentControlled={false}>
                                            pay invoice
                                        </ActionButtonTertiary>
                                    </a>
                                {:else if (invoice.paid)}
                                    payment completed
                                {/if}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <section class="section_even">
        </section>
        <h3>
            billing information
        </h3>
        {#if (paymentMethods?.data?.length > 0)}
            {#each paymentMethods.data as paymentMethod, index}
                <PaymentMethodCard 
                    paymentMethod={paymentMethod} 
                    bind:deleteClicked={deletePaymentMethodClicked}
                />
            {/each}
        {:else if !addPaymentMethod && (paymentMethods?.data?.length === 0)}
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
                            <SubmitButton02>
                                save
                            </SubmitButton02>
                            <CancelButton bind:cancelClicked={cancelPaymentMethodClicked}>
                                cancel
                            </CancelButton>
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
    {/if}
</section>

<style>

    .invoicing_page {
        position: relative;
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 0 3rem 1rem 0;
    }

    .header_and_icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .invoicing_icon_container {
        width: 12rem;
    }

    .total_amount_due_container {
        width: 100%;
    }

    .table_container {
        position: relative;
        overflow-x: auto;
        width: 100%;
        display: block;
        padding: 0 1rem 1rem 1rem;
    }

    .invoices_table {
        position: relative;
        width: 100%;
        min-width: 100%;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .stripe_save_payment_method {
        width: 100%;
        max-width: 60rem;
    }

    @media screen and (max-width: 1440px) {

        .invoices_table {
            min-width: 60rem;
        }

    }

    @media screen and (max-width: 1080px) {
        .invoices_table {
            min-width: 60rem;
        }
    }

    @media screen and (max-width: 720px) {
        .invoicing_page {
            padding: 0 1rem 1rem 1rem;
        }
    }
</style>