import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const tipo_veiculo = searchParams.get("tipo_veiculo")
    const unidade = searchParams.get('unidade')
    const maquina = await prisma.templatePlanoManutencoes.findMany({
        where:{
            tipo_veiculo: tipo_veiculo? tipo_veiculo : "",
            unidade: unidade ? unidade : ""
        }
    })
    return NextResponse.json(maquina)
}

export async function POST(request: Request) {
    const data = await request.json()
    if(data){   
        try{
            const mauqina = await prisma.templatePlanoManutencoes.createMany({
                data})
            
            
            return NextResponse.json("Adicionado com sucesso!")
        } catch(e){
            return NextResponse.json({erro: e}, {status: 406})
        }
}else {
    return NextResponse.json({er: "Atividade vazia"}, {status: 406})
}
}