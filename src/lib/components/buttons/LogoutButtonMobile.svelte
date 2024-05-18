<script lang="ts">
    import { signOut } from "@auth/sveltekit/client";
    import LogoutIconMobile from "$lib/images/icons/logout.svg?raw";
    export let callbackUrl: string;
</script>
<button
    on:click={() => signOut({
        redirect: true,
        callbackUrl: `${callbackUrl}`
    })}
    class="logout_button_mobile"
>
    <slot />
    <div class="logout_icon_container">
        {@html LogoutIconMobile}
    </div>
</button>
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