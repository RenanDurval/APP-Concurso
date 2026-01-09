'use client'

import { Button } from '@/components/ui/button'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
                    <h2 className="text-2xl font-bold">Erro Crítico</h2>
                    <p className="text-muted-foreground">{error.message || 'Ocorreu um erro fatal na aplicação.'}</p>
                    <Button onClick={() => reset()}>Tentar novamente</Button>
                </div>
            </body>
        </html>
    )
}
