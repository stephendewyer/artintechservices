<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import MessagesIcon from "$lib/images/icons/email_icon.svg?raw";
    import SearchInput from "$lib/components/inputs/SearchInput.svelte";
    import DateInput from "$lib/components/inputs/DateInput.svelte";
    import Tabs from "$lib/components/tabPanelAdministrator/Tabs.svelte";
    import Panel from "$lib/components/tabPanelAdministrator/Panel.svelte";
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
    let searchDateInputValue: string = "";
    let searchDateInputValueChange: boolean = false;

    
</script>

<svelte:head>
	<title>Art in Tech Services - messages</title>
	<meta name="description" content="messages page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<section class="messages_page">
    <div class="messages_heading">
        <h1>messages</h1>
        <div class="messages_icon">
            {@html MessagesIcon}
        </div>
    </div>
    <h4 class="indicates_required_heading">indicates requred*</h4>
    <form class="search_all_messages_form">
        <h2>search all messages</h2>
        <div class="form_row">
            <SearchInput
                placeholder="firstname lastname | project X needs Y"
                inputID="contact_or_subject_search"
                inputName="contact_or_subject_search"
                inputLabel={true}
                bind:searchInputValue={searchContactOrSubjectInputValue}
                bind:searchInputValueChange={searchContactOrSubjectValueChange}
            >
                contact or subject
            </SearchInput>
            <div class="date_input_container">
                <DateInput
                    inputID="project_end_date"
                    inputName="project_end_date"
                    inputLabel={true}
                    bind:dateInputValue={searchDateInputValue}
                    bind:dateInputValueChange={searchDateInputValueChange}
                    isValid={true}
                    dateInputErrorMessage="project end date required"
                    required={false}
                >
                    date
                </DateInput>   
            </div>
        </div>
        
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
        padding: 0 1rem 1rem 1rem;
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

    .search_all_messages_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .form_row {
        display: flex;
        width: 100%;
        flex-direction: row;
        gap: 1rem;
    }

    .messages_container {
        width: 100%;
    }

    @media screen and (max-width: 720px) {
        .form_row {
            flex-direction: column;
        }
    }
</style>