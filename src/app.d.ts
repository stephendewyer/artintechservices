// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { SvelteComponent } from 'svelte';
import type { E164Number } from 'svelte-tel-input/types';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

	}

	interface ResponseObj {
        success: string;
        error: string | undefined;
        status: number | null;
    };

	interface NavTab {
		id: number;
		label: string;
		expandable: boolean;
		slug: string;
		content: NavTab[] | null;
	}

	interface AccordionTab {
		id: number;
        label: string;
        expandable: boolean;
		slug: string;
        content: AccordionTab[] | null;
    }

	interface Action {
		image: string;
		label: string;
		pathname: string;
	}

	interface Service {
        image: string;
        label: string;
        pathname: string;
    };

    interface ServiceWithID {
        id: number;
        image: string;
        label: string;
        pathname: string;
    };

	interface ServicePanel {
		paragraph: string;
		skills: string[] | any;
		imageSrc: string;
		imageAlt: string;
		search: string;
	};

	interface ProcessPanel {
		paragraph: string;
		imageSrc: string;
		imageAlt: string;
		button: typeof SvelteComponent<any>;
	};

	interface TabPanel {
        id: string;
		index: number;
        label: string;
		tabImageSrc: string;
		panel: typeof SvelteComponent<any>;
		data: any[
			ServicePanel | ProcessPanel
		];
    }

	interface ServiceSelected {
        service: string;
        requested: boolean;
    };

	interface Credentials {
		providerId: string;
		email: string;
		password: string;
		redirect: string;
		csrfToken: string;
		callbackUrl: string;
	};

	interface PaymentMethodDeleteItem {
		message: string;
		data: string;
	};

	interface Project {
		project_ID: number;
		client_ID: number;
		image_ID: number;
		document_ID: number;
		project_info: string;
		project_start_date: Date;
		project_end_date: Date;
		project_budget: number;
		artificial_intelligence: number;
		brand_identity_design: number;
		data_visualization: number;
		photography: number;
		software_development: number;
		user_experience_design: number;
		videography: number;
		visual_design: number;
		date_created: Date;
		status: string;
		image_URL: string;
		image_alt_text: string;
		image_timestamp: Date;
		image_public_ID: string;
		document_timestamp: Date;
		document_public_ID: string;
		document_URL: string;
	}

	interface Consultation {
		request_ID: number;
		client_ID: number;
		consultation_date: Date;
		consultation_time: string;
		consultation_reason: string;
		time_zone: string;
		date_created: Date;
		status: string;
	}
}

export {};
