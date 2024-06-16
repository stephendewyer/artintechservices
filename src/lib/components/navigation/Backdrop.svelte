<script lang="ts">
    import { page } from "$app/stores";
    import { ModalOpenStore } from '$lib/stores/ModalOpenStore';
    let URLPathName = $page.url.href;

    export let openMobileNav: boolean = false;

    const backdropClickedHandler = () => {
        openMobileNav = false;
        $ModalOpenStore = false;
    };

    let open: boolean = false;

    $: if (
        openMobileNav ||
        $ModalOpenStore
    ) {
        open = !open;
    };
    
</script>
<a 
    href={URLPathName} 
    data-sveltekit-noscroll
>
    <div 
        class="backdrop"
        on:click={() => backdropClickedHandler()} 
        on:keydown={() => backdropClickedHandler()}
        aria-hidden={!open}
    />
</a>

<style>
    .backdrop {
        z-index: 49;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        background: #000000;
        opacity: 50%;
        cursor: pointer;
    }
</style>