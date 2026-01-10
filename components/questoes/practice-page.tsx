'use client'

import { useState } from 'react'
import { QuestionGenerator } from '@/components/ai/question-generator'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PracticePageProps {
    bancas: { id: string; nome: string }[]
}

export function PracticePage({ bancas }: PracticePageProps) {
    const [config, setConfig] = useState<{ banca: string; cargo: string } | null>(null)
    const [selectedBanca, setSelectedBanca] = useState<string>('')
    const [selectedCargo, setSelectedCargo] = useState<string>('Analista') // Default

    const handleStart = () => {
        if (!selectedBanca) return
        setConfig({
            banca: selectedBanca,
            cargo: selectedCargo
        })
    }

    if (!config) {
        return (
            <div className="max-w-md mx-auto mt-10">
                <Card className="p-6 space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Configurar Sessão de Estudo</h2>
                        <p className="text-slate-500">Escolha o foco do seu treino</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Banca Examinadora</Label>
                            <Select value={selectedBanca} onValueChange={setSelectedBanca}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a banca" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bancas.map((banca) => (
                                        <SelectItem key={banca.id} value={banca.nome}>
                                            {banca.nome}
                                        </SelectItem>
                                    ))}
                                    <SelectItem value="Outra">Outra / Genérica</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Cargo / Nível</Label>
                            <Select value={selectedCargo} onValueChange={setSelectedCargo}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o nível" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Ensino Médio">Ensino Médio (Técnico)</SelectItem>
                                    <SelectItem value="Analista">Ensino Superior (Analista)</SelectItem>
                                    <SelectItem value="Auditor">Auditor / Fiscal</SelectItem>
                                    <SelectItem value="Magistratura">Carreiras Jurídicas</SelectItem>
                                    <SelectItem value="Policial">Carreiras Policiais</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleStart}
                            disabled={!selectedBanca}
                        >
                            Iniciar Prática
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded">
                            {config.banca}
                        </span>
                        <span className="text-slate-500 text-sm">
                            {config.cargo}
                        </span>
                    </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setConfig(null)} className="mt-2 sm:mt-0">
                    Alterar Configuração
                </Button>
            </div>

            <QuestionGenerator
                banca={config.banca}
                cargo={config.cargo}
                saveProgress={true}
            />
        </div>
    )
}
