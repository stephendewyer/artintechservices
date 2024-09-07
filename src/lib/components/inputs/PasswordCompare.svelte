<script lang="ts">
    import PasswordInput from './PasswordInput.svelte';
    import PasswordsMismatchMessage from '$lib/components/errorMessages/PasswordsMismatchMessage.svelte';
    import PasswordsMatchMessage from '$lib/components/successMessages/PasswordsMatchMessage.svelte';

    export let passwordInputValue: string = "";
    export let passwordReenteredInputValue: string = "";
    export let passwordIsValid: boolean = true;
    export let passwordReenteredIsValid: boolean = true;
    let passwordInputTouched: boolean = false;
    let passwordReenteredInputTouched: boolean = false;

    export let passwordsMatch: boolean | null = null;
    export let missingPassword: boolean = false;

    let passwordReenteredInputValueLength: number = 0;
    
    let parsedPassword: string = "";

    $: parsedPassword = passwordInputValue.substring(0, passwordReenteredInputValueLength);

    let parsedReenteredPassword: string = "";
    
    $: parsedReenteredPassword = passwordReenteredInputValue.substring(0, passwordInputValue.length);

    $: passwordReenteredInputValueLength = passwordReenteredInputValue.length;

    let passwordInputValueChanged: boolean = false;

    $: if (passwordInputValueChanged) {
        
        if (
            !passwordReenteredInputTouched &&
            passwordReenteredInputValue === ""
        ) {
            passwordsMatch = null;
            missingPassword = false;
        } else if (
            (passwordReenteredInputTouched || passwordInputTouched) &&
            passwordInputValue === "" &&
            passwordReenteredInputValue === ""
        ) {
            missingPassword = true;
            passwordsMatch = null;
        } else if (
            parsedPassword !== passwordReenteredInputValue
        ) {
            passwordsMatch = false;
            missingPassword = false;
        } else if (
            (parsedPassword === passwordReenteredInputValue) &&
            (passwordInputValue.length > passwordReenteredInputValueLength)
        ) {
            passwordsMatch = null;
            missingPassword = false;
        } else if (
            (passwordInputValue.length <= passwordReenteredInputValueLength) &&
            (parsedReenteredPassword !== passwordInputValue)
        ) {
            passwordsMatch = false;
            missingPassword = false;
        } else if (
            (passwordReenteredInputValue === passwordInputValue) && 
            (passwordInputValue !== "") && 
            (passwordReenteredInputValue !== "")
        ) {
            missingPassword = false;
            passwordsMatch = true;
        };
        passwordInputValueChanged = false;
    };

    let passwordReenteredInputValueChanged: boolean = false;

    $: if (passwordReenteredInputValueChanged) {

        if (passwordInputValue === "" && passwordReenteredInputValue === "") {
            passwordsMatch = null;
            missingPassword = true;
        } else if (passwordInputValue === "" && passwordReenteredInputValue !== "") {
            passwordsMatch = false;
            missingPassword = false;
        } else if ((passwordInputValue.length < passwordReenteredInputValueLength)) {
            passwordsMatch = false;
            missingPassword = false;
        } else if (
            (passwordInputValue.length > passwordReenteredInputValueLength) && 
            (parsedPassword === passwordReenteredInputValue)
        ) {
            passwordsMatch = null;
            missingPassword = false;
        } else if (
            (passwordInputValue.length >= passwordReenteredInputValueLength) && 
            (parsedPassword !== passwordReenteredInputValue)
        ) {
            passwordsMatch = false;
            missingPassword = false;
        } else if (
            (passwordReenteredInputValue === passwordInputValue) && 
            (passwordInputValue !== "") && 
            (passwordReenteredInputValue !== "")
        ) {
            missingPassword = false;
            passwordsMatch = true;
        };
        passwordReenteredInputValueChanged = false;
    };

</script>
<div class="password_compare">
    <div class="password_inputs">
        <div class="password_input">
            <PasswordInput 
                isValid={passwordIsValid}
                placeholder="myPassword"
                inputID="voter_password"
                inputName="voter_password"
                inputLabel={true}
                bind:passwordInputValue={passwordInputValue}
                required={true}
                passwordInputErrorMessage="password required"
                passwordsMatch={passwordsMatch}
                bind:inputValueChanged={passwordInputValueChanged}
                bind:passwordInputTouched={passwordInputTouched}
            >
                <slot name="password_label" />
            </PasswordInput>
        </div>
        <div class="password_input">
            <PasswordInput 
                isValid={passwordReenteredIsValid}
                placeholder="myPassword"
                inputID="voter_password_reentered"
                inputName="voter_password_reentered"
                inputLabel={true}
                bind:passwordInputValue={passwordReenteredInputValue}
                required={true}
                passwordInputErrorMessage="re-entered password required"
                passwordsMatch={passwordsMatch}
                bind:inputValueChanged={passwordReenteredInputValueChanged}
                bind:passwordInputTouched={passwordReenteredInputTouched}
            >
                <slot name="re-entered_password_label" />
            </PasswordInput>
        </div>
    </div>
    <div class="passwords_check_container">
        <div class="passwords_check">
                {#if (passwordsMatch === true)}
                    <PasswordsMatchMessage>passwords match!</PasswordsMatchMessage>
                {:else if (passwordsMatch === null)}
                    <p></p>
                {:else if (passwordsMatch === false)}
                    <PasswordsMismatchMessage>passwords do not match!</PasswordsMismatchMessage>
                {/if}     
        </div>
    </div>
</div>

<style>
    .password_compare {
        position: relative;
        display: flex;
        flex-direction: row;
        position: relative;
        width: 100%;
    }

    .password_inputs {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
    }

    .passwords_check_container {
        position: relative;
    }

    .passwords_check {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    @media screen and (max-width: 1080px) {
        .passwords_check {
            position: relative;
        }

        .password_compare {
            flex-direction: column;
            gap: 0.25rem;
            position: relative;
            width: 100%;
        }
    }

</style>