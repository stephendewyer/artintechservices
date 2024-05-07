<script lang="ts">
    import Checkbox from "$lib/components/inputs/Checkbox.svelte";
    import { RequestedServicesStore } from "$lib/stores/RequestedServicesStore";
    import ArtificialIntelligence from "$lib/images/icons/services/artificial_intelligence_icon.svg?raw";
    import BrandIdentityDesign from "$lib/images/icons/services/brand_identity_design_Icon.svg?raw";
    import DataVisualization from "$lib/images/icons/services/data_visualization_icon.svg?raw";
    import Photography from "$lib/images/icons/services/camera_icon.svg?raw";
    import SoftwareDevelopment from "$lib/images/icons/services/software_icon.svg?raw";
    import UserExperienceDesign from "$lib/images/icons/services/UX_design.svg?raw";
    import Videography from "$lib/images/icons/services/videography_icon.svg?raw";
    import VisualDesign from "$lib/images/icons/services/visual_design_icon.svg?raw";


    interface Service {
        service: string;
        image: string;
        requested: boolean;

    }
    const services = [
        {
            service: "artificial intelligence",
            image: ArtificialIntelligence
        },
        {
            service: "brand identity design",
            image: BrandIdentityDesign
        },
        {
            service: "data visualization",
            image: DataVisualization
        },
        {
            service: "photography",
            image: Photography
        },
        {
            service: "software development",
            image: SoftwareDevelopment
        },
        {
            service: "user experience design",
            image: UserExperienceDesign
        },
        {
            service: "videography",
            image: Videography
        },
        {
            service: "visual design",
            image: VisualDesign
        }
    ];

    let servicesWithStore: Service[] = [];

    services.map((service, index) => {
        servicesWithStore = [...servicesWithStore, 
            {
                ...service,
                requested: $RequestedServicesStore[index].requested
            }
        ];
    });

    let valueChanged: boolean = false;

    $: if (valueChanged) {
        $RequestedServicesStore.forEach((service, index) => {
            servicesWithStore.forEach((serviceWithStore) => {
                if (service.service === serviceWithStore.service) {
                    $RequestedServicesStore[index].requested = serviceWithStore.requested;
                };
            });
        });
    };

</script>
<div class="page">
    <h1>
        request to start a project
    </h1>
    {#each servicesWithStore as service}
        <Checkbox 
            bind:checked={service.requested} 
            bind:value={service.service}
            bind:valueChanged={valueChanged}
        >
            {service.service}
        </Checkbox>
    {/each}
</div>
<style>

</style>