import Link from 'next/link'
import { Banca, BancaAnalise } from '@prisma/client'

interface BancaCardProps {
    banca: Banca & {
        analises: BancaAnalise[]
    }
}

export function BancaCard({ banca }: BancaCardProps) {
    const analise = banca.analises?.[0]
    const dificuldade = analise?.dificuldadeMedia ? Number(analise.dificuldadeMedia) : 0

    return (
        <Link
            href={`/dashboard/bancas/${banca.id}`}
            className="group block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:border-primary-500 dark:hover:border-primary-500 transition-all shadow-sm hover:shadow-md"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {banca.nome}
                </h3>
                {dificuldade > 0 && (
                    <span className={`px-2 py-1 rounded text-xs font-bold ${dificuldade >= 8 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                            dificuldade >= 5 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                        Dificuldade: {dificuldade.toFixed(1)}
                    </span>
                )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 h-10">
                {banca.descricao || 'Sem descrição disponível.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Ver detalhes
                </span>
            </div>
        </Link>
    )
}
