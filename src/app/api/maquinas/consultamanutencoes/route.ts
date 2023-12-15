import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import RegistroManutencaoProps from "@/model/RegistroManutencao"
export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get("id"))
    const maquina = await prisma.maquina.findUnique({
        where:{
            id: id
        }, include: {
            manutencoes: true,
            planoManutencao: true
        }
    })
    return NextResponse.json(maquina)
}

export async function POST(request: Request) {
    const corpo:RegistroManutencaoProps = await request.json()
    if(corpo){    
    const manutencoes = await prisma.manutencao.create({
        data:{
            tipo: corpo.tipo,
            momento: corpo.momento,
            custo: corpo.custo,
            dataRealizacao: corpo.dataRealizacao,
            descricao: corpo.descricao,
            nfManutencao: corpo.nfManutencao,
            Maquina: {
                connect: {
                    id: corpo.maquinaId
                }
            }
        }
    })
    return NextResponse.json(manutencoes, {status: 200})
}
    return new NextResponse("Erro", {status: 401})
}
export async function DELETE(request: Request) {
    const corpo:RegistroManutencaoProps = await request.json()
    if(corpo){    
    const manutencoes = await prisma.manutencao.delete({
        where:{
            maquinaId: corpo.maquinaId,
            id: corpo.id
        }
    })

    const selecao = await prisma.manutencao.findMany(
        {
            where:{
                maquinaId: corpo.maquinaId
            }
        }
    )
    return NextResponse.json(selecao, {status: 200})
}
    return new NextResponse("Erro", {status: 401})
}

export const dynamic = "force-dynamic";