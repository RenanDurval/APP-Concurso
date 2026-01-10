import prisma from '@/lib/db/prisma'
import { PracticePage } from '@/components/questoes/practice-page'
import { Metadata } from 'next'

import { getSession } from '@/lib/auth/session'
import { StatsCard } from '@/components/questoes/stats-card'

export const metadata: Metadata = {
    title: 'Gerador de Questões | APP Concursos',
    description: 'Pratique com questões ilimitadas geradas por Inteligência Artificial',
}

export default async function QuestionGeneratorPage() {
    const session = await getSession()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session?.user as any)?.id

    // Buscar todas as bancas cadastradas
    const bancas = await prisma.banca.findMany({
        select: { id: true, nome: true },
        orderBy: { nome: 'asc' }
    })

    // Buscar estatísticas do usuário
    let totalQuestions = 0
    let correctAnswers = 0

    if (userId) {
        const stats = await prisma.userProgress.aggregate({
            where: { userId },
            _count: { id: true },
        })

        const correctStats = await prisma.userProgress.aggregate({
            where: { userId, acertou: true },
            _count: { id: true },
        })

        totalQuestions = stats._count.id
        correctAnswers = correctStats._count.id
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Gerador de Questões</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Pratique com questões inéditas focadas na sua banca e cargo.
                </p>
            </div>

            <StatsCard total={totalQuestions} correct={correctAnswers} />

            <PracticePage bancas={bancas} />
        </div>
    )
}
