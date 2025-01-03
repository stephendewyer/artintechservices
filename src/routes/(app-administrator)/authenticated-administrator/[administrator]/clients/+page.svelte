<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import SearchInput from "$lib/components/inputs/SearchInput.svelte";
    import ClientsIcon from "$lib/images/icons/clients.svg?raw";
    import { onMount } from "svelte";
    import ProfilePhotoDefault from "$lib/images/default/default_profile_photo.jpg";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import ActionButtonTertiary from "$lib/components/buttons/ActionButtonTertiary.svelte";
    import Pagination from "$lib/components/pagination/Pagination.svelte";

    let searchClientsValueChange: boolean = false;
    let searchClientsInputValue: string = "";

    let clients: ClientProfileWithInvoices[] = [];

    let pendingClients: boolean = false;

    let failedToGetClients: boolean = false;

    const getClients = async () => {

        pendingClients = true;

        try {
            const response = await fetch("/authenticated-administrator/api/getClients", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            clients = await response.json();

            if (response.ok) {
                console.log(clients);
                pendingClients = false;
                failedToGetClients = false;
            };

        } catch (err) {
            pendingClients = false;
            failedToGetClients = true;
        };
        
    };

    onMount(() => {
        getClients();
    }); 

    let clientsCurrentPage: number = 1;

    let pageSize: number = 5;

    let firstPageIndexClients: number;
    $: firstPageIndexClients = (clientsCurrentPage -1) * pageSize;

    let lastPageIndexClients: number;
    $: lastPageIndexClients = firstPageIndexClients + pageSize;

    let paginatedClients: ClientProfileWithInvoices[];

    $: paginatedClients = clients.slice(firstPageIndexClients, lastPageIndexClients);

</script>

<svelte:head>
	<title>Art in Tech Services - clients</title>
	<meta name="description" content="clients page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>

<section class="clients_page">
    <div class="clients_heading">
        <h1>
            clients
        </h1> 
        <div class="clients_icon">
            {@html ClientsIcon}
        </div>
    </div>
    <div class="search_clients">
        <SearchInput 
            placeholder="firstname lastname"
            inputID="clients_search"
            inputName="clients_search"
            inputLabel={true}
            bind:searchInputValue={searchClientsInputValue}
            bind:searchInputValueChange={searchClientsValueChange}
        >
            search clients
        </SearchInput>
    </div>
    <h2>
        clients
    </h2>
    {#if pendingClients}
        <LoadingSpinner />
    {:else if (failedToGetClients && !pendingClients)}
        <p>failed to get clients</p>
    {:else if (!pendingClients && !failedToGetClients)}
        <div class="table_container">
            <table>
                <tbody>
                    <tr>
                        <th>
                            index
                        </th>
                        <th>
                            photo
                        </th>
                        <th>
                            name
                        </th>
                        <th>
                            company
                        </th>
                        <th>
                            email
                        </th>
                        <th>
                            total amount due
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                    {#key paginatedClients}
                        {#each paginatedClients as client, index}
                            <tr>
                                <td>
                                    {++index}
                                </td>
                                <td>
                                    <div class="client_profile_image_container">
                                        <img 
                                            class="client_profile_image"
                                            src={client.image_URL ? client.image_URL : ProfilePhotoDefault} 
                                            alt={client.alt_text ? client.alt_text : "The Art of Living, 1967, by René Magritte"} 
                                        />
                                    </div>
                                </td>
                                <td>
                                    {`${client.name_first} ${client.name_last}`}
                                </td>
                                <td>
                                    {client.company ? client.company : ""}
                                </td>
                                <td>
                                    {client.email}
                                </td>
                                <td>
                                    {(client.total_amount_due / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
                                </td>
                                <td>
                                    <a href={`/authenticated-administrator/administrator/clients/client-email=${client.email}`}>
                                        <ActionButtonTertiary>profile</ActionButtonTertiary>
                                    </a>
                                </td>
                            </tr>
                        {/each}
                    {/key}
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <Pagination 
                bind:currentPage={clientsCurrentPage}
                totalCount={clients.length}
                pageSize={pageSize} 
            />
        </div>
    {/if}
</section>

<style>

    .clients_page {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 0 1rem 1rem 1rem;
    }

    .clients_heading {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .clients_icon {
        width: 6rem;
    }

    .search_clients {
        width: 100%;
        max-width: 32rem;
    }

    .client_profile_image_container {
        height: 4rem;
        width: 4rem;
    }

    .client_profile_image {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    .table_container {
        position: relative;
        overflow-x: auto;
        width: 100%;
        display: block;
        padding: 0 1rem 1rem 1rem;
    }

    .pagination {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    @media screen and (max-width: 1440px) {
        table > tbody > tr > td {
            font-size: 1.175rem;
            padding: 0.25rem 0.5rem;
        }
    }

    @media screen and (max-width: 1080px) {

        table > tbody > tr > td {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
        }

    }

    @media screen and (max-width: 720px) {
        table {
            min-width: 60rem;
        }
    }

</style>