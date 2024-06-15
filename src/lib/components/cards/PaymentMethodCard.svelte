<script lang="ts">
    import DeleteButton from "../buttons/DeleteButton.svelte";
    export let paymentMethod;
    export let deleteClicked: boolean = false;

    console.log(paymentMethod)

</script>

<li class="payment_method_card">
    <h4>
        {paymentMethod.type}
    </h4>
    {#if (paymentMethod.type === "us_bank_account")}
        <li>
            {paymentMethod.us_bank_account.bank_name}
        </li>
        <li>
            ...{paymentMethod.us_bank_account.last4}
        </li>
    {:else if (paymentMethod.type === "card")}
        <li>
            {paymentMethod.card.brand}
        </li>
        <li>
            ...{paymentMethod.card.last4}
        </li>
        <li>
            expires: {paymentMethod.card.exp_month}/{paymentMethod.card.exp_year}
        </li>
    {/if}
    <p>
        added: {new Date(paymentMethod.created * 1000).toUTCString().slice(0, 16)}
    </p>
    <div class="buttons_container">
        <DeleteButton bind:clicked={deleteClicked}>
            delete
        </DeleteButton>
    </div>
</li>

<style>
    .payment_method_card {
        display: flex;
        list-style: none;
        flex-direction: column;
        width: 20rem;
        margin: 0 auto;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
    }

    .buttons_container {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-end;
    }
</style>