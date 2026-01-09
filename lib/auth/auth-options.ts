import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { compare } from 'bcryptjs'
// import prisma from '@/lib/db/prisma'

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Senha', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email e senha são obrigatórios')
                }

                // MOCK AUTH FOR DEVELOPMENT WITHOUT DB
                if (credentials.email) {
                    return {
                        id: 'mock-user-id',
                        email: credentials.email,
                        name: 'Usuário Web',
                        image: null,
                        isPremium: true,
                        password: '' // Not needed for mock
                    }
                }

                /* 
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                    include: {
                        subscription: true,
                    },
                })

                if (!user) {
                    throw new Error('Credenciais inválidas')
                }

                const isPasswordValid = await compare(credentials.password, user.password)

                if (!isPasswordValid) {
                    throw new Error('Credenciais inválidas')
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    isPremium: user.isPremium,
                }
                */
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.isPremium = (user as any).isPremium
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id
                    ; (session.user as any).isPremium = token.isPremium
            }
            return session
        },
    },
}
