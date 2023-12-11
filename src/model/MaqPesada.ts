import OperadorProps from "./OperadorProps"

export default interface MaquinaPesadaInterf{
        id?: number
        operador?: OperadorProps | null
        operadorCpf?: string
        dimensao_trabalho?: number
        identificador?: string
        foto_habilitacao?: string
        data_vencimento_habilitacao?: Date
        foto_documento?: string
        data_vencimento_documento?: Date
}

