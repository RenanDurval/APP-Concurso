import { getSession } from '@/lib/auth/session'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import prisma from '@/lib/db/prisma'
import { Concurso } from '@/types'

export default async function DashboardPage() {
    const session = await getSession()
    const user = session?.user

    if (!user) {
        // Redirect to login handled by middleware, but good to have safety
        return null
    }

    let concursos: Concurso[] = []
    let recentActivity: any[] = []
    let weeklyPerformance: any[] = []
    let stats = {
        questoesFeitas: 0,
        taxaAcerto: 0,
        concursosAbertos: 0,
        concursosPrevistos: 0
    }
    let error = null

    try {
        // 1. Fetch Concursos (Existing logic)
        const concursosRaw = await prisma.concurso.findMany({
            include: {
                editais: {
                    include: { banca: true }
                },
                estatisticas: true
            },
            orderBy: { createdAt: 'desc' },
            take: 10 // Limit for dashboard
        })

        concursos = concursosRaw.map(c => {
            const principalEdital = c.editais?.[0]
            const estatistica = c.estatisticas?.[0]
            return {
                id: c.id,
                nome: c.nome,
                orgao: c.orgao,
                cargo: c.cargo,
                status: c.status,
                numeroVagas: c.numeroVagas,
                salario: c.salario ? Number(c.salario) : null,
                nivelEscolaridade: c.nivelEscolaridade,
                regiaoAbrangencia: c.regiaoAbrangencia,
                dataInscricaoFim: principalEdital?.dataInscricaoFim?.toISOString() || null,
                banca: principalEdital?.banca?.nome || null,
                inscritosPorVaga: estatistica?.inscritosPorVaga ? Number(estatistica.inscritosPorVaga) : null
            }
        })

        // 2. Stats Cards Data
        stats.concursosAbertos = concursosRaw.filter(c => c.status === 'aberto').length
        stats.concursosPrevistos = concursosRaw.filter(c => c.status === 'previsto').length

        // Fetch Total Questions and Correct Answers for this user
        const userProgress = await prisma.userProgress.findMany({
            where: { userId: user.id },
            include: { questao: true },
            orderBy: { createdAt: 'desc' }
        })

        stats.questoesFeitas = userProgress.length
        const acertos = userProgress.filter(p => p.acertou).length
        stats.taxaAcerto = stats.questoesFeitas > 0 ? Math.round((acertos / stats.questoesFeitas) * 100) : 0

        // 3. Recent Activity Data (Last 5 items)
        recentActivity = userProgress.slice(0, 5).map(p => ({
            id: p.id,
            type: 'question',
            title: `Questão de ${p.questao.materia}`,
            description: p.acertou ? 'Acertou a questão' : 'Errou a questão',
            points: p.acertou ? '+10pts' : '0pts',
            details: p.questao.assunto || 'Geral',
            status: p.acertou ? 'correct' : 'incorrect',
            date: p.createdAt
        }))

        // 4. Weekly Performance Chart Data
        const today = new Date()
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date()
            d.setDate(today.getDate() - (6 - i))
            return d
        })

        weeklyPerformance = last7Days.map(date => {
            const dayStr = date.toLocaleDateString('pt-BR', { weekday: 'short' })
            // simple formatting: "seg", "ter"
            const dayName = dayStr.charAt(0).toUpperCase() + dayStr.slice(1, 3) 
            
            // Count questions answered on this day
            const startOfDay = new Date(date.setHours(0, 0, 0, 0))
            const endOfDay = new Date(date.setHours(23, 59, 59, 999))

            const count = userProgress.filter(p => 
                p.createdAt >= startOfDay && p.createdAt <= endOfDay
            ).length

            return {
                name: dayName,
                total: count
            }
        })

    } catch (e: any) {
        console.error('Dashboard Error:', e)
        error = e.message
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar dados</h1>
                <pre className="text-left bg-gray-100 p-4 rounded overflow-auto text-sm text-red-800">
                    {error}
                </pre>
            </div>
        )
    }

    return (
        <DashboardContent
            userName={user.name || 'Concurseiro'}
            isPremium={user.isPremium}
            concursos={concursos}
            stats={stats}
            recentActivity={recentActivity}
            weeklyChart={weeklyPerformance}
        />
    )
}
