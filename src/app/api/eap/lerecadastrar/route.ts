import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import ModeloItemEAP from "@/model/ModeloItemEAP"

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const codigo = searchParams.get("codigo")
    const id = Number(searchParams.get("id"))
    console.log(codigo)
    const atividade = await prisma.itemEap.findMany({
        where: {
            cod_obra: codigo?codigo:""
        }
    })
    return NextResponse.json(atividade)
}

export async function POST(request: Request) {
    const item_eap:ModeloItemEAP[] = await request.json()
    const convert = item_eap.map(e => {
        return {
            codigo: e.codigo,
            cod_obra: e.cod_obra,
            descricao: e.descricao,
            indice: e.indice,
            item: e.item,
            preco_unitario: e.preco_unitario,
            unidade: e.unidade            
        }
    }) 
    if(convert){   
        try{
            const item_eap_add = await prisma.itemEap.createMany({
                data: convert})
            return NextResponse.json("Adicionado com sucesso!")
        } catch (err){
            console.log(err)
            return new NextResponse("Erro", {status: 406})
        }
}else {
    console.log("Atividade vzia")
    return NextResponse.json({er: "Atividade vazia"}, {status: 406})
}
}

export const dynamic = "force-dynamic";