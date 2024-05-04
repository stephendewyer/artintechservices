<script lang="ts">
  import { onDestroy } from "svelte";

    export let panel_data: ServicePanel[] | [null];

    onDestroy(() => {
        panel_data = [null];
    })
</script>
<div class="service_panel">
    {#each panel_data as serviceData, index}
        {serviceData?.paragraph}
        <ul>
            {#each serviceData?.skills as skill, index}
                <li>
                    {skill}
                </li>
                
            {/each}
        </ul>
        
    {/each}

</div>
<style>

    .service_panel {
        padding: 1rem;
    }

</style>