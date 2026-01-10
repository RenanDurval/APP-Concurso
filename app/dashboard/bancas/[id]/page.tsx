import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/db/prisma'
import { BancaStats } from '@/components/banca/banca-stats'
import { BancaAnalyzer } from '@/components/ai/banca-analyzer'

export default async function BancaDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const banca = await prisma.banca.findUnique({
        where: { id: params.id },
        include: {
            analises: true,
            editais: {
                orderBy: { dataPublicacao: 'desc' },
                take: 5
            }
        }
    })

    if (!banca) notFound()

    return (
        <div className="space-y-8">
            <Link
                href="/dashboard/bancas"
                className="text-sm font-medium text-slate-500 hover:text-primary-600 flex items-center gap-1"
            >
                ← Voltar para Bancas
            </Link>

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">{banca.nome}</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
                    {banca.descricao}
                </p>
                {banca.site && (
                    <a
                        href={banca.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline text-sm mt-2 inline-block"
                    >
                        Visitar site oficial ↗
                    </a>
                )}
            </div>

            {/* Stats */}
            <BancaStats analise={banca.analises[0]} />

            {/* AI Analysis & Info */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold mb-4">📝 Estilo de Questões</h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {banca.estiloQuestoes || 'Informação não disponível.'}
                        </p>

                        {banca.analises[0]?.observacoes && (
                            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
                                <strong>Ponto de Atenção:</strong> {banca.analises[0].observacoes}
                            </div>
                        )}
                    </div>

                    <BancaAnalyzer banca={banca.nome} />
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-bold mb-4">Últimos Editais</h3>
                        {banca.editais.length > 0 ? (
                            <div className="space-y-3">
                                {banca.editais.map(edital => (
                                    <div key={edital.id} className="pb-3 border-b last:border-0 border-slate-100 dark:border-slate-700">
                                        <p className="font-medium text-sm truncate">{edital.numeroEdital}</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(edital.dataPublicacao).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">Nenhum edital recente cadastrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
