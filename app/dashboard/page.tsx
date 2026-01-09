import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import Link from 'next/link'

export default async function DashboardPage() {
    const session = await getSession()

    // if (!session) {
    //     redirect('/login')
    // }

    const user = (session?.user || {
        name: 'Usuário Demo',
        email: 'demo@teste.com',
        isPremium: true
    }) as any

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            {/* Top Navigation */}
            <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <span className="text-2xl">📚</span>
                            <h1 className="text-xl font-bold gradient-text">App de Concursos</h1>
                        </Link>

                        {/* Right Side */}
                        <div className="flex items-center gap-4">
                            <ThemeToggle />

                            {/* User Menu */}
                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {user.isPremium ? (
                                            <span className="text-warning-600 dark:text-warning-400 font-semibold">⭐ Premium</span>
                                        ) : (
                                            <span>Gratuito</span>
                                        )}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <DashboardContent
                    userName={user.name?.split(' ')[0] || 'Usuário'}
                    isPremium={user.isPremium || false}
                />
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            © 2026 App de Concursos. Todos os direitos reservados.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Início
                            </Link>
                            <Link href="/pricing" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Planos
                            </Link>
                            <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Ajuda
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
