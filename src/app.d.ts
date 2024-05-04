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

}

export {};
