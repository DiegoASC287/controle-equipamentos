import CertificacoesOperadorProps from "./CertificacoesOperadorProps"

export default interface OperadorProps{
    cpf: string
    nome: string
    sobrenome: string
    idade: number
    imagem_url: string
    certificacoes?: CertificacoesOperadorProps[]
}

