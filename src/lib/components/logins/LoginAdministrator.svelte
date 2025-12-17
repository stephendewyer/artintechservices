<script lang="ts">
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import PasswordInput from "$lib/components/inputs/PasswordInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import { goto } from '$app/navigation';
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";

    let emailInputValue: string = "";
    let emailIsValid: boolean = true;

    let passwordInputValue: string = "";
    let passwordIsValid: boolean = true;

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

    const loginAdministrator = async (
        email: string,
        password: string
    ) => {
        const response = await fetch("/api/authentication/loginAdministrator", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseItem = await response.json();
        return responseItem;
    };
        
    const loginAdministratorHandler = async () => {
        pending = true;
        try {
            await loginAdministrator(emailInputValue, passwordInputValue);
            if (responseItem.success) {
                goto("/authenticated-administrator/administrator");
            } else if (responseItem.error) {
                if ((emailInputValue === "") || (!emailInputValue.includes('@'))) {
                    emailIsValid = false;
                };
                if (passwordInputValue === "") {
                    passwordIsValid = false;
                };
            };
        } catch (error) {
            console.log(error);
        };
    };

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };

</script>

<form class="form" on:submit|preventDefault={loginAdministratorHandler}>
        <div class="input_row">
            <EmailInput
                bind:isValid={emailIsValid}
                placeholder="myEmail@myDomain.com"
                inputID="administrator_email"
                inputName="administrator_email"
                bind:emailInputValue={emailInputValue}
                inputLabel={true}
                required={true}
            >
                email:
            </EmailInput>
        </div>
        <div class="input_row">
            <PasswordInput
                bind:isValid={passwordIsValid}
                placeholder="myPassword"
                inputID="administrator_password"
                inputName="administrator_password"
                inputLabel={true}
                bind:value={passwordInputValue}
                required={true}
                passwordInputErrorMessage="password required"
            >
                password:
            </PasswordInput>
        </div>
        <div class="buttons_container">
            <SubmitButton 
                disable={false}
            >
                login
            </SubmitButton>
        </div>
    </form>
    {#if (pending)}
        <PendingFlashMessage >
            please wait while we validate your credentials
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
    <div class="login_helpers_container">
        <div class="login_helpers_column">
            <h4 class="login_helper_prompt">
                forgot your password?
            </h4>
            <a href="/reset-administrator-password">
                <ActionButtonSecondary>
                    reset password
                </ActionButtonSecondary>
            </a>
        </div>
    </div>

    <style>

    .input_row {
        width: 100%;
        max-width: 28rem;
    }

    .login_helpers_container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
        width: 100%;
    }

    .login_helpers_column {
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
    }

    .login_helper_prompt {
        font-size: 1.175rem;
        text-align: center;
        width: 100%;
    }

    @media screen and (max-width: 1080px) {

        .login_helpers_container {
            flex-direction: column;
        }

        .login_helpers_column {
            width: 100%;
            gap: 0.5rem;
        }
    }

</style>