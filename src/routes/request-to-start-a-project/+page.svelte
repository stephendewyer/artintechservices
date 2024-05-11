<script lang="ts">
    import ArtInTechServicesBanner from "$lib/images/Art_in_Tech_Services_banner_with_logo.jpg";
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
    import TextInput from "$lib/components/inputs/TextInput.svelte";
    import ImageFileInput from "$lib/components/inputs/ImageFileInput.svelte";
    import DocumentFileInput from "$lib/components/inputs/DocumentFileInput.svelte";
    import DocumentIcon from "$lib/images/icons/document.svg?raw";
    import EmailInput from "$lib/components/inputs/EmailInput.svelte";
    import DateInput from "$lib/components/inputs/DateInput.svelte";
    import TextArea from "$lib/components/inputs/TextArea.svelte";
    import NumberInput from "$lib/components/inputs/NumberInput.svelte";
    import type { E164Number } from 'svelte-tel-input/types';
    import PhoneInput from "$lib/components/inputs/PhoneInput.svelte";
    import SubmitButton from "$lib/components/buttons/SubmitButton.svelte";
    import CancelButton from "$lib/components/buttons/CancelButton.svelte";
    import ErrorFlashMessage from "$lib/components/flashMessages/ErrorFlashMessage.svelte";
    import SuccessFlashMessage from "$lib/components/flashMessages/SuccessFlashMessage.svelte";
    import PendingFlashMessage from "$lib/components/flashMessages/PendingFlashMessage.svelte";

    interface Service {
        service: string;
        image: string;
        requested: boolean;

    };

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

    let nameFirst: string = "";
    let nameLast: string = "";
    let email: string = "";
    let company: string = "";
    let phone: E164Number | null = null;
    let URL: string = "";
    let aboutProject: string = "";
    let projectStartDate: Date = new Date(0);
    let projectEndDate: Date = new Date(0);
    let projectBudget: number | null = null;
    let imageFileInputValue: string = "";
    let image: any;
    let documentFileInputValue: string = "";
    let documentFileName: string = "";
    let document: any;

    let nameFirstIsValid: boolean = true;
    let nameLastIsValid: boolean = true;
    let emailIsValid: boolean = true;
    let companyIsValid: boolean = true;
    let phoneIsValid: boolean = true;
    let URLisValid: boolean = true;
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

    $: if (documentFileInputValue !== "") {
        documentFileName = documentFileInputValue.split(`\\`)[2];
    };

    // after submit
	let item: ResponseObj = {
        success: "",
        error: "",
        status: null
    };


    $: if((responseItem.success) || (responseItem.error)) {
        setTimeout(() => {
            responseItem.success = "";
            responseItem.error = "";
            status: null;
        }, 4000)
    };

    const sendProjectRequestHandler = () => {

    }

    let pending: boolean = false;

    $: if((responseItem.success) || (responseItem.error)) {
        pending = false;
    };

</script>
<svelte:head>
	<title>Art in Tech Services - request to start a project</title>
	<meta name="description" content="request to start a project" />
	<meta property="og:image" content="{ArtInTechServicesBanner}" />
    <meta property="og:url" content="https://artintechservices.vercel.app/request-to-start-a-project" />
</svelte:head>
<div class="page">
    <form class="form" on:submit|preventDefault={sendProjectRequestHandler} >
        <h1>
            request to start a project
        </h1>
        <p> 
            Have a digital project idea?<br />  
            Want help on an existing digital project?  <br/>
            Have a digital problem that could use our help?
        </p>
        <h4>*indicates required</h4>
        <h2>
            requested services
        </h2>
        <ul class="services">
            {#each servicesWithStore as service}
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
            how would you like us to contact you?
        </h2>
        <div class="inputs_row">
            <div class="input_column">
                <TextInput 
                    placeholder="myFirstName"
                    inputID="name_first"
                    inputName="name_first"
                    inputLabel={true}
                    bind:textInputValue={nameFirst}
                    bind:isValid={nameFirstIsValid}
                    textInputErrorMessage="first name required"
                    required={true}
                >
                    *first name
                </TextInput>
            </div>
            <div class="input_column">
                <TextInput 
                    placeholder="myLastName"
                    inputID="name_last"
                    inputName="name_last"
                    inputLabel={true}
                    bind:textInputValue={nameLast}
                    bind:isValid={nameLastIsValid}
                    textInputErrorMessage="last name required"
                    required={true}
                >
                    *last name
                </TextInput>
            </div>        
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <EmailInput
                    placeholder="myname@mycompany.com"
                    inputID="email"
                    inputName="email"
                    inputLabel={true}
                    bind:emailInputValue={email}
                    bind:isValid={emailIsValid}
                    required={true}
                >
                *email
                </EmailInput>
            </div>
            <div class="input_column">
                <TextInput
                    placeholder="myCompany"
                    inputID="company"
                    inputName="company"
                    inputLabel={true}
                    bind:textInputValue={company}
                    bind:isValid={companyIsValid}
                    textInputErrorMessage="company required"
                    required={false}
                >
                    company
                </TextInput>
            </div>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <PhoneInput
                    inputID="phone_number"
                    inputName="phone_number"
                    inputLabel={true}
                    bind:phoneInputValue={phone}
                    bind:isValid={phoneIsValid}
                    required={true}
                    phoneInputErrorMessage="phone number required"
                >
                    *phone number
                </PhoneInput>
            </div>
            <div class="input_column">
                <TextInput
                    placeholder="https://mydomain.com"
                    inputID="URL"
                    inputName="URL"
                    inputLabel={true}
                    bind:textInputValue={URL}
                    bind:isValid={URLisValid}
                    textInputErrorMessage="URL required"
                    required={false}
                >
                    URL
                </TextInput>
            </div>
        </div>
        <h2>
            about your project
        </h2> 
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
                *what is your project?
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
                    *project start date
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
                    *project end date
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
                    *project budget
                </NumberInput>
            </div>
        </div>
        <div class="inputs_row">
            <div class="input_column">
                <p class="constraints">* file formats accepted: JPG, PNG, GIF, jpg, png, gif</p>
                <p class="constraints">* maximum file size: 2MB</p>
                <ImageFileInput
                    inputLabel={true}
                    bind:imageFileInputValue={imageFileInputValue}
                    bind:image={image}
                    placeholder="/image.jpg"
                    inputName="project_image_file"
                    inputID="project_image_file"
                    bind:isValid={imageFileIsValid}
                    required={false}
                    imageFileInputErrorMessage="image file required"
                >
                    image file
                </ImageFileInput>
                {#if (image)}
                    <div class="project_image_container">
                        <img src={image} alt="project"/>
                    </div>
                {/if}
            </div>
            <div class="input_column">
                <p class="constraints">* file formats accepted: PDF, pdf</p>
                <p class="constraints">* maximum file size: 2MB</p>
                <DocumentFileInput
                    inputLabel={true}
                    bind:documentFileInputValue={documentFileInputValue}
                    bind:document={document}
                    placeholder="/project-brief.pdf"
                    inputName="project_document_file"
                    inputID="project_document_file"
                    bind:isValid={documentFileIsValid}
                    required={false}
                    documentFileInputErrorMessage="document file required"
                >
                    document file
                </DocumentFileInput>
                {#if (document)}
                    <div class="project_document_container">
                        <div class="document_icon">
                            {@html DocumentIcon}
                        </div>
                        <p class="document_label">
                            {documentFileName}
                        </p>
                    </div>
                {/if}
            </div>
        </div>
        <p>
            After you start a project, a representative from Art in Tech Services will contact you within 48 hours to discuss next steps in your project.  Starting a project is not an agreement.
        </p>
        <div class="buttons_container">
            <a href="/">
                <CancelButton>
                    cancel
                </CancelButton>
            </a>
            
            <SubmitButton disable={false}>
                send request
            </SubmitButton>
        </div>
    </form>
    {#if (pending)}
        <PendingFlashMessage >
            please wait while we validate your data
        </PendingFlashMessage>
    {:else if (item.error)}
        <ErrorFlashMessage >
            {item.error}
        </ErrorFlashMessage>
    {:else if (item.success)}
        <SuccessFlashMessage>
            {item.success}
        </SuccessFlashMessage>
    {/if}
</div>
<style>

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

    .project_image_container {
        padding: 1rem;
    }

    .project_document_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
    }

    .document_icon {
        width: 4rem;
        min-width: 4rem;
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
        
    }

</style>