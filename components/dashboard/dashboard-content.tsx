'use client'

import { useState } from 'react'
import { mockConcursos } from '@/lib/data/mock-concursos'
import { SearchBar } from '@/components/concurso/search-bar'
import { ConcursoCard } from '@/components/concurso/concurso-card'

interface DashboardContentProps {
    userName: string
    isPremium: boolean
}

export function DashboardContent({ userName, isPremium }: DashboardContentProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('todos')

    // Filtrar concursos
    const filteredConcursos = mockConcursos.filter((concurso) => {
        // Filtro de texto
        const matchesSearch =
            searchQuery === '' ||
            concurso.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
            concurso.orgao.toLowerCase().includes(searchQuery.toLowerCase()) ||
            concurso.cargo.toLowerCase().includes(searchQuery.toLowerCase())

        // Filtro de status
        const matchesStatus = statusFilter === 'todos' || concurso.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const abertosCount = mockConcursos.filter((c) => c.status === 'aberto').length
    const previstosCount = mockConcursos.filter((c) => c.status === 'previsto').length

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Bem-vindo, {userName}! 👋
                        </h1>
                        <p className="text-primary-100 text-lg">
                            {isPremium ? (
                                <>⭐ Você é Premium! Aproveite todos os recursos</>
                            ) : (
                                <>Explore concursos e turbine seus estudos</>
                            )}
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                            <p className="text-5xl font-bold">{mockConcursos.length}</p>
                            <p className="text-sm text-primary-100">Concursos disponíveis</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-success-600 rounded-lg flex items-center justify-center text-white text-2xl">
                            🟢
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-success-700 dark:text-success-300">{abertosCount}</p>
                            <p className="text-sm text-success-600 dark:text-success-400">Concursos Abertos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-warning-600 rounded-lg flex items-center justify-center text-white text-2xl">
                            🟡
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-warning-700 dark:text-warning-300">{previstosCount}</p>
                            <p className="text-sm text-warning-600 dark:text-warning-400">Previstos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white text-2xl">
                            💡
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">0</p>
                            <p className="text-sm text-primary-600 dark:text-primary-400">Questões Praticadas</p>
                        </div>
                    </div>
                </div>
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
