<script lang="ts">
    import SubmitButton02 from "../buttons/SubmitButton02.svelte";
    import ErrorFlashMessage from "../flashMessages/ErrorFlashMessage.svelte";
    import PendingFlashMessage from "../flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "../flashMessages/SuccessFlashMessage.svelte";
    import { page } from "$app/stores";
    import TextInputReadOnly from "../inputs/TextInputReadOnly.svelte";

    export let panel_data;

    let pendingDeleteAccountEmail: boolean = false;


    const sessionEmail = $page.data.streamed.user?.email;
    
    // after change email submit

    let emailIsValid: boolean = true;

    let emailInputValue: string = "";

    let responseDeleteAccoutEmailItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    $: if((responseDeleteAccoutEmailItem.success) || (responseDeleteAccoutEmailItem.error)) {
        setTimeout(() => {
            responseDeleteAccoutEmailItem.success = "";
            responseDeleteAccoutEmailItem.error = "";
            responseDeleteAccoutEmailItem.status = null;
        }, 4000);
    };

    const sendDeleteAccountVerificationEmail = async (
        sessionEmail: string | null | undefined,
        name: string
    ) => {
        const response = await fetch("/authenticated-client/api/sendDeleteAccountVerificationEmail", {
            method: "POST",
            body: JSON.stringify({
                sessionEmail,
                name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseDeleteAccoutEmailItem = await response.json();
        return responseDeleteAccoutEmailItem;

    };

    const sendDeleteAccountVerificationEmailHandler = async () => {
        pendingDeleteAccountEmail = true;
        try {
            await sendDeleteAccountVerificationEmail (
                sessionEmail,
                panel_data[0].name
            );
            if (responseDeleteAccoutEmailItem.success) {
                emailInputValue = "";
            };
        } catch (error) {
            console.log(error);
        };
    };

    $: if ((responseDeleteAccoutEmailItem.error) || (responseDeleteAccoutEmailItem.success)) {
        pendingDeleteAccountEmail = false;
    };


</script>
<section>
    <form 
    on:submit|preventDefault={sendDeleteAccountVerificationEmailHandler}
    class="form"
    >
        <h2>delete account</h2>
        <p style="padding: 0; margin: 0;">
            Do you want to permanently delete your account?
        </p>
        <p>
            You can only delete your account once all invoices have been paid in full, any open projects have been completed and no consultations requests remain.
        </p>
        <div class="input_row">
            <TextInputReadOnly
                bind:isValid={emailIsValid}
                placeholder="myEmail@myDomain.com"
                inputID="client_email"
                inputName="client_email"
                bind:textInputValue={panel_data[0].userEmail}
                inputLabel={true}
                required={true}
            >
                email
            </TextInputReadOnly>
        </div>
        <div class="buttons_container">
            <SubmitButton02
                disable={false}
            >
                send verification link
            </SubmitButton02>
        </div>
        {#if (pendingDeleteAccountEmail)}
            <PendingFlashMessage >
                please wait while we validate your data
            </PendingFlashMessage>
        {:else if (responseDeleteAccoutEmailItem.error)}
            <ErrorFlashMessage >
                {responseDeleteAccoutEmailItem.error}
            </ErrorFlashMessage>
        {:else if (responseDeleteAccoutEmailItem.success)}
            <SuccessFlashMessage>
                {responseDeleteAccoutEmailItem.success}
            </SuccessFlashMessage>
        {/if}
    </form>
</section>
<style>
    .form {
        width: 100%;
    }

    .input_row {
        width: 100%;
        max-width: 40rem;
    }
</style>