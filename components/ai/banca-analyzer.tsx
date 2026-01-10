'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { analyzeBanca } from '@/actions/ai-actions'
import ReactMarkdown from 'react-markdown'

interface BancaAnalyzerProps {
    banca: string
}

export function BancaAnalyzer({ banca }: BancaAnalyzerProps) {
    const [analysis, setAnalysis] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleAnalyze = async () => {
        setIsLoading(true)
        try {
            const result = await analyzeBanca(banca)
            setAnalysis(result)
        } catch (error) {
            console.error(error)
            alert('Erro ao analisar banca. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                📊 Análise da Banca
            </h3>

            {!analysis ? (
                <div className="text-center py-6">
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Descubra o perfil da <strong>{banca}</strong>, suas pegadinhas mais comuns e temas favoritos.
                    </p>
                    <Button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        {isLoading ? 'Analisando...' : 'Gerar Análise Estratégica'}
                    </Button>
                </div>
            ) : (
                <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4 w-full text-slate-500"
                        onClick={() => setAnalysis(null)}
                    >
                        Fechar Análise
                    </Button>
                </div>
            )}
        </div>
    )
}
