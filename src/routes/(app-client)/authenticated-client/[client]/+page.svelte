<script lang="ts">
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    console.log($page.data.session)
</script>
<div class="page">
    <button
        on:click={() => signOut({
            redirect: true,
            callbackUrl: "/login-client"
        })}
    >
        logout client
    </button>
</div>