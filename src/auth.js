import { SvelteKitAuth, AuthError } from "@auth/sveltekit";
import Credentials from "@auth/core/providers/credentials";
import { AUTH_SECRET } from '$env/static/private';
import { clientAuthentication } from "$lib/server/authentication/client-authentication";
import { administratorAuthentication } from "$lib/server/authentication/administrator-authentication";

class customError extends AuthError {
    /**
     * @param {string} message
     */
    constructor(message) {
        super()
        this.message = message
    };
};

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Credentials({
            authorize: async (credentials, request) => {
                let responseItem = null;
                if (credentials.providerId === "client-login") {
                    // @ts-ignore
                    const response = await clientAuthentication(credentials);
                    if (response === null) {
                        throw new customError("invalid email and/or password");
                    } else if (response) {
                        responseItem = await response;
                        return responseItem ?? null;
                    };
                } else if (credentials.providerId === "administrator-login") {
                    // @ts-ignore
                    const response = await administratorAuthentication(credentials);
                    if (response === null) {
                        throw new customError("invalid email and/or password");
                    } else if (response) {
                        responseItem = await response;
                        return responseItem ?? null;
                    };
                } else {
                    return null;
                };
            }
        })
    ],
    secret: AUTH_SECRET,
    debug: true,
    session: {
        maxAge: 1800, // 30 mins
        strategy: "jwt"
    },
    trustHost: true
});