import { writable } from "svelte/store";

export const RequestedServicesStore = writable([
    {
        service: "web development", 
        requested: false
    },
    {
        service: "user experience design",
        requested: false
    },
    {
        service: "art direction",
        requested: false
    },
]);