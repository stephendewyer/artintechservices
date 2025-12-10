<script lang="ts">
    import LogoutIcon from "$lib/images/icons/logout.svg?raw";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import { goto } from "$app/navigation";

    export let email: string | null | undefined = null;
    export let callbackUrl: string;
    export let userGroup: string | null | undefined = null;

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
        }, 4000);
    };

    let pendingUpdatePreviousLogin: boolean = false;

    const updatePreviousLoginClient = async (email: string | null | undefined, userGroup: string | null | undefined) => {
        pendingUpdatePreviousLogin = true;
        const response = await fetch("/authenticated-client/api/updateClientPreviousLogin", {
            method: "PATCH",
            body: JSON.stringify({
                email,
                userGroup
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        responseItem = await response.json();
        return responseItem;
    };
    
    const updatePreviousLoginAdministrator = async (email: string | null | undefined, userGroup: string | null | undefined) => {
        pendingUpdatePreviousLogin = true;
        const response = await fetch("/authenticated-administrator/api/updateAdministratorPreviousLogin", {
            method: "PATCH",
            body: JSON.stringify({
                email,
                userGroup
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const handleLogout = async () => {
        try {
            if (userGroup === "client") {
                await updatePreviousLoginClient(email, userGroup);
            } else if (userGroup === "administrator") {
                await updatePreviousLoginAdministrator(email, userGroup);
            };
            if (responseItem.success) {
                await fetch("/api/authentication/logout", {
                    method: "POST"
                });
                goto(callbackUrl);
            };
        } catch(err) {
            console.log(err);
        };        
    };

</script>

{#if pendingUpdatePreviousLogin}
    <LoadingSpinner />
{:else}
    <button 
        on:click={handleLogout}
        class="button_external_link"
        >
        <div class="external_link_icon" >
            {@html LogoutIcon}
        </div>
        <slot />
    </button>
{/if}

<style>
    .button_external_link {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        margin: 0;
        border-radius: 2em;
        border: solid 2px #FAE6D8;
        box-sizing: border-box;
        text-decoration: none;
        font-weight: 300;
        color: #FAE6D8;
        background: none;
        text-align: center;
        transition: all 0.2s ease-in-out;
        will-change: color;
        cursor: pointer;
    }

    .button_external_link > .external_link_icon {
        fill: #FAE6D8;
        will-change: fill;
        transition: fill 0.2s ease-in-out;
    }

    .button_external_link:hover > .external_link_icon {
        fill: #CFF5F8;
        will-change: fill;
        transition: fill 0.2s ease-in-out;
    }

    .button_external_link:hover {
        color: #CFF5F8;
        border: solid 2px #CFF5F8;
    }

    .external_link_icon {
        width: 20px;
    }

    @media screen and (max-width: 1080px) {
        .button_external_link {
            padding: 0.5rem 1rem;
            border: solid 1px #FAE6D8;
        }

        .button_external_link:hover {
            border: solid 1px #CFF5F8;
        }
    }

    @media screen and (max-width: 750px) {

        .external_link_icon {
            width: 15px;
        }

    }
</style>