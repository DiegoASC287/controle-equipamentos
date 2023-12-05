import LinhaTabPartDiaria from "./LinhaTabPartDiaria"

export default interface ItemEAP{
    item: string
    codigo: string
    descricao: string
    unidade: string
    indice: number
    preco_unitario: number
    atividades: LinhaTabPartDiaria[]
}

