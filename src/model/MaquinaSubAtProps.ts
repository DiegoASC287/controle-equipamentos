import OperadorProps from "./OperadorProps"

export default interface MaquinaSubAtProps {
    maquinaId?: number
    contador?: number
    nome?: string
    categoria?: string
    tipo?: string
    unidade?: string
    alimentacao?: string
    modelo?: string
    operador?: OperadorProps
}