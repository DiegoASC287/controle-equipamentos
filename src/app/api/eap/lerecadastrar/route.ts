import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import ModeloItemEAP from "@/model/ModeloItemEAP"

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get("id"))
    const atividade = await prisma.itemEap.findMany()
    return NextResponse.json(atividade)
}

export async function POST(request: Request) {
    const item_eap:ModeloItemEAP = await request.json()
    if(item_eap){   
        try{
            console.log(item_eap.descricao)
            const item_eap_add = await prisma.itemEap.create({
                data:{
                    codigo: item_eap.codigo,
                    descricao: item_eap.descricao,
                    indice: item_eap.indice,
                    item: item_eap.item,
                    preco_unitario: item_eap.preco_unitario,
                    unidade: item_eap.unidade, 
        }})
            return NextResponse.json("Adicionado com sucesso!")
        } catch{
            return new NextResponse("Erro", {status: 406})
        }
}else {
    console.log("Atividade vzia")
    return NextResponse.json({er: "Atividade vazia"}, {status: 406})
}
}