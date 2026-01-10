import { SearchBar } from '@/components/concurso/search-bar'
import { ConcursoGrid } from '@/components/concurso/concurso-grid'
import prisma from '@/lib/db/prisma'
import { Concurso } from '@/types'
import { Prisma } from '@prisma/client'

export const dynamic = 'force-dynamic'

interface SearchPageProps {
    searchParams: {
        q?: string
        status?: string
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q
    const status = searchParams.status

    const where: Prisma.ConcursoWhereInput = {
        AND: [
            // Filtro de Texto
            query ? {
                OR: [
                    { nome: { contains: query, mode: 'insensitive' } },
                    { orgao: { contains: query, mode: 'insensitive' } },
                    { cargo: { contains: query, mode: 'insensitive' } },
                ]
            } : {},
            // Filtro de Status
            status && status !== 'todos' ? {
                status: status
            } : {}
        ]
    }

    const concursosRaw = await prisma.concurso.findMany({
        where,
        include: {
            editais: {
                include: { banca: true }
            },
            estatisticas: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const concursos: Concurso[] = concursosRaw.map(c => {
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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">Buscar Concursos</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Encontre as melhores oportunidades para sua carreira
                </p>
            </div>

            <SearchBar />

            <div className="mt-8">
                <ConcursoGrid concursos={concursos} />
            </div>
        </div>
    )
}
