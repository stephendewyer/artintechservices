<script lang="ts">
    import LogoutIcon from "$lib/images/icons/logout.svg?raw";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import { goto } from "$app/navigation";
    
    export let logoutAPIroute: string = "";
    export let callbackUrl: string = "";
    export let email: string | null | undefined = null;
    export let userGroup: string | null | undefined = null;
    export let updatePreviousLoginDateAPIroute: string = "";

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

    const updatePreviousLoginHandler = async (email: string | null | undefined, userGroup: string | null | undefined) => {
        pendingUpdatePreviousLogin = true;
        const response = await fetch(updatePreviousLoginDateAPIroute, {
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
            await updatePreviousLoginHandler(email, userGroup);
            if (responseItem.success) {
                await fetch(logoutAPIroute, {
                    method: "POST"
                });
                goto(callbackUrl);
            };
        } catch(err) {
            console.log(err);
        };        
    };

</script>

<button 
    on:click={handleLogout}
    class="submit_button"
>
    {#if pendingUpdatePreviousLogin}
        <LoadingSpinner />
    {:else}
        <ul>
            <li>
                <div class="logout_icon">
                    {@html LogoutIcon}
                </div>
                <slot />
            </li>
        </ul>
    {/if}
</button>

<style>

    .submit_button {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
    }

    ul {
        position: relative;
		list-style-type: none;
		margin: 0;
		padding: 0;
    }

    li {
		position: relative;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
        position: relative;
        background-color: #ffff;
        color: #4F544D;
        display: flex;
        justify-content: center;
        padding: 0.5rem;
        font-size: 1.4rem;
        font-weight: 600;
        letter-spacing: 0.05rem;
        transition: color 0.2s linear;
        cursor: pointer;
        gap: 0.5rem;
	}

    .submit_button:hover > ul > li {
        color: #838B6A;;
    }

    .submit_button > ul > li > .logout_icon {
        fill: #4F544D;
        transition: fill 0.2s linear;
        width: 1.75rem;
        display: flex;
        justify-content: center;
    }
    
    .submit_button:hover > ul > li > .logout_icon {
        fill: #838B6A;;
    }

    @media all and (max-width: 1800px) {
        
        .submit_button {
            font-size: 1.3rem;
        }

    }

    @media all and (max-width: 1400px) {
        
        .submit_button {
            font-size: 1.2rem;
        }

    }

    @media all and (max-width: 1000px) {

        .submit_button {
            font-size: 1rem;
        }

    }

    @media all and (max-width: 800px) {

        .submit_button {
            font-size: 1rem;
        }
        
    }
</style>