<script lang="ts">
    import PasswordInput from './PasswordInput.svelte';
    import PasswordsMismatchMessage from '$lib/components/errorMessages/PasswordsMismatchMessage.svelte';
    import PasswordsMatchMessage from '$lib/components/successMessages/PasswordsMatchMessage.svelte';

    export let passwordInputValue: string = "";
    export let passwordReenteredInputValue: string = "";
    export let passwordIsValid: boolean = true;
    export let passwordReenteredIsValid: boolean = true;

    export let passwordsMatch: boolean | null = null;

    let passwordReenteredInputValueLength: number = 0;

    $: passwordReenteredInputValueLength = passwordReenteredInputValue.length;

    let parsedPassword: string = "";

    $: parsedPassword = passwordInputValue.substring(0, passwordReenteredInputValueLength);

    // if reentered password and password match and are not empty, passwords match
    // if incomplete reentered password matched parsed password, passwords match is null
    // if incomplete reentered pasword does not match parsed password, passwords match is false
    $: if (
            (passwordReenteredInputValue === passwordInputValue) && 
            (passwordInputValue !== "") && 
            (passwordReenteredInputValue !== "")
        ) {
        passwordsMatch = true;
    };
    
    $: if ( 
            (parsedPassword === passwordReenteredInputValue) &&
            (passwordInputValue.length > passwordReenteredInputValueLength)
    ) {
        passwordsMatch = null;
    };
    
    $: if (
        (parsedPassword !== passwordReenteredInputValue)
    ) {
        passwordsMatch = false;
    };

</script>
<div>
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
        >
            <slot name="re-entered_password_label" />
        </PasswordInput>
    </div>
    
    {#if (passwordsMatch === true)}
        <PasswordsMatchMessage>passwords match!</PasswordsMatchMessage>
    {:else if (passwordsMatch === null)}
        <p></p>
    {:else if (passwordsMatch === false)}
        <PasswordsMismatchMessage>passwords do not match!</PasswordsMismatchMessage>
    {/if}

</div>

<style>

    .password_input {
        padding: 0.5rem 0;
    }

</style>