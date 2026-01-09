import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'
import { redirect } from 'next/navigation'

/**
 * Get the current session on the server
 */
export async function getSession() {
    return await getServerSession(authOptions)
}

/**
 * Get the current user or redirect to login
 */
export async function getCurrentUser() {
    const session = await getSession()

    if (!session?.user) {
        redirect('/login')
    }

    return session.user
}

/**
 * Check if user is premium
 */
export async function isPremiumUser() {
    const session = await getSession()
    return (session?.user as any)?.isPremium || false
}

/**
 * Require premium access or redirect
 */
export async function requirePremium() {
    const premium = await isPremiumUser()

    if (!premium) {
        redirect('/pricing')
    }
}
