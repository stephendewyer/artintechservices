// runs on every request -- attaches user to event.locals

import { verifyAccessToken } from "$lib/server/authentication/auth";
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {

    const token = event.cookies.get("session");

    if (token) {
        try {
            event.locals.user = verifyAccessToken(token);            
        } catch {
            event.locals.user = null;
        };
    } else {
        event.locals.user = null;
    };

    const user = event.locals.user;

    // protect routes for authenticated client
    
    if (
        !event.url.pathname.startsWith("/authenticated-client") &&
        user?.role === "client"
    ) {
        throw redirect(303, "/authenticated-client/client");
    };

    if (event.url.pathname.startsWith("/authenticated-client")) {
        if (user?.role !== "client") {
            throw redirect(303, "/logins/login-client");
        };
    };

    // protect routes for authenticated administrators

    if (
        !event.url.pathname.startsWith("/authenticated-administrator") &&
        user?.role === "administrator"
    ) {
        throw redirect(303, "/authenticated-administrator/administrator");
    };

    if (event.url.pathname.startsWith("/authenticated-administrator")) {
        if (user?.role !== "administrator") {
            throw redirect(303, "/logins/login-administrator");
        };
    };

    return resolve(event);

};