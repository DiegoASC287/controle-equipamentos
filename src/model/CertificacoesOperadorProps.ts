export default interface CertificacoesOperadorProps{
    id?: number
    numero_certificado?: string
    tipo_maquina?: string
    url_certificado?: string
    data_vencimento?: Date
    status?: string
    aprovado_por?: string
    updatedAt?: Date
    img: { image: string | null, }
    file: File | null
}
