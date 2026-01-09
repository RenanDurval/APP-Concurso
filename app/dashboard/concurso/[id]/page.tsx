import { getSession } from '@/lib/auth/session'
import { redirect, notFound } from 'next/navigation'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import Link from 'next/link'
import { mockConcursos } from '@/lib/data/mock-concursos'
import { Button } from '@/components/ui/button'

export default async function ConcursoDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const session = await getSession()

    // if (!session) {
    //     redirect('/login')
    // }

    const user = (session?.user || {
        name: 'Usuário Demo',
        email: 'demo@teste.com',
        isPremium: true
    }) as any

    const concurso = mockConcursos.find((c) => c.id === params.id)

    if (!concurso) {
        notFound()
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    const formatDate = (date: Date | null) => {
        if (!date) return 'A definir'
        return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date)
    }

    // const user = session.user as any // Removed duplicate

    const statusColors = {
        aberto: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300',
        previsto: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300',
        encerrado: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    }

    const statusLabels = {
        aberto: '🟢 Inscrições Abertas',
        previsto: '🟡 Em Breve',
        encerrado: '⚫ Encerrado',
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            {/* Top Navigation */}
            <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="font-medium">Voltar ao Dashboard</span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${statusColors[concurso.status as keyof typeof statusColors]}`}>
                                    {statusLabels[concurso.status as keyof typeof statusLabels]}
                                </span>
                                <h1 className="text-3xl font-bold mb-2">{concurso.nome}</h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400">{concurso.orgao}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Vagas</p>
                                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{concurso.numeroVagas}</p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Salário Inicial</p>
                                <p className="text-2xl font-bold text-success-600 dark:text-success-400">{formatCurrency(concurso.salario)}</p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Inscritos/Vaga</p>
                                <p className="text-3xl font-bold text-warning-600 dark:text-warning-400">
                                    {concurso.inscritosPorVaga || '—'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Informações Gerais */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-bold mb-4">📋 Informações Gerais</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Cargo</p>
                                    <p className="font-medium">{concurso.cargo}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Banca Organizadora</p>
                                    <p className="font-medium">{concurso.banca}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Nível de Escolaridade</p>
                                    <p className="font-medium capitalize">{concurso.nivelEscolaridade}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Abrangência</p>
                                    <p className="font-medium capitalize">{concurso.regiaoAbrangencia}</p>
                                </div>
                            </div>
                        </div>

                        {/* Prazos */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-bold mb-4">📅 Cronograma</h2>
                            <div className="space-y-3">
                                {concurso.status === 'aberto' && concurso.dataInscricaoFim && (
                                    <div className="p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg border border-danger-200 dark:border-danger-800">
                                        <p className="text-sm text-danger-600 dark:text-danger-400 font-medium">⏰ Inscrições até</p>
                                        <p className="font-bold text-danger-700 dark:text-danger-300">{formatDate(concurso.dataInscricaoFim)}</p>
                                    </div>
                                )}
                                {concurso.status === 'previsto' && (
                                    <div className="p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg border border-warning-200 dark:border-warning-800">
                                        <p className="text-sm text-warning-600 dark:text-warning-400">Em breve serão divulgadas as datas</p>
                                    </div>
                                )}
                                {concurso.status === 'encerrado' && (
                                    <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Concurso encerrado</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Funcionalidades Premium */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-8 text-white mb-8">
                        <h2 className="text-2xl font-bold mb-4">🚀 Recursos Disponíveis</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <h3 className="font-semibold mb-2">📊 Análise da Banca</h3>
                                <p className="text-sm text-primary-100 mb-3">
                                    Veja como a {concurso.banca} costuma cobrar nas provas
                                </p>
                                <Button variant={user.isPremium ? "secondary" : "outline"} size="sm">
                                    {user.isPremium ? 'Ver Análise' : '⭐ Premium'}
                                </Button>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <h3 className="font-semibold mb-2">💡 Questões com IA</h3>
                                <p className="text-sm text-primary-100 mb-3">
                                    Pratique com questões geradas especificamente para esta banca
                                </p>
                                <Button variant={user.isPremium ? "secondary" : "outline"} size="sm">
                                    {user.isPremium ? 'Praticar' : '⭐ Premium'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Edital em breve */}
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            📄 <strong>Em desenvolvimento:</strong> Visualização de editais, cronograma detalhado e muito mais!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
