<script lang="ts">
    import AccordionMobileNavItem from "$lib/components/accordions/AccordionMobileNavItem.svelte";

    export let openState: boolean;

    export let mobileNavTabsData: AccordionTab[];

    let activeTab: number = -1;
    let setActiveIndex: number = -1;
    let setIsActive: boolean = false;

    $: activeTab = setActiveIndex;
</script>

<ul>
    {#each mobileNavTabsData as mobileNavTab, index}
        <AccordionMobileNavItem 
            item={mobileNavTab}
            bind:open={openState}
            bind:setActive={setIsActive}
            bind:setActiveIndex={setActiveIndex}
            activeTab={activeTab}
            index={index}
        />
    {/each}
</ul>

<style>

    ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

</style>