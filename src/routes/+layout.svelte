<script lang="ts">
    import './styles.css';
    import MainFooter from '$lib/components/MainFooter.svelte';
    import MainHeader from '$lib/components/MainHeader.svelte';
	import SideDrawer from "$lib/components/navigation/MobileNavSideDrawer.svelte"
	import Backdrop from '$lib/components/navigation/Backdrop.svelte';
	import { page } from '$app/stores';
	import BannerImage from "$lib/images/Art_in_Tech_Services_banner_03.jpg";
	import DeleteConfirmationModal from '$lib/components/modals/DeleteConfirmationModal.svelte';
  	import { ModalOpenStore } from '$lib/stores/ModalOpenStore';
  	import PromptModal from '$lib/components/modals/PromptModal.svelte';

	let backdrop: boolean = false;
    let openMobileNav: boolean = false;
    let footerElHeight: number = 0;

	$: if (
		openMobileNav || 
		$ModalOpenStore
	) {
		backdrop = true;
	} else {
		backdrop = false;
	};

</script>

<div class="app">
    <MainHeader 
		bind:sideDrawer={openMobileNav}
	/>
	{#if ($page.url.pathname !== "/")}
		<div class="banner">
				<img class="banner_image" src={BannerImage} alt="full moon in midday sky" />
			<div class="banner_gradient" />
		</div>
	{/if}
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
	<DeleteConfirmationModal />
	<PromptModal />
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

	.banner {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
	}

	.banner_image {
		position: relative;
		object-fit: cover;
		height: 20rem;
		width: 100%;
	}

	.banner_gradient {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgb(255,236,236);
		background: linear-gradient(0deg, rgba(255,236,236,1) 0%, rgba(255,236,236,0.75) 65%, rgba(255,236,236,0) 100%);
	}
</style>