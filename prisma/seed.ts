import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...')

    // Criar bancas examinadoras comuns
    console.log('📝 Criando bancas examinadoras...')

    const bancas = await Promise.all([
        prisma.banca.upsert({
            where: { nome: 'CESPE/CEBRASPE' },
            update: {},
            create: {
                nome: 'CESPE/CEBRASPE',
                descricao: 'Centro de Seleção e de Promoção de Eventos da Universidade de Brasília',
                site: 'https://www.cebraspe.org.br',
                caracteristicas: JSON.stringify({
                    estilo: 'Questões longas e interpretativas',
                    peculiaridades: ['Anulação por erro', 'Textos extensos', 'Raciocínio lógico forte']
                }),
                materiasFrequentes: JSON.stringify(['Direito Constitucional', 'Direito Administrativo', 'Português', 'Raciocínio Lógico']),
                estiloQuestoes: 'Certo/Errado com desconto de pontos por erro. Questões que exigem interpretação profunda.'
            },
        }),
        prisma.banca.upsert({
            where: { nome: 'FCC' },
            update: {},
            create: {
                nome: 'FCC',
                descricao: 'Fundação Carlos Chagas',
                site: 'https://www.fcc.org.br',
                caracteristicas: JSON.stringify({
                    estilo: 'Questões objetivas diretas',
                    peculiaridades: ['Foco em legislação', 'Questões técnicas', 'Pouca interpretação']
                }),
                materiasFrequentes: JSON.stringify(['Direito', 'Contabilidade', 'Administração', 'Português']),
                estiloQuestoes: 'Múltipla escolha tradicional. Cobra literalidade da lei e conceitos técnicos.'
            },
        }),
        prisma.banca.upsert({
            where: { nome: 'FGV' },
            update: {},
            create: {
                nome: 'FGV',
                descricao: 'Fundação Getúlio Vargas',
                site: 'https://conhecimento.fgv.br',
                caracteristicas: JSON.stringify({
                    estilo: 'Questões contextualizadas',
                    peculiaridades: ['Situações práticas', 'Jurisprudência', 'Atualidades']
                }),
                materiasFrequentes: JSON.stringify(['Direito', 'Administração Pública', 'Economia', 'Português']),
                estiloQuestoes: 'Múltipla escolha com situações-problema. Exige aplicação prática do conhecimento.'
            },
        }),
        prisma.banca.upsert({
            where: { nome: 'VUNESP' },
            update: {},
            create: {
                nome: 'VUNESP',
                descricao: 'Fundação para o Vestibular da Universidade Estadual Paulista',
                site: 'https://www.vunesp.com.br',
                caracteristicas: JSON.stringify({
                    estilo: 'Questões equilibradas',
                    peculiaridades: ['Mix de decoreba e raciocínio', 'Legislação paulista', 'Português pesado']
                }),
                materiasFrequentes: JSON.stringify(['Português', 'Matemática', 'Conhecimentos Específicos', 'Legislação']),
                estiloQuestoes: 'Múltipla escolha balanceada entre teoria e prática.'
            },
        }),
        prisma.banca.upsert({
            where: { nome: 'IBFC' },
            update: {},
            create: {
                nome: 'IBFC',
                descricao: 'Instituto Brasileiro de Formação e Capacitação',
                site: 'https://www.ibfc.org.br',
                caracteristicas: JSON.stringify({
                    estilo: 'Questões diretas e objetivas',
                    peculiaridades: ['Sem pegadinhas', 'Foco em conhecimento teórico', 'Provas extensas']
                }),
                materiasFrequentes: JSON.stringify(['Conhecimentos Gerais', 'Português', 'Matemática', 'Informática']),
                estiloQuestoes: 'Múltipla escolha tradicional com ênfase em conteúdo programático.'
            },
        }),
    ])

    console.log(`✅ ${bancas.length} bancas criadas/atualizadas`)

    // Criar concursos de exemplo
    console.log('🏛️ Criando concursos de exemplo...')

    const concurso1 = await prisma.concurso.upsert({
        where: { id: 'seed-concurso-1' },
        update: {},
        create: {
            id: 'seed-concurso-1',
            nome: 'Concurso Público do Tribunal Regional Federal da 1ª Região',
            orgao: 'TRF 1',
            cargo: 'Analista Judiciário - Área Judiciária',
            descricao: 'Concurso para provimento de vagas e formação de cadastro reserva para o cargo de Analista Judiciário.',
            status: 'previsto',
            nivelEscolaridade: 'superior',
            regiaoAbrangencia: 'federal',
            numeroVagas: 15,
            salario: 13994.78,
        },
    })

    const concurso2 = await prisma.concurso.upsert({
        where: { id: 'seed-concurso-2' },
        update: {},
        create: {
            id: 'seed-concurso-2',
            nome: 'Concurso Público da Polícia Federal',
            orgao: 'Polícia Federal',
            cargo: 'Agente de Polícia Federal',
            descricao: 'Concurso nacional para o cargo de Agente de Polícia Federal.',
            status: 'aberto',
            nivelEscolaridade: 'superior',
            regiaoAbrangencia: 'federal',
            numeroVagas: 150,
            salario: 23692.78,
        },
    })

    const concurso3 = await prisma.concurso.upsert({
        where: { id: 'seed-concurso-3' },
        update: {},
        create: {
            id: 'seed-concurso-3',
            nome: 'Concurso Público do Tribunal de Contas da União',
            orgao: 'TCU',
            cargo: 'Auditor Federal de Controle Externo',
            descricao: 'Concurso para Auditor Federal de Controle Externo do TCU.',
            status: 'encerrado',
            nivelEscolaridade: 'superior',
            regiaoAbrangencia: 'federal',
            numeroVagas: 20,
            salario: 21947.82,
        },
    })

    console.log(`✅ 3 concursos de exemplo criados`)

    // Criar editais de exemplo
    console.log('📄 Criando editais de exemplo...')

    const edital1 = await prisma.edital.create({
        data: {
            concursoId: concurso2.id,
            bancaId: bancas[0].id, // CESPE
            numeroEdital: 'Edital nº 01/2025',
            dataPublicacao: new Date('2025-06-15'),
            dataInscricaoInicio: new Date('2025-07-01'),
            dataInscricaoFim: new Date('2025-08-15'),
            dataProva: new Date('2025-10-20'),
            linkEdital: 'https://exemplo.com/edital-pf-2025.pdf',
            linkInscricao: 'https://exemplo.com/inscricao',
            resumoIA: 'Concurso para 150 vagas de Agente da Polícia Federal. Inscrições de 01/07 a 15/08. Prova objetiva em 20/10. Remuneração inicial de R$ 23.692,78. Requisitos: nível superior completo em qualquer área.',
            isAtivo: true,
        },
    })

    console.log(`✅ Editais criados`)

    // Criar cronograma para o edital
    await prisma.cronograma.createMany({
        data: [
            {
                editalId: edital1.id,
                descricao: 'Abertura das inscrições',
                dataEvento: new Date('2025-07-01'),
                tipo: 'inscricao',
            },
            {
                editalId: edital1.id,
                descricao: 'Encerramento das inscrições',
                dataEvento: new Date('2025-08-15'),
                tipo: 'inscricao',
            },
            {
                editalId: edital1.id,
                descricao: 'Prova objetiva',
                dataEvento: new Date('2025-10-20'),
                tipo: 'prova',
            },
            {
                editalId: edital1.id,
                descricao: 'Divulgação do resultado preliminar',
                dataEvento: new Date('2025-11-10'),
                tipo: 'resultado',
            },
        ],
    })

    console.log(`✅ Cronogramas criados`)

    // Criar estatísticas
    await prisma.estatistica.create({
        data: {
            concursoId: concurso2.id,
            anoReferencia: 2025,
            totalInscritos: 45000,
            totalVagas: 150,
            inscritosPorVaga: 300.00,
            notaCorteObjetiva: 7.50,
            maiorNota: 9.80,
            menorNota: 5.00,
        },
    })

    console.log(`✅ Estatísticas criadas`)

    console.log('✨ Seed concluído com sucesso!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('❌ Erro durante o seed:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
