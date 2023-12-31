import { Mode } from "fs"
import Apontador from "./Apontador"
import FormatoInterferencia from "./FormatoInterferencia"
import ModeloItemEap from "./ModeloItemEAP"
import OperadorProps from "./OperadorProps"
export default interface LinhaTabPartDiaria{
    idMaquina: number
    descricao_serv?: string
    data_inicial_trabalho: Date
    data_final_trabalho: Date
    dataInicialInterf: Date
    dataFinalInterf: Date
    motivoInterf?: string
    operador?: string
    registroNovo: boolean
    interferencias: FormatoInterferencia[]
    horimetro_inicial?: number
    horimetro_final?: number
    apontadorId: number
    apontador?: Apontador
    eap?: any
    eapId?: string
    cod_obra?: string
    observacoes?: string
}