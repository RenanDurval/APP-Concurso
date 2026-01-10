'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { updateUserProfile } from '@/actions/user-actions'

interface ProfileFormProps {
    user: {
        id?: string | null
        name?: string | null
        email?: string | null
    } | undefined
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [loading, setLoading] = useState(false)

    const handleUpdate = async (formData: FormData) => {
        setLoading(true)
        try {
            const res = await updateUserProfile(formData)
            if (res.success) {
                alert("Perfil atualizado com sucesso!")
            } else {
                alert("Erro ao atualizar perfil.")
            }
        } catch (err) {
            console.error(err)
            alert("Erro inesperado.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid gap-6">
            <form action={handleUpdate}>
                <Card>
                    <CardHeader>
                        <CardTitle>Perfil Público</CardTitle>
                        <CardDescription>
                            Edite suas informações visíveis.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" name="name" defaultValue={user?.name || ''} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={user?.email || ''} readOnly disabled className="bg-muted" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>

            <Card>
                <CardHeader>
                    <CardTitle>Preferências de Estudo</CardTitle>
                    <CardDescription>
                        Esta funcionalidade será integrada ao algoritmo de IA em breve.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Área de Interesse</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:opacity-50"
                            name="areaInteresse"
                        >
                            <option>Carreiras Policiais</option>
                            <option>Tribunais</option>
                            <option>Administrativo</option>
                            <option>Fiscal</option>
                        </select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" type="button" onClick={() => alert("Preferências salvas localmente (Simulação).")}>
                        Atualizar Preferências
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
