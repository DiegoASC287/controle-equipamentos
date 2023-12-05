import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import ItemAssociacaoEapModel from "@/model/ItemAssociacaoEapModel"

export async function GET(request: NextRequest) {
    console.log("chegiu")
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get("id"))
    const associacao = await prisma.itemAssociacaoEap.findMany({
        where: {maquinaId:id},
        include: {tipo: true}})
    return NextResponse.json(associacao)
}

export async function DELETE(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get("id"))
    const associacao = await prisma.itemAssociacaoEap.delete({
        where: {id: id}})

    return NextResponse.json(associacao)
}

export async function POST(request: Request) {
    const associacao:ItemAssociacaoEapModel = await request.json()
        try{
            console.log(associacao)
                const associacaoAdd = await prisma.itemAssociacaoEap.create(
                    {
                        data:{
                            apelido: associacao.apelido,
                            itemEap: associacao.itemEap,
                            maquina: {
                                connect:{
                                    id: associacao.maquinaId
                                }
                            },
                            tipo: {
                                connect: {
                                    id: associacao.tipo_atividade_id
                                }
                            }
                        }
                    }
                )
                return NextResponse.json(associacaoAdd, {status: 200})
            }
       catch(e){
            return NextResponse.json({erro: e}, {status: 406})
        }
}