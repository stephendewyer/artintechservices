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
}

export {};
