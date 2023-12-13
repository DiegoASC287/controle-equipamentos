export default interface RegistroManutencaoProps{
    id?: number
    tipo: string
    descricao: string
    momento: number
    dataRealizacao: Date
    unidade?: string
    custo: number
    nfManutencao?: string
    nfFile?: File | null
    nfImg?: {image: string | null}
    maquinaId?: number
}