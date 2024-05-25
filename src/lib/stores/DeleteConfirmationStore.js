import { writable } from 'svelte/store';

export const DeleteConfirmationStore = writable({
    message: null,
    data: null
});