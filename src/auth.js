// import { clientAuthentication } from "$lib/server/authentication/client-authentication";
// import { administratorAuthentication } from "$lib/server/authentication/administrator-authentication";

// export const { handle, signIn, signOut } = SvelteKitAuth({
//     providers: [
//         Credentials({
//             authorize: async (credentials) => {
//                 console.log(credentials);
//                 let responseItem = null;
//                 if (credentials.providerId === "client-login") {
//                     // @ts-ignore
//                     const response = await clientAuthentication(credentials);
//                     if (response === null) {
//                         throw new Error("invalid email and/or password");
//                     } else if (response) {
//                         responseItem = await response;
//                         return responseItem ?? null;
//                     };
//                 } else if (credentials.providerId === "administrator-login") {
//                     // @ts-ignore
//                     const response = await administratorAuthentication(credentials);
//                     if (response === null) {
//                         throw new Error("invalid email and/or password");
//                     } else if (response) {
//                         responseItem = await response;
//                         return responseItem ?? null;
//                     };
//                 } else {
//                     return null;
//                 };
//             }
//         })
//     ],
//     pages: {
//         signIn: "/login",
//         error: "/login"
//     },
//     secret: AUTH_SECRET,
//     debug: true,
//     session: {
//         // maxAge: 1800, // 30 mins
//         strategy: "jwt"
//     },
//     trustHost: true
// });