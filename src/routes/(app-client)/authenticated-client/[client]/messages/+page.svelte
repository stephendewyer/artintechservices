<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import MessagesIcon from "$lib/images/icons/email_icon.svg?raw";
    // import SearchInput from "$lib/components/inputs/SearchInput.svelte";
    // import DateInput from "$lib/components/inputs/DateInput.svelte";
    import DraftsPanel from "$lib/components/messagesPanels/DraftsPanel.svelte";
    import Tabs from "$lib/components/tabPanelClient/Tabs.svelte";
    import Panel from "$lib/components/tabPanelClient/Panel.svelte";
    import SentMessagesPanel from "$lib/components/messagesPanels/SentPanel.svelte";
    import DeletedPanel from "$lib/components/messagesPanels/DeletedPanel.svelte";
    import CreateMessagePanel from "$lib/components/messagesPanels/CreateMessagePanel.svelte";
    import InboxPanel from "$lib/components/messagesPanels/InboxPanel.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import { onMount } from "svelte";
    import { MessagesStore } from "$lib/stores/MessagesStore";
    import { UpdateMessagesStore } from "$lib/stores/UpdateMessagesStore";

    const sessionEmail = $page.data.streamed.user?.email;

    let activeTabMessages: number = 0;

    // get all messages for the client

    let pendingGetClientMessages: boolean = false;

    let getClientMessagesSuccess: boolean | null = null;

    let clientMessages: Message[];

    let sentMessages: Message[] = [];
    let receivedMessages: Message[] = [];
    let draftMessages: Message[] = [];
    let deletedMessages: Message[] = [];

    const getClientMessages = async (sessionEmail: string) => {

        pendingGetClientMessages = true;

        const response = await fetch("/authenticated-client/api/getClientMessages", {
            method: "POST",
            body: JSON.stringify({
                sessionEmail
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            pendingGetClientMessages = false;
            getClientMessagesSuccess = true;
            clientMessages = [];
            clientMessages = await response.json();
            console.log(clientMessages);
            sentMessages = [];
            receivedMessages = [];
            draftMessages = [];
            deletedMessages = [];
            $MessagesStore = [];
            $MessagesStore = [...clientMessages];
            $MessagesStore.forEach((message: Message) => {
                if (message.status === "sent" && message.receiver_role === "administrator") {
                    sentMessages = [...sentMessages, message];
                } else if (message.status === "sent" && message.receiver_role === "client") {
                    receivedMessages = [...receivedMessages, message];
                } else if (message.status === "saved") {
                    draftMessages = [...draftMessages, message];
                } else if (message.status === "deleted") {
                    deletedMessages = [...deletedMessages, message];
                };
            });
            console.log(draftMessages)
            // update the MessagesStore
            return $MessagesStore;
        } else {
            pendingGetClientMessages = false;
            getClientMessagesSuccess = false;
        };
        
    };

    onMount(() => {
        getClientMessages(sessionEmail);
    });

    $: if ($UpdateMessagesStore === true) {
        getClientMessages(sessionEmail);
        $UpdateMessagesStore = false;
    };

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
            data: [...receivedMessages]
        },
        {
            id: uuidv4(),
            index: 2,
            label: "sent",
            tabImageSrc: "",
            panel: SentMessagesPanel,
            data: [...sentMessages]
        },
        {
            id: uuidv4(),
            index: 3,
            label: "drafts",
            tabImageSrc: "",
            panel: DraftsPanel,
            data: [...draftMessages]
        },
        {
            id: uuidv4(),
            index: 4,
            label: "deleted",
            tabImageSrc: "",
            panel: DeletedPanel,
            data: [...deletedMessages]
        },
    ];

    // let searchContactOrSubjectInputValue: string = "";
    // let searchContactOrSubjectValueChange: boolean = false;
    // let searchDateInputValue: string = "";
    // let searchDateInputValueChange: boolean = false;

</script>

<svelte:head>
	<title>Art in Tech Services - messages</title>
	<meta name="description" content="send, receive save and delete secure messages" />
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
    <!-- <form class="search_all_messages_form">
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
        
    </form> -->
    <div class="messages_container">
        {#if pendingGetClientMessages}
            <LoadingSpinner />
        {:else if (getClientMessagesSuccess)}
            <Tabs 
                tabPanels={tabPanelsMessages} 
                bind:activeTab={activeTabMessages}
            />
            <Panel 
                tabPanels={tabPanelsMessages} 
                bind:activeTab={activeTabMessages}
            />
        {:else if (!getClientMessagesSuccess)} 
            Failed to load messages.
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
        width: 6rem;
    }

    .messages_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>