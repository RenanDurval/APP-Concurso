import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-4">Ops! Página não encontrada</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                    A página que você está procurando não existe ou foi removida.
                </p>
                <Link href="/dashboard">
                    <Button size="lg">
                        Voltar ao Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    )
}
