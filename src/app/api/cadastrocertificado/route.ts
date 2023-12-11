import Maquina from "@/model/Maquina"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { CertificacoesOperador } from "@prisma/client"
export async function GET(request: NextRequest) {
    const apontadores = await prisma.apontador.findMany()
    return NextResponse.json(apontadores)
}

export async function POST(request: Request) {
    const corpo:CertificacoesOperador = await request.json()
    console.log(corpo)
    if(corpo){    
    const mauqina = await prisma.certificacoesOperador.create({
        data:{
            data_vencimento: corpo.data_vencimento,
            numero_certificado: corpo.numero_certificado,
            tipo_maquina: corpo.tipo_maquina,
            url_certificado: corpo.url_certificado,
            aprovado: false,
            operador: {
                connect: {
                    cpf: corpo.operadorId
                }
            }
        }
    })
    return NextResponse.json({msg: "Adicionado com sucesso!"})
}
    return NextResponse.json({msg: "Erro"})
}