import Link from 'next/link'
import { Concurso } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'

interface ConcursoCardProps {
    concurso: Concurso
}

export function ConcursoCard({ concurso }: ConcursoCardProps) {
    const statusColors: Record<string, string> = {
        aberto: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 border-success-200 dark:border-success-800',
        previsto: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 border-warning-200 dark:border-warning-800',
        encerrado: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    }


    const statusLabels = {
        aberto: '🟢 Aberto',
        previsto: '🟡 Previsto',
        encerrado: '⚫ Encerrado',
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    const formatDate = (date: Date | null) => {
        if (!date) return 'A definir'
        return new Intl.DateTimeFormat('pt-BR').format(date)
    }

    return (
        <Link href={`/dashboard/concurso/${concurso.id}`}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 card-hover h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
                            {concurso.nome}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {concurso.orgao} • {concurso.banca}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[concurso.status as keyof typeof statusColors]}`}>
                        {statusLabels[concurso.status as keyof typeof statusLabels]}
                    </span>
                </div>

                {/* Cargo */}
                <div className="mb-4">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        📋 {concurso.cargo}
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Vagas</p>
                        <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            {concurso.numeroVagas}
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Salário</p>
                        <p className="text-lg font-bold text-success-600 dark:text-success-400">
                            {formatCurrency(concurso.salario)}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        {concurso.inscritosPorVaga && (
                            <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                                📊 {concurso.inscritosPorVaga}/vaga
                            </span>
                        )}
                        {concurso.status === 'aberto' && concurso.dataInscricaoFim && (
                            <span className="bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-300 px-2 py-1 rounded">
                                ⏰ Até {formatDate(concurso.dataInscricaoFim)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
