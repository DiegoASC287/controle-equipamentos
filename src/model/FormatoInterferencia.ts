export default interface FormatoInterferencia {
    id?: string
    hora_inicial: Date
    hora_final: Date
    motivo: string
    total_combustivel?: Number
    preco_combustivel?: Number
    contador?: Number
}