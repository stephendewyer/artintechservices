import { writable } from 'svelte/store';

export const PromptStore = writable({
    message: null,
    data: null
});