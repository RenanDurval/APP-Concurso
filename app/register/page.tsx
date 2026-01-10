'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { RegisterForm } from '@/components/auth/register-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 px-4 py-12">
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-2 gradient-text">
                        Crie sua conta
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Comece sua jornada rumo à aprovação
                    </p>
                </div>

                <Card className="animate-slide-up border-slate-200 dark:border-slate-700 shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Cadastro</CardTitle>
                        <CardDescription className="text-center">
                            Preencha seus dados para começar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>

                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                        ← Voltar para home
                    </Link>
                </div>
            </div>
        </main>
    )
}
