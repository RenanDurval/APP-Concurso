export interface Concurso {
    id: string
    nome: string
    orgao: string
    cargo: string | null
    status: string // 'aberto' | 'previsto' | 'encerrado'
    numeroVagas: number | null
    salario: number | null
    nivelEscolaridade: string | null
    regiaoAbrangencia: string | null
    dataInscricaoFim: string | null // ISO String
    banca: string | null
    inscritosPorVaga: number | null
}
