import { BancaAnalise } from '@prisma/client'

interface BancaStatsProps {
    analise: BancaAnalise | null
}

export function BancaStats({ analise }: BancaStatsProps) {
    if (!analise) {
        return (
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center text-slate-500">
                Sem dados estatísticos suficientes para esta banca.
            </div>
        )
    }

    const diff = analise.dificuldadeMedia ? Number(analise.dificuldadeMedia) : 0
    const obj = analise.porcentagemObjetivas ? Number(analise.porcentagemObjetivas) : 0
    const disc = analise.porcentagemDiscursivas ? Number(analise.porcentagemDiscursivas) : 0

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-sm text-slate-500 dark:text-slate-400 block mb-2">Dificuldade Média</span>
                <div className="relative inline-flex items-center justify-center w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-700" />
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className={`${diff >= 8 ? 'text-red-500' : diff >= 5 ? 'text-yellow-500' : 'text-green-500'
                            }`} strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * diff) / 10} />
                    </svg>
                    <span className="absolute text-2xl font-bold">{diff}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">de 0 a 10</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-4 text-center">Distribuição</h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Objetivas</span>
                            <span className="font-medium">{obj}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${obj}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Discursivas</span>
                            <span className="font-medium">{disc}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${disc}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold mb-2">Matérias Destaque</h4>
                <div className="flex flex-wrap gap-2">
                    {analise.materiasComuns ? (
                        (() => {
                            try {
                                const materias = JSON.parse(analise.materiasComuns)
                                return materias.map((m: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-md">
                                        {m}
                                    </span>
                                ))
                            } catch {
                                return <span className="text-xs text-slate-500">Erro ao carregar matérias</span>
                            }
                        })()
                    ) : (
                        <span className="text-xs text-slate-500">Sem dados</span>
                    )}
                </div>
            </div>
        </div>
    )
}
