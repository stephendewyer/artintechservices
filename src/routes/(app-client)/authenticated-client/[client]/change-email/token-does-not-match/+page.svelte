<script lang="ts">
  import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
</script>
<div class="container">
    <h1>
        The change email token in the params does not match the saved change email token for your account.
    </h1>
    <a href="/authenticated-client/client/account">
        <ActionButtonSecondary>
            send another email
        </ActionButtonSecondary>
    </a>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 60rem;
        margin: 0 auto;
    }

</style>
