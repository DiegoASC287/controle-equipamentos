import { TipoAtividade } from "@prisma/client"
import LinhaTabPartDiaria from "./LinhaTabPartDiaria"

export default interface ItemEAP{
    id: number
    itemEap: string
    maquinaId: number
    apelido: string
    tipo: TipoAtividade
    indice: number
    tipo_atividade_id: number
}

