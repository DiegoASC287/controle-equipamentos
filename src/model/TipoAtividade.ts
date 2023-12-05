import ItemAssociacaoEapModel from "./ItemAssociacaoEapModel"

export default interface TipoAtividade{
    id?: number
    nome?: string
    unidade?: string
    items_associacao?: ItemAssociacaoEapModel[]
}