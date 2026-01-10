'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBarProps {
    onSearch?: (term: string) => void
    onFilterStatus?: (status: string) => void
}

export function SearchBar({ onSearch, onFilterStatus }: SearchBarProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        if (onSearch) {
            onSearch(term)
            return
        }

        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    const handleStatusFilter = (status: string) => {
        if (onFilterStatus) {
            onFilterStatus(status)
            return
        }

        const params = new URLSearchParams(searchParams)
        if (status && status !== 'todos') {
            params.set('status', status)
        } else {
            params.delete('status')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    const currentStatus = searchParams.get('status') || 'todos'

    return (
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Buscar por concurso, órgão ou cargo..."
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('q')?.toString()}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => handleStatusFilter('todos')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentStatus === 'todos'
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => handleStatusFilter('aberto')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentStatus === 'aberto'
                        ? 'bg-success-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                >
                    🟢 Abertos
                </button>
                <button
                    onClick={() => handleStatusFilter('previsto')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentStatus === 'previsto'
                        ? 'bg-warning-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                >
                    🟡 Previstos
                </button>
                <button
                    onClick={() => handleStatusFilter('encerrado')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentStatus === 'encerrado'
                        ? 'bg-slate-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                >
                    ⚫ Encerrados
                </button>
            </div>
        </div>
    )
}
