<script lang="ts">
    import Tabs from "$lib/components/tabPanelAccount/Tabs.svelte";
    import Panel from "$lib/components/tabPanelAccount/Panel.svelte";
    import SettingsIcon from "$lib/images/icons/settings_icon.svg?raw";
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import { v4 as uuidv4 } from 'uuid';
    import DeleteAccountPanel from "$lib/components/tabPanelAccount/DeleteAccountPanel.svelte";
    import ChangeEmailPanel from "$lib/components/tabPanelAccount/ChangeEmailPanel.svelte";
    import ResetPasswordPanel from "$lib/components/tabPanelAccount/ResetPasswordPanel.svelte";  

    const nameFirst: string | undefined | null = $page.data.streamed?.name_first;
    const nameLast: string | undefined | null = $page.data.streamed?.name_last
    const email: string | undefined | null = $page.data.streamed?.user.email;
    
    let activeTab: number = 0;

    $: tabPanelsAccount = [
        {
            id: uuidv4(),
            index: 0,
            label: "change email",
            tabImageSrc: "",
            panel: ChangeEmailPanel,
            data: [
                {
                    userEmail: email,
                    name: `${nameFirst} ${nameLast}`
                }
            ]
        },
        {
            id: uuidv4(),
            index: 1,
            label: "reset password",
            tabImageSrc: "",
            panel: ResetPasswordPanel,
            data: [
                {
                    userEmail: email,
                    name: `${nameFirst} ${nameLast}`
                }
            ]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "delete account",
            tabImageSrc: "",
            panel: DeleteAccountPanel,
            data: [
                {
                    userEmail: email,
                    name: `${nameFirst} ${nameLast}`
                }
            ]
        },
    ];

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
    <div class="tabs_container">
        <Tabs 
            bind:activeTab
            tabPanels={tabPanelsAccount}
        />
    </div>
    <Panel 
        bind:activeTab
        tabPanels={tabPanelsAccount}
    />
    
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

    .form {
        width: 32rem;
    }

    .input_row {
        width: 100%;
    }

    .delete_account {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        padding: 0 0 2rem 0;
    }
</style>