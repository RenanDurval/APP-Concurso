import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import prisma from '@/lib/db/prisma'
import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validar dados
        const validation = registerSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.errors[0].message },
                { status: 400 }
            )
        }

        const { name, email, password } = validation.data

        // Verificar se usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email já cadastrado' },
                { status: 400 }
            )
        }

        // Hash da senha
        const hashedPassword = await hash(password, 10)

        // Criar usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isPremium: false,
            },
            select: {
                id: true,
                name: true,
                email: true,
                isPremium: true,
                createdAt: true,
            },
        })

        return NextResponse.json(
            {
                message: 'Usuário criado com sucesso',
                user,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Erro ao criar usuário:', error)
        return NextResponse.json(
            { error: 'Erro ao criar usuário. Tente novamente.' },
            { status: 500 }
        )
    }
}
