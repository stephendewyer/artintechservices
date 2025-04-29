<script lang="ts">
    import DeleteButton from "../buttons/DeleteButton.svelte";
    export let paymentMethod;
    export let deleteClicked: boolean = false;

</script>

<li class="payment_method_card">
    <div class="payment_method_header">
        <h3>
            method
        </h3>
        <DeleteButton bind:clicked={deleteClicked}>
            delete
        </DeleteButton>
    </div>
    {#if (paymentMethod.type === "us_bank_account")}
        <table>
            <colgroup>
                <col style="width: 40%" />
                <col style="width: 60%" />
            </colgroup>
            <tbody style="box-shadow: none;">
                <tr>
                    <td>
                        type: 
                    </td>
                    <td>
                        {paymentMethod.type}
                    </td>
                </tr>
                <tr>
                    <td>
                        bank name: 
                    </td>
                    <td>
                        {paymentMethod.us_bank_account.bank_name}
                    </td>
                </tr>
                <tr>
                    <td>
                        account: 
                    </td>
                    <td>
                        ...{paymentMethod.us_bank_account.last4}
                    </td>
                </tr>
            </tbody>
        </table>
    {:else if (paymentMethod.type === "card")}
        <table >
            <colgroup>
                <col style="width: 40%" />
                <col style="width: 60%" />
            </colgroup>
            <tbody style="box-shadow: none;">
                <tr>
                    <td>
                        type: 
                    </td>
                    <td>
                        {paymentMethod.type}
                    </td>
                </tr>
                <tr>
                    <td>
                        brand: 
                    </td>
                    <td>
                        {paymentMethod.card.brand}
                    </td>
                </tr>
                <tr>
                    <td>
                        account: 
                    </td>
                    <td>
                        ...{paymentMethod.card.last4}
                    </td>
                </tr>
                <tr>
                    <td>
                        expiration: 
                    </td>
                    <td>
                        {paymentMethod.card.exp_month}/{paymentMethod.card.exp_year}
                    </td>
                </tr>
                <tr>
                    <td>
                        added: 
                    </td>
                    <td>
                        {new Date(paymentMethod.created * 1000).toUTCString().slice(0, 16)}
                    </td>
                </tr>
            </tbody>
        </table>
    {/if}
</li>

<style>
    .payment_method_card {
        position: relative;
        display: flex;
        list-style: none;
        flex-direction: column;
        width: 100%;
        max-width: 32rem;
        margin: 0 auto;
        padding: 1rem 0;
        border-radius: 1rem;
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .payment_method_header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
    }

</style>