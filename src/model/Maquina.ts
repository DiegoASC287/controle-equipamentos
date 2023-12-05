import AluguelInfoProps from "./AluguelInfo"
import CaminhaoInterf from "./Caminhao"
import ItemAssociacaoEapModel from "./ItemAssociacaoEapModel"
import MaquinaPlanoMan from "./MaquinaPlanoMan"
import RegistroManutencaoProps from "./RegistroManutencao"
export default interface Maquina {
    id?: number
    nome?: string
    modelo?: string
    imagem?: string
    acaoNecessaria?: boolean
    motivo_quebrada?: string
    emUso?: boolean
    origem: string
    quebrada?: boolean
    dataLocacao?: Date
    alimentacao?: string
    aluguelInfo?: AluguelInfoProps
    previsaoEntrega?: Date
    manutencoes: RegistroManutencaoProps[]
    planoManutencao?: MaquinaPlanoMan[]
    contador: number
    contadorInicial: number
    unidade?: string
    categoria?: string
    tipo?: string
    caminhao?: CaminhaoInterf
    item_associacao?: ItemAssociacaoEapModel[]
}