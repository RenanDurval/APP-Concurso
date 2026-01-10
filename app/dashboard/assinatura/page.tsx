import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UpgradeButton } from '@/components/dashboard/upgrade-button'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Planos e Assinaturas | APP Concursos',
    description: 'Escolha o plano ideal para sua aprovação.',
}

export default function SubscriptionPage() {
    return (
        <div className="py-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight">Planos para sua Aprovação</h2>
                <p className="text-muted-foreground mt-2">
                    Invista no seu futuro com ferramentas avançadas de estudo.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl mx-auto">
                {/* Free Plan */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Gratuito</CardTitle>
                        <CardDescription>Para começar seus estudos</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-3xl font-bold">R$ 0<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Busca de Concursos</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Gerador de Questões (Limitado)</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Histórico Básico</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline" disabled>Plano Atual</Button>
                    </CardFooter>
                </Card>

                {/* PRO Plan */}
                <Card className="border-primary shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        RECOMENDADO
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Premium</CardTitle>
                        <CardDescription>Acelere sua aprovação</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-3xl font-bold">R$ 29,90<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Tudo do Gratuito</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> IA Ilimitada (Gemini Pro)</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Análise Profunda de Bancas</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Estatísticas Avançadas</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Prioridade no Suporte</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <UpgradeButton />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
