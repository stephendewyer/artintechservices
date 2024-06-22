<script lang="ts">
    import SoftwareDevelopment from "$lib/images/icons/services/software_icon.svg?raw";
    import ArtificialIntelligence from "$lib/images/icons/services/artificial_intelligence_icon.svg?raw";
    import DataVisualization from "$lib/images/icons/services/data_visualization_icon.svg?raw";
    import VisualDesign from "$lib/images/icons/services/visual_design_icon.svg?raw";
    import UserExperienceDesign from "$lib/images/icons/services/UX_design.svg?raw";
    import BrandIdentityDesign from "$lib/images/icons/services/brand_identity_design_Icon.svg?raw";
    import Videography from "$lib/images/icons/services/videography_icon.svg?raw";
    import Photography from "$lib/images/icons/services/camera_icon.svg?raw";
    import ServiceButton from "./buttons/ServiceButton.svelte";

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

    const sortedServicesData: Service[] = servicesData.sort((a, b) => {
        if (a.label < b.label) {
            return -1;
        };
        if (a.label > b.label) {
            return 1;
        };
        return 0;
    });

    let sortedServicesDataWithIDs: ServiceWithID[] = [];

    sortedServicesData.map((service, i) => {
        sortedServicesDataWithIDs = [...sortedServicesDataWithIDs,
            {
                id: i,
                ...service
            }
        ];
    });

</script>
<ul class="services_column">
    {#each sortedServicesDataWithIDs as serviceData, index}
        <li class="service_button_container">
            <ServiceButton service={serviceData} />
        </li>
    {/each}
</ul>
<style>

    .services_column {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 1rem;
        list-style: none;
        padding: 0 1rem;
        height: 14rem;
        width: 100%;
    }

    .service_button_container {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (max-width: 1920px) {

        .services_column {
            height: 21rem;
        }

        .service_button_container {
            width: 32%;
        }
    }

    @media screen and (max-width: 1440px) {
        .services_column {
            height: 28rem;
        }

        .service_button_container {
            width: 50%;
        }
    }

    @media screen and (max-width: 1080px) {
        .services_column {
            height: 24rem;
        }

        .service_button_container {
            width: 50%;
        }
    }

    @media screen and (max-width: 720px) {

        .services_column {
            align-items: center;
            height: 28rem;
        }

        .service_button_container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

    }

</style>