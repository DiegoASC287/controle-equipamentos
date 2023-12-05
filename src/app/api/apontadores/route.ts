import Maquina from "@/model/Maquina"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
export async function GET(request: NextRequest) {
    const apontadores = await prisma.apontador.findMany()
    return NextResponse.json(apontadores)
}

export async function POST(request: Request) {
    const corpo:Maquina = await request.json()
    if(corpo.origem == "Alugado"){    
    const mauqina = await prisma.maquina.create({
        data:{
            nome: corpo.nome,
            modelo: corpo.modelo,
            imagem: corpo.imagem,
            acaoNecessaria: corpo.acaoNecessaria,
            quebrada: corpo.quebrada,
            origem: corpo.origem,
            contador: corpo.contador,
            unidade: corpo.unidade,
            alimentacao: corpo.alimentacao,
            aluguelInfo: {
                create:{
                    ...corpo.aluguelInfo
                }
            }
        }
    })
    return NextResponse.json("Adicionado com sucesso!")
}
    return new NextResponse("Erro", {status: 401})
}