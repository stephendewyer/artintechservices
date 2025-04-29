<script lang="ts">
    import { PUBLIC_DOMAIN } from "$env/static/public";
    import BannerImage from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
    import { page } from "$app/stores";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import Checkbox from "$lib/components/inputs/Checkbox.svelte";
    import ArtificialIntelligence from "$lib/images/icons/services/artificial_intelligence_icon.svg?raw";
    import BrandIdentityDesign from "$lib/images/icons/services/brand_identity_design_Icon.svg?raw";
    import DataVisualization from "$lib/images/icons/services/data_visualization_icon.svg?raw";
    import Photography from "$lib/images/icons/services/camera_icon.svg?raw";
    import SoftwareDevelopment from "$lib/images/icons/services/software_icon.svg?raw";
    import UserExperienceDesign from "$lib/images/icons/services/UX_design.svg?raw";
    import Videography from "$lib/images/icons/services/videography_icon.svg?raw";
    import VisualDesign from "$lib/images/icons/services/visual_design_icon.svg?raw";
    import ImageFileInput from "$lib/components/inputs/ImageFileInput.svelte";
    import DocumentFileInput from "$lib/components/inputs/DocumentFileInput.svelte";
    import DateInput from "$lib/components/inputs/DateInput.svelte";
    import TextArea from "$lib/components/inputs/TextArea.svelte";
    import NumberInput from "$lib/components/inputs/NumberInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import { goto } from "$app/navigation";
    import BackButton from "$lib/components/buttons/BackButton.svelte";
    import TextInput from "$lib/components/inputs/TextInput.svelte";

    export let data;

    const userEmail: string | undefined | null = data.streamed.user?.email;

    interface Service {
        service: string;
        image: string;
        requested: boolean;

    };

    const services: Service[] = [
        {
            service: "artificial intelligence",
            image: ArtificialIntelligence,
            requested: false
        },
        {
            service: "brand identity design",
            image: BrandIdentityDesign,
            requested: false
        },
        {
            service: "data visualization",
            image: DataVisualization,
            requested: false
        },
        {
            service: "photography",
            image: Photography,
            requested: false
        },
        {
            service: "software development",
            image: SoftwareDevelopment,
            requested: false
        },
        {
            service: "user experience design",
            image: UserExperienceDesign,
            requested: false
        },
        {
            service: "videography",
            image: Videography,
            requested: false
        },
        {
            service: "visual design",
            image: VisualDesign,
            requested: false
        }
    ];

    $: services;

    $: services.forEach(requestedService => {
        if (requestedService.service === "artificial intelligence") {
            artificialIntelligence = requestedService.requested;
        } else if (requestedService.service === "brand identity design") {
            brandIdentityDesign = requestedService.requested;
        } else if (requestedService.service === "data visualization") {
            dataVisualization = requestedService.requested;
        } else if (requestedService.service === "photography") {
            photography = requestedService.requested;
        } else if (requestedService.service === "software development") {
            softwareDevelopment = requestedService.requested;
        } else if (requestedService.service === "user experience design") {
            userExperienceDesign = requestedService.requested;
        } else if (requestedService.service === "videography") {
            videography = requestedService.requested;
        } else if (requestedService.service === "visual design") {
            visualDesign = requestedService.requested;
        };
    });

    let projectName: string = "";
    let aboutProject: string = "";
    let projectStartDate: string = "";
    let projectEndDate: string = "";
    let projectBudget: number | null = null;
    let imageFileInputValue: string = "";
    let image: any;
    let documentFileInputValue: string = "";
    let documentFileName: string = "";
    let document: any;

    let artificialIntelligence: boolean = false;
    let brandIdentityDesign: boolean = false;
    let dataVisualization: boolean = false;
    let photography: boolean = false;
    let softwareDevelopment: boolean = false;
    let userExperienceDesign: boolean = false;
    let videography: boolean = false;
    let visualDesign: boolean = false;

    let projectNameIsValid: boolean = true;
    let aboutProjectIsValid: boolean = true;
    let projectStartDateIsValid: boolean = true;
    let projectEndDateIsValid: boolean = true;
    let imageFileIsValid: boolean = true;
    let documentFileIsValid: boolean = true;
    let projectBudgetIsValid: boolean = true;

    let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    let valueChanged = false;

    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000)
    };

    const createStartProjectRequest = async (
        userEmail: string | null | undefined,
        artificialIntelligence: boolean,
        brandIdentityDesign: boolean,
        dataVisualization: boolean,
        photography: boolean,
        softwareDevelopment: boolean,
        userExperienceDesign: boolean,
        videography: boolean,
        visualDesign: boolean,
        projectName: string,
        aboutProject: string,
        projectStartDate: string,
        projectEndDate: string,
        projectBudget: number | null,
        imageFileInputValue: string,
        image: any,
        documentFileInputValue: string,
        documentFileName: string,
        document: any
    ) => {	
        const response = await fetch("/authenticated-client/api/sendClientProjectRequest", {

            method: 'POST',
            body: JSON.stringify({
                userEmail,
                artificialIntelligence,
                brandIdentityDesign,
                dataVisualization,
                photography,
                softwareDevelopment,
                userExperienceDesign,
                videography,
                visualDesign,
                projectName,
                aboutProject,
                projectStartDate,
                projectEndDate,
                projectBudget,
                imageFileInputValue,
                image,
                documentFileInputValue,
                documentFileName,
                document
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const sendClientProjectRequestHandler = async () => {
        pending = true;

        try {

            await createStartProjectRequest(
                userEmail,
                artificialIntelligence,
                brandIdentityDesign,
                dataVisualization,
                photography,
                softwareDevelopment,
                userExperienceDesign,
                videography,
                visualDesign,
                projectName,
                aboutProject,
                projectStartDate,
                projectEndDate,
                projectBudget,
                imageFileInputValue,
                image,
                documentFileInputValue,
                documentFileName,
                document
            );

            if (responseItem.success) {
                artificialIntelligence = false;
                brandIdentityDesign = false;
                dataVisualization = false;
                photography = false;
                softwareDevelopment = false;
                userExperienceDesign = false;
                videography = false;
                visualDesign = false;
                projectName = "";
                aboutProject = "";
                projectStartDate = "";
                projectEndDate = "";
                projectBudget = null;
                imageFileInputValue = "";
                image = "";
                documentFileInputValue = "";
                documentFileName = "";
                document = "";
                goto("/authenticated-client/client/projects");
            };

            if (responseItem.error) {

                if (projectName === "") {
                    projectNameIsValid = false;
                } else if (projectName !== "") {
                    projectNameIsValid = true;
                };

                if (aboutProject === "") {
                    aboutProjectIsValid = false;
                } else if (aboutProject !== "") {
                    aboutProjectIsValid = true;
                };

                if (projectStartDate === "") {
                    projectStartDateIsValid = false;
                } else if (projectStartDate !== "") {
                    projectStartDateIsValid = true;
                };

                if (projectEndDate === "") {
                    projectEndDateIsValid = false;
                } else if (projectEndDate !== "") {
                    projectEndDateIsValid = true;
                };

                if (projectBudget === 0 || projectBudget === null) {
                    projectBudgetIsValid = false;
                } else if (projectBudget !== 0 && projectBudget !== null) {
                    projectBudgetIsValid = true;
                };
            };
        } catch (error) {
            console.log(error);
        };

    };

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };

    let imageInputElement: HTMLInputElement;

    let imageInputFiles: FileList | null = null;

    let documentInputElement: HTMLInputElement;

    let documentInputFiles: FileList | null = null;

</script>
<svelte:head>
	<title>Art in Tech Services - request to start a project</title>
	<meta name="description" content="request to start a project page" />
	<meta property="og:image" content={BannerImage} />
    <meta property="og:url" content={PUBLIC_DOMAIN+$page.url.pathname}/>
</svelte:head>
<section class="request_to_start_a_project_page">
    <form 
        class="form" 
        on:submit|preventDefault={sendClientProjectRequestHandler} 
    >
        <a 
            href="/authenticated-client/client/projects" 
            class="back_button_container"
        >
            <BackButton>
                projects
            </BackButton>
        </a>
        <h1>
            request to start a project
        </h1>
        <p> 
            Have a digital project idea?<br />  
            Want help on an existing digital project?<br/>
            Have a digital problem that could use our help?
        </p>
        <h4 class="indicates_required_heading">*indicates required</h4>
        <h2>
            requested services
        </h2>
        <ul class="services">
            {#each services as service}
                <li class="service">
                    <Checkbox 
                        bind:checked={service.requested} 
                        bind:value={service.service}
                        bind:valueChanged={valueChanged}
                    >
                        <div class="service_icon_and_label">
                            <div class="service_icon">
                                {@html service.image}
                            </div>
                            <h3 class="service_label">
                                {service.service}
                            </h3>
                        </div>
                    </Checkbox>
                </li>
            {/each}
        </ul>
        <h2>
            about your project
        </h2> 
        <div class="inputs_row">
            <TextInput
                placeholder="new web app for my company"
                inputID="project_name"
                inputName="project_name"
                inputLabel={true}
                bind:textInputValue={projectName}
                bind:isValid={projectNameIsValid}
                textInputErrorMessage="project name required"
                required={true}
            >
                what is your project name?*
            </TextInput>
        </div>
        <div class="inputs_row">
            <TextArea
                placeholder="I want a web application to ..."
                inputID="about_project"
                inputName="about_project"
                inputLabel={true}
                bind:textareaInputValue={aboutProject}
                bind:isValid={aboutProjectIsValid}
                textAreaInputErrorMessage="about project required"
                required={true}
            >
                what is your project?*
            </TextArea>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <DateInput
                    inputID="project_start_date"
                    inputName="project_start_date"
                    inputLabel={true}
                    bind:dateInputValue={projectStartDate}
                    bind:isValid={projectStartDateIsValid}
                    dateInputErrorMessage="project start date required"
                    required={true}
                >
                    project start date*
                </DateInput>
            </div>
            <div class="input_column">
                <DateInput
                    inputID="project_end_date"
                    inputName="project_end_date"
                    inputLabel={true}
                    bind:dateInputValue={projectEndDate}
                    bind:isValid={projectEndDateIsValid}
                    dateInputErrorMessage="project end date required"
                    required={true}
                >
                    project end date*
                </DateInput>
            </div>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <NumberInput
                    placeholder="$60,000"
                    inputID="project_end_date"
                    inputName="project_end_date"
                    inputLabel={true}
                    bind:numberInputValue={projectBudget}
                    bind:isValid={projectBudgetIsValid}
                    numberInputErrorMessage="project budget required"
                    required={true}
                >
                    project budget*
                </NumberInput>
            </div>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <ImageFileInput
                    inputLabel={true}
                    bind:imageFileInputValue={imageFileInputValue}
                    bind:image={image}
                    placeholder="/image.jpg"
                    inputName="project_image_file"
                    inputID="project_image_file"
                    bind:isValid={imageFileIsValid}
                    bind:files={imageInputFiles}
                    bind:imageFileInputElement={imageInputElement}
                    required={false}
                    imageFileInputErrorMessage="image file required"
                >
                    image file
                </ImageFileInput>
            </div>
            <div class="input_column">
                <DocumentFileInput
                    inputLabel={true}
                    bind:documentFileInputValue={documentFileInputValue}
                    bind:document={document}
                    placeholder="/project-brief.pdf"
                    inputName="project_document_file"
                    inputID="project_document_file"
                    bind:isValid={documentFileIsValid}
                    bind:files={documentInputFiles}
                    bind:documentFileInputElement={documentInputElement}
                    required={false}
                    documentFileInputErrorMessage="document file required"
                >
                    document file
                </DocumentFileInput>
            </div>
        </div>
        <p>
            After you start a project, a representative from Art in Tech Services will contact you within 48 hours to discuss next steps in your project.  Starting a project is not an agreement.
        </p>
        <div class="buttons_container">            
            <SubmitButton disable={false}>
                send request
            </SubmitButton>
        </div>
    </form>
    {#if (pending)}
        <PendingFlashMessage >
            please wait while we validate your data
        </PendingFlashMessage>
    {:else if (responseItem.error)}
        <ErrorFlashMessage >
            {responseItem.error}
        </ErrorFlashMessage>
    {:else if (responseItem.success)}
        <SuccessFlashMessage>
            {responseItem.success}
        </SuccessFlashMessage>
    {/if}
</section>

<style>

    .request_to_start_a_project_page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .form {
        position: relative;
        width: 100%;
        max-width: 50rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 1rem;
    }

    .back_button_container {
        position: absolute;
        left: 0;
        top: 0;
    }

    .services {
        list-style: none;
        padding: 1rem 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .service {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 6rem;
    }

    .service_icon_and_label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
    }

    .service_icon {
        width: 4rem;
        min-width: 4rem;
    }

    .service_label {
        font-size: 1rem;
    }
    
    .project_image_container {
        position: relative;
        padding: 1rem;
    }

    .project_document_container {
        position: relative;
        padding: 1rem;
    }

    .document_icon_and_label {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .document_icon {
        width: 20%;
    }

    .document_label {
        width: 80%;
        word-wrap: break-word;
    }

    .cancel_button_container {
        position: absolute;
        right: 1rem;
        top: 1rem;
    }

    @media screen and (max-width: 1440px) {
        .service {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 5.5rem;
        }

        .service_icon {
            width: 3.5rem;
            min-width: 3.5rem;
        }

        .cancel_button_container {
            right: 0.75rem;
            top: 0.75rem;
        }
    }

    @media screen and (max-width: 1080px) {

        .service_icon {
            width: 3rem;
            min-width: 3rem;
        }

        .service_label {
            font-size: 0.9rem;
        }

        .service {
            height: 5rem;
        }
        .services {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .cancel_button_container {
            right: 0.5rem;
            top: 0.5rem;
        }
    }

    @media screen and (max-width: 720px) {

        .back_button_container {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }

        .services {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            height: auto;
            gap: 0.5rem;
        }

        .service {
            width: 100%;
            height: auto;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }

        .service_icon_and_label {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
        }

        .service_icon {
            width: 3rem;
            min-width: 3rem;
        }

        .service_label {
            font-size: 0.9rem;
        }

        .cancel_button_container {
            right: 0.25rem;
            top: 0.25rem;
        }
        
    }

</style>