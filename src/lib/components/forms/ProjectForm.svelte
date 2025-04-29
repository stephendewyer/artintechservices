<script lang="ts">
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
    import DocumentIcon from "$lib/images/icons/document.svg?raw";
    import DateInput from "$lib/components/inputs/DateInput.svelte";
    import TextArea from "$lib/components/inputs/TextArea.svelte";
    import NumberInput from "$lib/components/inputs/NumberInput.svelte";
    import SubmitButton02 from "$lib/components/buttons/SubmitButton02.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import CancelSubmitButton from "$lib/components/buttons/CancelSubmitButton.svelte";
    import { ConvertDateInputFormat } from "$lib/util/convertDateInputFormat";
    import { goto } from "$app/navigation";
    import TextInput from "../inputs/TextInput.svelte";

    export let data;

    export let project: Project | undefined;

    export let projectUpdated: boolean = false;

    export let cancelEditProject: boolean = false;

    const userEmail: string | undefined | null = data.streamed.user?.email;

    let projectID: number | null = (project?.project_ID) ? project?.project_ID : null;
    let projectName: string = (project?.project_name) ? project.project_name : "";
    let aboutProject: string = (project?.project_info) ? project.project_info : "";
    let projectStartDate: string = (project?.project_start_date) ? ConvertDateInputFormat(new Date(project.project_start_date)) : "";
    let projectEndDate: string = (project?.project_end_date) ? ConvertDateInputFormat(new Date(project.project_end_date)) : "";
    let projectBudget: number | null = (project?.project_budget) ? project.project_budget : null;
    let imageFileInputValue: string = "";
    let imageID: number | null = (project?.image_ID) ? project.image_ID : null;

    // console.log("imageID: ", imageID);
    
    let image: any = (project?.image_URL) ? project.image_URL : "";
    let imagePublicID: string = (project?.image_public_ID) ? project.image_public_ID : "";

    // console.log("imagePublicID: ", imagePublicID);

    let documentID: number | null = (project?.document_ID) ? project.document_ID : null;
    let documentFileInputValue: string = "";
    let documentFileName: string = "";
    let documentPublicID: any = (project?.document_public_ID) ? project.document_public_ID : "";
    let document: any = (project?.document_URL) ? project.document_URL : "";

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

    interface Service {
        service: string;
        image: string;
        requested: boolean;
    };

    const services: Service[] = [
        {
            service: "artificial intelligence",
            image: ArtificialIntelligence,
            requested: project?.artificial_intelligence === 1 ? true : false
        },
        {
            service: "brand identity design",
            image: BrandIdentityDesign,
            requested: project?.brand_identity_design === 1 ? true : false
        },
        {
            service: "data visualization",
            image: DataVisualization,
            requested: project?.data_visualization === 1 ? true : false
        },
        {
            service: "photography",
            image: Photography,
            requested: project?.photography === 1 ? true : false
        },
        {
            service: "software development",
            image: SoftwareDevelopment,
            requested: project?.software_development === 1 ? true : false
        },
        {
            service: "user experience design",
            image: UserExperienceDesign,
            requested: project?.user_experience_design === 1 ? true : false
        },
        {
            service: "videography",
            image: Videography,
            requested: project?.videography === 1 ? true : false
        },
        {
            service: "visual design",
            image: VisualDesign,
            requested: project?.visual_design === 1 ? true : false
        }
    ]

    let responseItem: ResponseObj = {
        success: "",
        error: "",
        status: null
    };

    let valueChanged: boolean = false;

    $: services;

    let deleteDocument: boolean = false;
    let deleteImage: boolean = false;

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

    $: if (documentFileInputValue !== "") {
        documentFileName = documentFileInputValue.split(`\\`)[2];
    };

    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000)
    };

    const updateStartProjectRequest = async (
        projectID: number | null,
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
        imageID: number | null,
        imagePublicID: string,
        deleteImage: boolean,
        documentID: number | null,
        document: any,
        documentFileInputValue: string,
        documentFileName: string,
        documentPublicID: any,
        deleteDocument: boolean
    ) => {	
        const response = await fetch("/authenticated-client/api/updateClientProjectRequest", {
            method: 'POST',
            body: JSON.stringify({
                projectID,
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
                imageID,
                imagePublicID,
                deleteImage,
                documentID,
                document,
                documentFileInputValue,
                documentFileName,
                documentPublicID,
                deleteDocument
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        responseItem = await response.json();
        return responseItem;
    };

    const updateClientProjectRequestHandler = async () => {
        pending = true;

        try {

            await updateStartProjectRequest(
                projectID,
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
                imageID,
                imagePublicID,
                deleteImage,
                documentID,
                document,
                documentFileInputValue,
                documentFileName,
                documentPublicID,
                deleteDocument
            );

            if (responseItem.success) {
                projectUpdated = true;
                goto(`/authenticated-client/client/project?id=${project?.project_ID}`);
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

    let cancelDocumentUpload: boolean = false;

    $: if (cancelDocumentUpload) {
        documentInputElement.value = "";
        deleteDocument = true;
        document = null;
        documentInputFiles = null;
        documentFileInputValue = "";
        cancelDocumentUpload = false;
    };

    $: if (document) {
        deleteDocument = false;
    };

</script>
<div class="project_form">
    <form class="form" on:submit|preventDefault={updateClientProjectRequestHandler} >
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
                    bind:files={imageInputFiles}
                    bind:imageFileInputElement={imageInputElement}
                    bind:isValid={imageFileIsValid}
                    bind:deleteImage
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
                    bind:files={documentInputFiles}
                    bind:documentFileInputElement={documentInputElement}
                    bind:isValid={documentFileIsValid}
                    required={false}
                    documentFileInputErrorMessage="document file required"
                >
                    document file
                </DocumentFileInput>
                {#if (document)}
                    <div class="project_document_container">
                        <div class="document_icon_and_label">
                            <div class="document_icon">
                                {@html DocumentIcon}
                            </div>
                            <p class="document_label">
                                {documentFileName}
                            </p>
                        </div>
                        <p class="document_label">
                            {#if (documentFileName)}
                                {documentFileName}
                            {:else if (!documentFileName)}
                                {document}
                            {/if}
                        </p>
                        <div class="cancel_button_container">
                            <CancelSubmitButton bind:closeButtonClicked={cancelDocumentUpload} />
                        </div>
                    </div>
                {/if}
                <p class="constraints">* file formats accepted: PDF, pdf</p>
                <p class="constraints">* maximum file size: 2MB</p>
            </div>
        </div>
        <p>
            After you start a project, a representative from Art in Tech Services will contact you within 48 hours to discuss next steps in your project.  Starting a project is not an agreement.
        </p>
        <div class="buttons_container">
            <SubmitButton02 disable={false}>
                {#if !project}
                    send request
                {:else if project}
                    update project
                {/if}
            </SubmitButton02>
            <CancelButton bind:cancelClicked={cancelEditProject}>
                cancel
            </CancelButton>
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
</div>
<style>

    .project_form {
        width: 100%;
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

    .constraints {
        padding: 0;
        margin: 0;
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

    .buttons_container {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        align-items: center;
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