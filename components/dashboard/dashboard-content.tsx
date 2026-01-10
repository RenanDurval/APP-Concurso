'use client'

import { useState } from 'react'
import { SearchBar } from '@/components/concurso/search-bar'
import { ConcursoCard } from '@/components/concurso/concurso-card'
import { Concurso } from '@/types'

import { OverviewChart } from "@/components/dashboard/overview-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardContentProps {
    userName: string
    isPremium: boolean
    concursos: Concurso[]
    stats?: {
        questoesFeitas: number
        taxaAcerto: number
        concursosAbertos: number
        concursosPrevistos: number
    },
    recentActivity?: any[],
    weeklyChart?: any[]
}

export function DashboardContent({
    userName,
    isPremium,
    concursos,
    stats = {
        questoesFeitas: 0,
        taxaAcerto: 0,
        concursosAbertos: 0,
        concursosPrevistos: 0
    },
    recentActivity = [],
    weeklyChart = []
}: DashboardContentProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('todos')

    // Filtrar concursos
    const filteredConcursos = concursos.filter((concurso) => {
        // Filtro de texto
        const matchesSearch =
            searchQuery === '' ||
            concurso.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
            concurso.orgao.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (concurso.cargo?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

        // Filtro de status
        const matchesStatus = statusFilter === 'todos' || concurso.status === statusFilter

        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary hover:bg-primary/90 h-10 py-2 px-4 shadow">
                        Download Relatório
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Concursos Abertos
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.concursosAbertos}</div>
                        <p className="text-xs text-muted-foreground">
                            +2 desde o mês passado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Concursos Previstos
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.concursosPrevistos}</div>
                        <p className="text-xs text-muted-foreground">
                            +18% em relação ao mês passado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Questões Feitas</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.questoesFeitas}</div>
                        <p className="text-xs text-muted-foreground">
                            +19% em relação à semana passada
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Taxa de Acerto
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.taxaAcerto}%</div>
                        <p className="text-xs text-muted-foreground">
                            +2.1% desde a última hora
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Desempenho Semanal</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart data={weeklyChart} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Atividade Recente</CardTitle>
                        <CardDescription>
                            Você fez {recentActivity.length} questões recentemente.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentActivity activities={recentActivity} />
                    </CardContent>
                </Card>
            </div>

            {/* Search Bar */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Buscar Concursos</h2>
                <SearchBar onSearch={setSearchQuery} onFilterStatus={setStatusFilter} />
            </div>

            {/* Results */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                        {filteredConcursos.length} {filteredConcursos.length === 1 ? 'resultado' : 'resultados'}
                    </h3>
                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchQuery('')
                                setStatusFilter('todos')
                            }}
                            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                        >
                            Limpar filtros
                        </button>
                    )}
                </div>

                {filteredConcursos.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <p className="text-4xl mb-4">🔍</p>
                        <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Nenhum concurso encontrado
                        </p>
                        <p className="text-slate-500 dark:text-slate-400">
                            Tente ajustar os filtros ou a busca
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredConcursos.map((concurso) => (
                            <ConcursoCard key={concurso.id} concurso={concurso} />
                        ))}
                    </div>
                )}
            </div>

            {/* Help Card for non-premium users */}
            {!isPremium && (
                <div className="bg-gradient-to-r from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 border border-warning-200 dark:border-warning-700 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">⭐</div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-warning-900 dark:text-warning-100">
                                Desbloqueie Todo o Potencial
                            </h3>
                            <p className="text-warning-700 dark:text-warning-300 mb-4">
                                Com o plano Premium, você terá acesso a análises completas de bancas, geração ilimitada de questões com IA e muito mais!
                            </p>
                            <button className="px-6 py-3 bg-warning-600 hover:bg-warning-700 text-white rounded-lg font-semibold transition-colors">
                                Ativar Premium
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
