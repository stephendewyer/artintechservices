import { redirect } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from "@sveltejs/kit/hooks";

/** @type {import('@sveltejs/kit').Handle} */
const authorizationHandle = async ({event, resolve}) => {
    const session = await event.locals.auth();
    // redirect users to "/authenticated-client/client" if startsWith("/authenticated-client") is false

    if (
        !event.url.pathname.startsWith("/authenticated-client") &&
        session?.user?.name === "client"
    ) {
        throw redirect(303, "/authenticated-client/client");
    };

    // protect any routes under /authenticated-client

    if (event.url.pathname.startsWith("/authenticated-client")) {
        if (session?.user?.name !== "client") {
            throw redirect(303, "/login-client");
        };
    };

    if (
        !event.url.pathname.startsWith("/authenticated-administrator") &&
        session?.user?.name === "administrator"
    ) {
        throw redirect(303, "/authenticated-administrator/administrator");
    };

    if (event.url.pathname.startsWith("/authenticated-administrator")) {
        if (session?.user?.name !== "administrator") {
            throw redirect(303, "/login-administrator");
        };
    };
    // if still request, proceed as normal
    return await resolve(event);
}

export const handle = sequence(
    authenticationHandle,
    authorizationHandle
)

