import Link from 'next/link'
import { ConcursoCard } from '@/components/concurso/concurso-card'
import { Concurso } from '@/types'

interface ConcursoGridProps {
    concursos: Concurso[]
}

export function ConcursoGrid({ concursos }: ConcursoGridProps) {
    if (concursos.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Nenhum concurso encontrado
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                    Tente ajustar seus filtros ou buscar por outros termos
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {concursos.map((concurso) => (
                <Link key={concurso.id} href={`/dashboard/concurso/${concurso.id}`}>
                    <ConcursoCard concurso={concurso} />
                </Link>
            ))}
        </div>
    )
}
