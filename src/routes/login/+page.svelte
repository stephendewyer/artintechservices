<script lang="ts">
    import Tabs from "$lib/components/tabPanelLogins/Tabs.svelte";
    import Panel from "$lib/components/tabPanelLogins/Panel.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import LoginAdministrator from "$lib/components/tabPanelLogins/LoginAdministratorPanel.svelte";
    import LoginClient from "$lib/components/tabPanelLogins/LoginClientPanel.svelte";

    let activeTabLogins: number = 0;

    let tabPanelLogins: TabPanel[];

    $: tabPanelLogins = [
        {
            id: uuidv4(),
            index: 0,
            label: "client",
            tabImageSrc: "",
            panel: LoginClient,
            data: []
        },
        {
            id: uuidv4(),
            index: 1,
            label: "administrator",
            tabImageSrc: "",
            panel: LoginAdministrator,
            data: []
        },
    ];


</script>

<div class="page">
    <div class="login_section">
        <h2>
            I'm a(n) ...
        </h2>
        <Tabs 
            tabPanels={tabPanelLogins} 
            bind:activeTab={activeTabLogins}
        />
        <Panel 
            tabPanels={tabPanelLogins} 
            bind:activeTab={activeTabLogins}
        />			
    </div>
</div>

<style>
    .login_section {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0 0 2rem 0;
    }
</style>