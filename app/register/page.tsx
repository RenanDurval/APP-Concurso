'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validações
        if (formData.name.length < 3) {
            setError('Nome deve ter no mínimo 3 caracteres')
            return
        }

        if (formData.password.length < 6) {
            setError('Senha deve ter no mínimo 6 caracteres')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem')
            return
        }

        setIsLoading(true)

        try {
            // Criar usuário
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Erro ao criar conta')
                setIsLoading(false)
                return
            }

            // Auto-login após registro
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (result?.error) {
                setError('Conta criada, mas erro ao fazer login. Tente fazer login manualmente.')
                setIsLoading(false)
                return
            }

            router.push('/dashboard')
            router.refresh()
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.')
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 px-4 py-12">
            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-2 gradient-text">
                        Crie sua conta
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Comece sua jornada rumo à aprovação
                    </p>
                </div>

                {/* Register Form */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 animate-slide-up">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Nome completo"
                            type="text"
                            placeholder="João Silva"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            disabled={isLoading}
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={isLoading}
                        />

                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            disabled={isLoading}
                        />

                        <Input
                            label="Confirmar senha"
                            type="password"
                            placeholder="Digite a senha novamente"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            disabled={isLoading}
                        />

                        {error && (
                            <div className="p-3 rounded-lg bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800">
                                <p className="text-sm text-danger-600 dark:text-danger-400 font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Criar conta gratuita
                        </Button>

                        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                            Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
                        </p>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">
                                Já tem uma conta?
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <Link href="/login">
                        <Button variant="outline" size="lg" className="w-full">
                            Fazer login
                        </Button>
                    </Link>
                </div>

                {/* Back to Home */}
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
