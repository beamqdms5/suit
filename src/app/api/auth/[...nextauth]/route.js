import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        Credentials({
            id: "oidc",
            name: "OIDC",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(process.env.OIDC_TOKEN_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({
                            client_id: process.env.OIDC_CLIENT_ID,
                            client_secret: process.env.OIDC_CLIENT_SECRET,
                            grant_type: "password",
                            username: credentials.username,
                            password: credentials.password,
                            scope: "openid profile email",
                        }),
                    });

                    if (!response.ok) {
                        console.error("Authorization error:", response.statusText);
                        return null;
                    }

                    const token = await response.json();

                    if (!token.access_token) {
                        console.error("Invalid credentials");
                        return null;
                    }

                    return {
                        id: token.sub,
                        name: token.name,
                        email: token.email,
                        accessToken: token.access_token,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
