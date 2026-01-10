'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { simulateSubscriptionUpgrade } from '@/actions/user-actions'

export function UpgradeButton() {
    const [loading, setLoading] = useState(false)

    const handleUpgrade = async () => {
        setLoading(true)
        try {
            const res = await simulateSubscriptionUpgrade()
            if (res.success) {
                // We rely on revalidatePath in the server action, but a reload ensures everything updates visually immediately if needed
                alert("Parabéns! Você agora é Premium (Modo Simulação).")
            } else {
                alert("Erro ao assinar.")
            }
        } catch (err) {
            console.error(err)
            alert("Erro desconhecido.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button className="w-full" onClick={handleUpgrade} disabled={loading}>
            {loading ? "Processando..." : "Assinar Agora (Simulação)"}
        </Button>
    )
}
