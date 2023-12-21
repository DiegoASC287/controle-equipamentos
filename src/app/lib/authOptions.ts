import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { NextAuthOptions, User, Account, Profile } from "next-auth";
import prisma from "@/app/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import jwt from 'jsonwebtoken'
import {Session} from 'next-auth'
import {JWT} from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'seu@email.com'},
                password: {label: 'Password', type: 'text'},
            },
            async authorize(credentials){
                if(!credentials || !credentials?.email || !credentials?.password){
                    return null
                }
                const {email, password} = credentials
                const user = await prisma.user.findUnique({
                    where:{
                        email
                    }
                })
                console.log(user)
                if(!user){
                    return null
                }


                const passwordMatch = await bcrypt.compareSync(credentials?.password, `${user.hashedPassword}`)
                
                if(!passwordMatch){
                    return null
                }
                return {id: user.id, email: user.email, name: user.name, image: user.image, papel: user.papel}
            },

        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signOut'
    },
    session: {
        strategy: "jwt",
        maxAge: 24*60*60,
        updateAge: 24*60*60
    },callbacks:{
        async session(params: {session: Session; token: JWT, user: User}){
            if(params.session.user){
                params.session.user.email = params.token.email
                params.session.papel = params.token.papel
            }

            return params.session
        }, 
        async jwt(params: {
            token: JWT,
            user?: User | undefined,
            account?: Account | null | undefined,
            profile?: Profile | undefined,
            isNewUser?: boolean | undefined,
        }){
            if(params.user){
                params.token.email = params.user.email
                params.token.papel = params.user.papel
            }
            return {...params.token};

        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        async encode({secret, token}){
            if(!token){
                throw new Error('Não existe um token para encodificar')
            }
            return jwt.sign(token, secret)
        },
        async decode({secret, token}){
            if(!token){
                throw new Error('Não existe um token para decodificar')
            }
            const decodedToken = jwt.verify(token, secret)
            if(typeof decodedToken === 'string'){
                return JSON.parse(decodedToken)
            } else {
                return decodedToken
            }
        }
    },
    debug: process.env.NODE_ENV === 'development'
}