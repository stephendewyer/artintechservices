<script lang="ts">
    import { signOut } from "@auth/sveltekit/client";
    import LogoutIconMobile from "$lib/images/icons/logout.svg?raw";
    export let callbackUrl: string;
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    export let email: string | null | undefined = null;
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
                signOut({
                    redirect: true,
                    callbackUrl: `${callbackUrl}`
                });
            }
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
        class="logout_button_mobile"
    >
        <slot />
        <div class="logout_icon_container">
            {@html LogoutIconMobile}
        </div>
    </button>
{/if}

<style>

    .logout_button_mobile {
        margin: 0;
        padding: 0.5rem 1rem;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        border: none;
        background: none;
        color: #36261E;
        transition: color 0.2s linear;
    }

    .logout_icon_container {
        width: 1.75rem;
        height: 1.75rem;
        fill: #36261E;
        transition: fill 0.2s linear;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .logout_button_mobile:hover {
        color: #838B6A;
    }

    .logout_button_mobile:hover > .logout_icon_container {
        fill: #838B6A;
    }

    @media screen and (max-width: 720px) {
        .logout_button_mobile {
            font-size: 1rem;
        }

        .logout_icon_container {
            width: 1.25rem;
            height: 1.25rem;
        }
    }

</style>