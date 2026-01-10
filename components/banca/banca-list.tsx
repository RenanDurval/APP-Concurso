'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Banca, BancaAnalise } from '@prisma/client'
import { BancaCard } from './banca-card'

interface BancaListProps {
    bancas: (Banca & {
        analises: BancaAnalise[]
    })[]
}

export function BancaList({ bancas }: BancaListProps) {
    const [search, setSearch] = useState('')

    const filteredBancas = bancas.filter(b =>
        b.nome.toLowerCase().includes(search.toLowerCase()) ||
        b.descricao?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="relative max-w-md">
                <Input
                    placeholder="Buscar banca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBancas.map(banca => (
                    <BancaCard key={banca.id} banca={banca} />
                ))}

                {filteredBancas.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        Nenhuma banca encontrada para &quot;{search}&quot;
                    </div>
                )}
            </div>
        </div>
    )
}
