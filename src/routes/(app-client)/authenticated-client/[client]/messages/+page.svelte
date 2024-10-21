<script lang="ts">
    import MessagesIcon from "$lib/images/icons/email_icon.svg?raw";
    import SearchInput from "$lib/components/inputs/SearchInput.svelte";
    import DateInput from "$lib/components/inputs/DateInput.svelte";
    import Tabs from "$lib/components/tabPanelClient/Tabs.svelte";
    import Panel from "$lib/components/tabPanelClient/Panel.svelte";
    import SentMessagesPanel from "$lib/components/messagesPanels/SentPanel.svelte";
    import DeletedPanel from "$lib/components/messagesPanels/DeletedPanel.svelte";
    import CreateMessagePanel from "$lib/components/messagesPanels/CreateMessagePanel.svelte";
    import InboxPanel from "$lib/components/messagesPanels/InboxPanel.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";

    let pendingMessages: boolean = false;

    let activeTabMessages: number = 0;

    $: tabPanelsMessages = [
        {
            id: uuidv4(),
            index: 0,
            label: "create",
            tabImageSrc: "",
            panel: CreateMessagePanel,
            data: []
        },
        {
            id: uuidv4(),
            index: 1,
            label: "inbox",
            tabImageSrc: "",
            panel: InboxPanel,
            data: []
        },
        {
            id: uuidv4(),
            index: 2,
            label: "sent",
            tabImageSrc: "",
            panel: SentMessagesPanel,
            data: []
        },
        {
            id: uuidv4(),
            index: 4,
            label: "deleted",
            tabImageSrc: "",
            panel: DeletedPanel,
            data: []
        },
    ];

    let searchContactOrSubjectInputValue: string = "";
    let searchContactOrSubjectValueChange: boolean = false;
</script>
<section class="messages_page">
    <div class="messages_heading">
        <h1>messages</h1>
        <div class="messages_icon">
            {@html MessagesIcon}
        </div>
    </div>
    <form>
        <SearchInput
            placeholder="I want a web application to ..."
            inputID="about_project"
            inputName="about_project"
            inputLabel={true}
            bind:searchInputValue={searchContactOrSubjectInputValue}
            bind:searchInputValueChange={searchContactOrSubjectValueChange}
        >

        </SearchInput>
    </form>
    <div class="messages_container">
        {#if pendingMessages}
            <LoadingSpinner />
        {:else}
            <Tabs 
                tabPanels={tabPanelsMessages} 
                bind:activeTab={activeTabMessages}
            />
            <Panel 
                tabPanels={tabPanelsMessages} 
                bind:activeTab={activeTabMessages}
            />
        {/if}
    </div>
    
</section>

<style>

    .messages_page {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    .messages_heading {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .messages_icon {
        width: 12rem;
    }

    .messages_container {
        width: 100%;
    }
</style>