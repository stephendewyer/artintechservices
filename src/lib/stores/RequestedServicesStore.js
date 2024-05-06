import { writable } from "svelte/store";

export const RequestedServicesStore = writable([
    {
        service: "artificial intelligence", 
        requested: false
    },
    {
        service: "brand identity design",
        requested: false
    },
    {
        service: "data visualization",
        requested: false
    },
    {
        service: "photography",
        requested: false
    },
    {
        service: "software development",
        requested: false
    },
    {
        service: "user experience design",
        requested: false
    },
    {
        service: "videography",
        requested: false
    },
    {
        service: "visual design",
        requested: false
    }
]);