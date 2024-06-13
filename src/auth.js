import { SvelteKitAuth, CredentialsSignin } from "@auth/sveltekit";
import Credentials from "@auth/core/providers/credentials";
import { AUTH_SECRET } from '$env/static/private';
import { clientAuthentication } from "$lib/server/authentication/client-authentication";
import { administratorAuthentication } from "$lib/server/authentication/administrator-authentication";

class InvalidLoginError extends CredentialsSignin {
    code = "invalid email and/or password"
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
                        throw new InvalidLoginError();
                    } else if (response) {
                        responseItem = await response;
                        return responseItem ?? null;
                    };
                } else if (credentials.providerId === "administrator-login") {
                    // @ts-ignore
                    const response = await administratorAuthentication(credentials);
                    if (response === null) {
                        throw new InvalidLoginError();
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
        // maxAge: 1800, // 30 mins
        strategy: "jwt"
    },
    trustHost: true
});