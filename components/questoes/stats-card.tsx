import { Card } from "@/components/ui/card"

interface StatsCardProps {
    total: number
    correct: number
}

export function StatsCard({ total, correct }: StatsCardProps) {
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800">
                <span className="text-3xl font-bold text-slate-700 dark:text-slate-200">{total}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Questões</span>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">{correct}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Acertos</span>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800">
                <span className={`text-3xl font-bold ${accuracy >= 70 ? 'text-blue-600' : 'text-orange-500'}`}>
                    {accuracy}%
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Precisão</span>
            </Card>
        </div>
    )
}
