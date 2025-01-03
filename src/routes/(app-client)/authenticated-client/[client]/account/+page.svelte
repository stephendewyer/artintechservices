<script lang="ts">
    import SettingsIcon from "$lib/images/icons/settings_icon.svg?raw";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import ActionButtonSecondary from "$lib/components/buttons/ActionButtonSecondary.svelte";
    
    let emailIsValid: boolean = true;
    let emailInputValue: string = "";

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

    const sendEmail = async (
        email: string
    ) => {
        const response = await fetch("/api/authentication/resetPassword/resetPasswordClient", {
            method: "POST",
            body: JSON.stringify({
                email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseItem = await response.json();
        // console.log(responseItem);
        return responseItem;
    };

    let pending: boolean = false;

    const sendEmailHandler = async () => {
        pending = true;
        try {
            await sendEmail(
                emailInputValue
            );
            if (responseItem.success) {
                emailInputValue = "";
            } else if (responseItem.error) {
                if ((emailInputValue === "") || (!emailInputValue.includes('@'))) {
                    emailIsValid = false;
                };
            };
        } catch (error) {
            console.log(error);
        };
    };

    $: if ((responseItem.error) || (responseItem.success)) {
        pending = false;
    };
</script>

<svelte:head>
	<title>Art in Tech Services - my client account</title>
	<meta name="description" content="my client account page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<section class="account_page">
    <div class="account_heading">
        <h1>account</h1>
        <div class="settings_icon">
            {@html SettingsIcon}
        </div>
    </div>
    <h2>reset password</h2>
    <h2>delete account</h2>

</section>

<style>
    .account_page {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .account_heading {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    .settings_icon {
        width: 6rem;
    }
</style>