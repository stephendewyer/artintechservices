<script lang="ts">

    export let price: Price;

</script>
<div class="pricing_card">
    <h3 class="title">
        {price.title}
    </h3>
    <h4 class="price">
        <span>starting at </span><span>{price.range}</span>
    </h4>
    <div class="features">
        <p class="header">
            {price.header}
        </p>
        <ul class="list">
            {#each price.details as detail}
                <li>
                    {detail}
                </li>
            {/each}
        </ul>
    </div>
    
</div>
<style>
    .pricing_card {
        border: 2px solid #36261E;
        border-radius: 1rem;
        padding: 1rem;
        width: 24rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .price {
        text-align: center;
    }

    .title {
        text-align: center;
    }

    .header {
        margin: 0;
    }

    .features {
        width: 100%;
    }

    @media screen and (max-width: 720) {
        .pricing_card {
            width: 100%;
        }
    }

</style>