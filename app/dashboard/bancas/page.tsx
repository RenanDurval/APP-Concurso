import { BancaList } from '@/components/banca/banca-list'
import prisma from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export default async function BancasPage() {
    const bancas = await prisma.banca.findMany({
        include: {
            analises: true
        },
        orderBy: {
            nome: 'asc'
        }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">Bancas Examinadoras</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Conheça o perfil das principais bancas e prepare-se estrategicamente.
                </p>
            </div>

            <BancaList bancas={bancas} />
        </div>
    )
}
