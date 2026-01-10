import { Metadata } from 'next'
import { getSession } from '@/lib/auth/session'
import prisma from '@/lib/db/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Histórico de Questões | APP Concursos',
    description: 'Veja todas as questões que você já resolveu.',
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}

export default async function HistoryPage() {
    const session = await getSession()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session?.user as any)?.id

    let history: any[] = []

    if (userId) {
        history = await prisma.userProgress.findMany({
            where: { userId },
            include: {
                questao: {
                    select: {
                        enunciado: true,
                        materia: true,
                        assunto: true,
                        dificuldade: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">Histórico de Questões</h2>
                    <p className="text-muted-foreground">
                        Reveja seu desempenho e aprenda com seus erros.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Últimas Respostas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Data</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Questão</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Matéria</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {history.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground h-24">
                                            Nenhuma questão respondida ainda. <Link href="/dashboard/questoes" className="text-primary underline">Começar agora</Link>
                                        </td>
                                    </tr>
                                ) : (
                                    history.map((item) => (
                                        <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle">{formatDate(item.createdAt)}</td>
                                            <td className="p-4 align-middle font-medium">
                                                <div className="max-w-[300px] truncate" title={item.questao?.enunciado}>
                                                    {item.questao?.enunciado || 'Questão sem enunciado'}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                    {item.questao?.materia}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                {item.acertou ? (
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
                                                        Acertou
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20">
                                                        Errou
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <button className="text-sm font-medium text-primary hover:underline" disabled>
                                                    Ver Detalhes
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
