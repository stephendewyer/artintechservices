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

	interface ClientProfile {
        user_ID: number;
        name_first: string;
        name_last: string;
        email: string;
        date_created: Date;
        last_login: Date;
        client_information_ID: number;
        company: string;
        phone_number: E164Number | string | number | null;
        URL: string;
        street_address: string;
        street_address_02: string;
        city: string;
        state: string;
        zip_code: string | number | null;
        Stripe_customer_ID: string;
        image_ID: number;
        image_URL: string;
        alt_text: string;
        public_ID: string;
		country: string;
    }

	interface ClientContactInformation {
		company: string;
		city: string;
		country: string;
		email: string;
		name_first: string;
		name_last: string;
		phone_number: E164Number | string | number | null;
		state: string;
		street_address: string;
		street_address_02: string;
		zip_code: string | number | null;
		URL: string;
	}

	interface ClientProfileAdminView {
		stripe_customer_ID: string;
		URL: string;
		alt_text: string;
		city: string;
		client_ID: number;
		client_information_ID: number;
		company: string;
		constultations: any[];
		country: string;
		date_created: Date;
		email: string;
		image_URL: string;
		invoices: any[];
		last_login: Date;
		name_first: string;
		name_last: string;
		payment_methods: any[];
		phone_number: E164Number | string | number | null;
		previous_login: Date;
		image_URL: string;
		profile_image_ID: number;
		projects: any[];
		public_ID: string;
		state: string;
		street_address: string;
		street_address_02: string;
		total_amount_due: number;
		user_ID: number;
		zip_code: string | number | null;
	}

	interface ClientProfileWithInvoices {
        user_ID: number;
        name_first: string;
        name_last: string;
        email: string;
        date_created: Date;
        last_login: Date;
        client_information_ID: number;
        company: string;
        phone_number: E164Number | string | number | null;
        URL: string;
        street_address: string;
        street_address_02: string;
        city: string;
        state: string;
        zip_code: string | number | null;
        Stripe_customer_ID: string;
        image_ID: number;
        image_URL: string;
        alt_text: string;
        public_ID: string;
		country: string;
		invoices: any[];
		total_amount_due: number;
    }

	interface AdministratorProfile {
		ID: number;
		username: string;
		email: string;
		date_created: Date;
		last_login: Date;
		name_first: string;
		name_last: string;
		administrator_information_ID: number;
		phone_number: E164Number | string | number | null;
		street_address: string;
		street_address_02: string;
		city: string;
		state: string;
		zip_code: string | number | null;
		image_ID: number;
		image_URL: string;
		alt_text: string;
		public_ID: string;
		country: string;
	}

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

	interface ServicePanelData {
		paragraph: string;
		skills: string[];
		imageSrc: string;
		imageAlt: string;
		videoSrc: string;
		videoPoster: string;
		search: string;
	};

	interface ProcessPanel {
		paragraph: string;
		imageSrc: string;
		imageAlt: string;
		button: typeof SvelteComponent<any> | null;
	};

	interface TabPanel {
        id: string;
		index: number;
        label: string;
		tabImageSrc: string;
		panel: typeof SvelteComponent<any>;
		data: any[
			ServicePanelData | ProcessPanel
		];
    }

	interface ServiceCardData {
		skills: string[];
		pathname: string;
	}

	interface CaseStudyCard {
        id: string;
        index: number;
        label: string;
        paragraph: string;
		imageBackgroundSrc: string;
		imageBackgroundAlt: string;
		imageForegroundSrc: string;
		imageForegroundAlt: string;
        path: string;
    }

	interface ServiceCard {
		id: string;
		index: number;
		label: string;
		tabImageSrc: string;
		data: ServiceCardData[];
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
		project_name: string;
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
		consultation_topic: string;
		consultation_reason: string;
		time_zone: string;
		date_created: Date;
		status: string;
	}

	interface ManageAccountLinks {
		login_client: string;
		create_account: string;
	}

	interface Pathname {
		path: string;
		label: string;
	}

	interface HowToWorkWithUsCard {
		video: string | null;
		video_poster: string | null;
        image: string;
		icon: string;
        pathname: Pathname[];
        altText: string;
        header: string;
        paragraph: string;
    }

	interface Message {
		message_ID: number;
		client_sender_ID: number | null;
		client_recipient_ID: number | null;
		administrator_sender_ID: number | null;
		administrator_recipient_ID: number | null;
		sender_role: string;
		receiver_role: string;
		date_created: string;
		date_sent: string | number | Date;
		subject: string;
		body: string;
		document_attachment_ID: number | null;
		document_attachment_URL: string | null;
		document_attachment_public_ID: string | null;
		image_attachment_ID: number | null;
		image_attachment_URL: string | null;
		image_attachment_public_ID: string | null;
		status: string;
		conversation_ID: number;
		opened: number | null;
	}

	interface Contact {
		ID: number; 
		email: string; 
        name_first: string;
		name_last: string;
		city: string | null;
		state: string | null;
		profile_image_ID: number | null;
		role: string;
		image_URL: string | null;
		public_ID: string | null;
	}

	interface MessageWithContact {
		message_ID: number;
		client_sender_ID: number | null;
		client_recipient_ID: number | null;
		administrator_sender_ID: number | null;
		administrator_recipient_ID: number | null;
		sender_role: string;
		receiver_role: string;
		date_created: string;
		date_sent: string | number | Date;
		subject: string;
		body: string;
		document_attachment_ID: number | null;
		document_attachment_URL: string | null;
		document_attachment_public_ID: string | null;
		image_attachment_ID: number | null;
		image_attachment_URL: string | null;
		image_attachment_public_ID: string | null;
		status: string;
		conversation_ID: number;
		opened: number | null;
		contact: Contact;
	}
}

export {};
