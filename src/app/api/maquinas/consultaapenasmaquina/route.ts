import Maquina from "@/model/Maquina"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get("id"))
    const maquina = await prisma.maquina.findUnique({
        where:{
            id: id
        }, include: {
            maquina_pesada: {
                include: {
                    operador: true,
                }
            },
            aluguelInfo: true
        }
    })
    return NextResponse.json(maquina)
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
            contador: corpo.contadorInicial,
            contadorInicial: corpo.contadorInicial,
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

export const dynamic = "force-dynamic";