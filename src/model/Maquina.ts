import AluguelInfoProps from "./AluguelInfo"
import MaquinaPesadaInterf from "./MaqPesada"
import ItemAssociacaoEapModel from "./ItemAssociacaoEapModel"
import MaquinaPlanoMan from "./MaquinaPlanoMan"
import RegistroManutencaoProps from "./RegistroManutencao"
import TipoAtividade from "./TipoAtividade"
export default interface Maquina {
    id?: number
    nome?: string
    modelo?: string
    imagem?: string | null
    acaoNecessaria?: boolean
    motivo_quebrada?: string
    emUso?: boolean
    origem?: string | undefined
    quebrada?: boolean
    dataLocacao?: Date
    alimentacao?: string
    aluguelInfo?: AluguelInfoProps
    previsaoEntrega?: Date
    manutencoes?: RegistroManutencaoProps[]
    planoManutencao?: MaquinaPlanoMan[]
    contador?: number
    contadorInicial?: number
    unidade?: string
    categoria?: string
    tipo?: string
    operadorCpf?: string
    maquina_pesada?: MaquinaPesadaInterf
    item_associacao?: ItemAssociacaoEapModel[]
    docVitalicio?:boolean
    documento?:string
    data_documento?: Date
    status_documento?: string
    cod_obra?: string
    atividades?: TipoAtividade[]
    ativa?: boolean
    data_inicio_servicos?: Date
}