'use server'

import { geminiModel } from '@/lib/ai/gemini'
import prisma from '@/lib/db/prisma'
import { getSession } from '@/lib/auth/session'
import { revalidatePath } from 'next/cache'

export async function generateQuestion(topic: string, banca: string, cargo: string) {
    // MOCK MODE ACTIVATED
    // Temporarily returning static data to unblock development while API Key is resolved.

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockQuestions: Record<string, any> = {
        'Portugues': {
            enunciado: "Assinale a alternativa que apresenta erro de crase:",
            alternativas: [
                "A) Vou à praia.",
                "B) Refiro-me àquilo que você disse.",
                "C) Fui à uma festa ontem.",
                "D) À medida que o tempo passa, ficamos mais velhos.",
                "E) Saiu às pressas."
            ],
            correta: 2, // C (Fui -> a <- uma festa, crase proibida antes de uma)
            comentario: "Não ocorre crase antes de pronomes indefinidos como 'uma'. A forma correta seria 'Fui a uma festa'."
        },
        'default': {
            enunciado: `Questão simulada sobre ${topic} (${banca} - ${cargo}). Qual a afirmativa correta?`,
            alternativas: [
                "A) Esta é a alternativa A, que está incorreta.",
                "B) Esta é a alternativa B, a resposta correta para fins de teste.",
                "C) Esta é a alternativa C, apenas um distrator.",
                "D) Esta é a alternativa D, totalmente errada.",
                "E) Esta é a alternativa E, sem sentido."
            ],
            correta: 1, // B
            comentario: "Esta é uma explicação simulada. No modo real, a IA explicaria o conceito detalhadamente."
        }
    };

    const questionData = mockQuestions[topic] || mockQuestions['default'];

    try {
        const savedQuestion = await prisma.questao.create({
            data: {
                materia: topic,
                assunto: topic,
                enunciado: questionData.enunciado,
                alternativaA: questionData.alternativas[0],
                alternativaB: questionData.alternativas[1],
                alternativaC: questionData.alternativas[2],
                alternativaD: questionData.alternativas[3],
                alternativaE: questionData.alternativas[4],
                respostaCorreta: ['A', 'B', 'C', 'D', 'E'][questionData.correta],
                explicacao: questionData.comentario,
                isGeradaPorIA: true,
                dificuldade: 'media'
            }
        })

        return savedQuestion
    } catch (error) {
        console.error('Error generating mock question:', error)
        throw new Error('Falha ao gerar questão simulada')
    }
}

export async function submitAnswer(questaoId: string, respostaUsuario: string, acertou: boolean, tempoResposta: number) {
    const session = await getSession()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = session?.user as any

    if (!user?.id) return null

    try {
        await prisma.userProgress.create({
            data: {
                userId: user.id,
                questaoId,
                respostaUsuario,
                acertou,
                tempoResposta
            }
        })

        revalidatePath('/dashboard/questoes')
        return { success: true }
    } catch (error) {
        console.error('Error submitting answer:', error)
        return { success: false }
    }
}

export async function analyzeBanca(bancaName: string) {
    try {
        const prompt = `
        Faça uma análise estratégica curta e direta sobre a banca organizadora: ${bancaName}.
        Foco: Estilo de cobrança, pegadinhas comuns e foco principal.
        
        Máximo de 3 parágrafos. Use markdown para formatar.
        `

        const result = await geminiModel.generateContent(prompt)
        const response = await result.response
        return response.text()
    } catch (error) {
        console.error('Error analyzing banca:', error)
        throw new Error('Falha ao analisar banca')
    }
}
