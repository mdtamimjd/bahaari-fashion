import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                mail: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },
            async authorize(credentials) {
                if(!credentials) return null;
                const {mail,password} = credentials;
                if(!mail || !password)return null;
                if(mail === process.env.ADMIN as string && password === process.env.PASSWORD as string) return {email:mail};
                return null;
            },
        })
    ],
    pages:{
        signIn:"/"
    },
    session:{
        strategy:"jwt"
    },
    callbacks:{
        async jwt({token,user}) {
            if(user){
                token.email = user.email
            }
            return token;
        },
        async session({session,token}) {
            if(token){
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET as string
})