import { Metadata } from 'next'
import { getSession } from '@/lib/auth/session'
import { ProfileForm } from '@/components/dashboard/profile-form'

export const metadata: Metadata = {
    title: 'Meu Perfil | APP Concursos',
    description: 'Gerencie suas informações pessoais.',
}

export default async function ProfilePage() {
    const session = await getSession()
    const user = session?.user

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
                <p className="text-muted-foreground">
                    Gerencie suas informações e preferências.
                </p>
            </div>

            <ProfileForm user={user} />
        </div>
    )
}
