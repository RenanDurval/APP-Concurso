export * from './cn'

export function formatCurrency(value: number | null | undefined): string {
    if (value === null || value === undefined) return 'Não informado'

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'Data não informada'

    const d = typeof date === 'string' ? new Date(date) : date

    return new Intl.DateTimeFormat('pt-BR').format(d)
}
