<script lang="ts">
    import './styles.css';
    import MainFooter from '$lib/components/MainFooter.svelte';
    import MainHeader from '$lib/components/MainHeader.svelte';
	import SideDrawer from "$lib/components/navigation/MobileNavSideDrawer.svelte"
	import Backdrop from '$lib/components/navigation/Backdrop.svelte';

	let backdrop: boolean = false;
    let openMobileNav: boolean = false;
    let footerElHeight: number = 0;

	$: if (openMobileNav) {
		backdrop = true;
	} else {
		backdrop = false;
	};

</script>

<div class="app">
    <MainHeader 
		bind:sideDrawer={openMobileNav}
	/>
    <main style="padding-bottom: {footerElHeight}px;">
        <slot />
    </main>
    <MainFooter 
		bind:footerHeight={footerElHeight}
	/>
	{#if (backdrop)}
		<Backdrop 
			bind:openMobileNav 
		/>
	{/if}
	<SideDrawer bind:openMobileNav />
</div>

<style>
    .app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}

	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
	}
</style>