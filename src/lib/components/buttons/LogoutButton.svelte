<script lang="ts">
    import { signOut } from "@auth/sveltekit/client";
    import LogoutIcon from "$lib/images/icons/logout.svg?raw";
    export let callbackUrl: string;

</script>

<button 
    on:click={() => signOut({
        redirect: true,
        callbackUrl: `${callbackUrl}`
    })}
    class="submit_button"
>
    <ul>
        <li>
            <div class="logout_icon">
                {@html LogoutIcon}
            </div>
            <slot />
        </li>
    </ul>
</button>

<style>

    .submit_button {
        background: nons;
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
		display: flex;
		flex-direction: row;
		align-items: center;
        position: relative;
        background-color: #ffff;
        color: #838B6A;
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
        color: #B2A1A1;
    }

    .submit_button > ul > li > .logout_icon {
        fill: #838B6A;
        transition: fill 0.2s linear;
        width: 1.75rem;
        display: flex;
        justify-content: center;
    }
    
    .submit_button:hover > ul > li > .logout_icon {
        fill: #B2A1A1;
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