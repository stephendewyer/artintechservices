import { SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/core/providers/credentials";
import { AUTH_SECRET } from '$env/static/private';
import { clientAuthentication } from "$lib/server/authentication/client-authentication.js";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                if (credentials.providerId === "client-login") {
                    // @ts-ignore
                    const response = await clientAuthentication(credentials);
                    if (response === null) {
                        return null;
                    } else if (response) {
                        const responseItem = await response;
                        return responseItem ?? null;
                    };
                } else {
                    return null;
                };
            }
        })
    ],
    secret: AUTH_SECRET,
    debug: false,
    session: {
        // maxAge: 1800, // 30 mins
        strategy: "jwt"
        
    },
    trustHost: true
});