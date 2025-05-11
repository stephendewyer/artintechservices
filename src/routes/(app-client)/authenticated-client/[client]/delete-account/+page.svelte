<script lang="ts">
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    
    const sessionEmail = $page.data.streamed.user?.email;

    // after submit

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
        }, 4000)
    };

    let pending: boolean = false;

    const deleteAccount = async (
        sessionEmail: string | null
    ) => {
        const response = await fetch("/authenticated-client/api/deleteClientAccount", {
            method: "DELETE",
            body: JSON.stringify({
                sessionEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseItem = await response.json();
        console.log(responseItem);
        return responseItem;
    };

    const deleteAccountHandler = async () => {
        pending = true;
        try {
            await deleteAccount(
                sessionEmail
            );
            if (responseItem.success) {
                signOut({
                    redirect: true,
                    callbackUrl: "/create-a-client-account"
                });
            };

        } catch (error) {
            console.log(error);
        };
    };

    $: if((responseItem.error) || (responseItem.success)) {
        pending = false;
    };

</script>
<div class="container">
    <form class="form" on:submit|preventDefault={deleteAccountHandler}>
        <h1>delete account</h1>
        <p>Do you wish to permanently delete your Art in Tech Services client account?</p>
        <SubmitButton disable={false}>
            delete my account
        </SubmitButton>
    </form>
    {#if (pending)}
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
</div>

<style>
    .input_row {
        width: 100%;
        max-width: 28rem;
    }

</style>