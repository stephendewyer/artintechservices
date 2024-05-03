<script lang="ts">
    import SoftwareDevelopment from "$lib/images/icons/services/software_icon.svg?raw";
    import ArtificialIntelligence from "$lib/images/icons/services/artificial_intelligence_icon.svg?raw";
    import DataVisualization from "$lib/images/icons/services/data_visualization_icon.svg?raw";
    import VisualDesign from "$lib/images/icons/services/visual_design_icon.svg?raw";
    import UserExperienceDesign from "$lib/images/icons/services/UX_design.svg?raw";
    import BrandIdentityDesign from "$lib/images/icons/services/brand_identity_design_Icon.svg?raw";
    import Videography from "$lib/images/icons/services/videography_icon.svg?raw";
    import Photography from "$lib/images/icons/services/camera_icon.svg?raw";

    interface Service {
        image: string;
        label: string;
        pathname: string;
    };

    const servicesData: Service[] = [
        {
            image: SoftwareDevelopment,
            label: "software development",
            pathname: "/services?service=software-development"
        },
        {
            image: ArtificialIntelligence,
            label: "artificial intelligence",
            pathname: "/services?service=artificial-intelligence"
        },
        {
            image: DataVisualization,
            label: "data visualization",
            pathname: "/services?service=data-visualization"
        },
        {
            image: VisualDesign,
            label: "visual design",
            pathname: "/services?service=visual-design"
        },
        {
            image: UserExperienceDesign,
            label: "user experience design",
            pathname: "/services?service=user-experience-design"
        },
        {
            image: BrandIdentityDesign,
            label: "brand identity design",
            pathname: "/services?service=brand-identity-design"
        },
        {
            image: Videography,
            label: "videography",
            pathname: "/services?service=videography"
        },
        {
            image: Photography,
            label: "photography",
            pathname: "/services?service=photography"
        }
    ];
</script>
<div class="services">
    <ul>
        {#each servicesData.slice(0, servicesData.length/2) as serviceData}
            <li>
                {serviceData.label}
            </li>
        {/each}
    </ul>
    <ul>
        {#each servicesData.slice(servicesData.length/2, servicesData.length) as serviceData}
            <li>
                {serviceData.label}
            </li>
        {/each}
    </ul> 
</div>
<style>
    .services {
        display: flex;
    }
</style>