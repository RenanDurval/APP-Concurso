'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { generateQuestion, submitAnswer } from '@/actions/ai-actions'
import { Input } from '@/components/ui/input'
import { Questao } from '@prisma/client'
import { useToast } from '@/components/ui/use-toast'

interface QuestionGeneratorProps {
    banca: string
    cargo?: string
    saveProgress?: boolean
    onQuestionGenerated?: (question: Questao) => void
}

export function QuestionGenerator({ banca, cargo = 'Geral', saveProgress = false, onQuestionGenerated }: QuestionGeneratorProps) {
    const [topic, setTopic] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [question, setQuestion] = useState<Questao | null>(null)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const { toast } = useToast()

    const handleGenerate = async () => {
        if (!topic) {
            toast({
                title: 'Tema necessário',
                description: 'Por favor, digite um tema para gerar a questão.',
                type: 'warning'
            })
            return
        }
        setIsLoading(true)
        setQuestion(null)
        setShowFeedback(false)
        setSelectedAnswer(null)

        try {
            const result = await generateQuestion(topic, banca, cargo)
            setQuestion(result)
            onQuestionGenerated?.(result)
            toast({
                title: 'Questão Gerada!',
                description: 'Nova questão criada com sucesso.',
                type: 'success',
                duration: 2000
            })
        } catch (error) {
            console.error(error)
            toast({
                title: 'Erro',
                description: 'Não foi possível gerar a questão. Tente novamente.',
                type: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleAnswer = async (answerKey: string) => {
        if (!question) return

        setSelectedAnswer(answerKey)
        setShowFeedback(true)

        const isCorrect = answerKey === question.respostaCorreta

        if (saveProgress) {
            // Calcular tempo de resposta? Por enquanto mockado ou startado quando a questao renderizou
            await submitAnswer(question.id, answerKey, isCorrect, 0)
        }
    }

    const getAlternatives = (q: Questao) => [
        { key: 'A', text: q.alternativaA },
        { key: 'B', text: q.alternativaB },
        { key: 'C', text: q.alternativaC },
        { key: 'D', text: q.alternativaD },
        { key: 'E', text: q.alternativaE },
    ]

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                🤖 Gerador de Questões IA
            </h3>

            {!question && (
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                        Gere uma questão inédita estilo <strong>{banca}</strong> para praticar.
                    </p>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Digite um tema (ex: Crase, Atos Administrativos...)"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <Button onClick={handleGenerate} disabled={isLoading || !topic}>
                            {isLoading ? 'Gerando...' : 'Gerar'}
                        </Button>
                    </div>
                </div>
            )}

            {question && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-6">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase tracking-wide">
                            Questão Inédita
                        </span>
                        <p className="mt-4 text-lg font-medium">{question.enunciado}</p>
                    </div>

                    <div className="space-y-3">
                        {getAlternatives(question).map((alt) => (
                            <button
                                key={alt.key}
                                onClick={() => !showFeedback && handleAnswer(alt.key)}
                                disabled={showFeedback}
                                className={`w-full text-left p-4 rounded-lg border transition-all ${showFeedback
                                    ? alt.key === question.respostaCorreta
                                        ? 'bg-success-50 border-success-500 text-success-900 dark:bg-success-900/20 dark:text-success-100'
                                        : alt.key === selectedAnswer
                                            ? 'bg-red-50 border-red-500 text-red-900 dark:bg-red-900/20 dark:text-red-100'
                                            : 'border-slate-200 dark:border-slate-700 opacity-50'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                    }`}
                            >
                                <span className="font-bold mr-2">{alt.key})</span>
                                {alt.text}
                            </button>
                        ))}
                    </div>

                    {showFeedback && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Comentário do Professor IA:</h4>
                            <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">
                                {question.explicacao}
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4 w-full"
                                onClick={() => setQuestion(null)}
                            >
                                Gerar Nova Questão
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
