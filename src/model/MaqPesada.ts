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
        artUrl?: string
        fileART?: File | null
        imgART?: {image: string | null }
        planoManUrl?: string
        filePlanoMan?: File | null
        imgPlanoMan?: {image: string | null }
}

