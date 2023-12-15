import Maquina from "@/model/Maquina"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { Apontador } from "@prisma/client"
export async function GET(request: NextRequest) {
    const apontadores = await prisma.apontador.findMany()
    return NextResponse.json(apontadores)
}

export async function POST(request: Request) {
    const corpo:Apontador = await request.json()
    try{    
    const mauqina = await prisma.apontador.create({
        data:{
            nome: corpo.nome,
            idade: corpo.idade
        }
    })
    return NextResponse.json("Adicionado com sucesso!")
} catch (e){
    console.log(e)
    return new NextResponse("Erro", {status: 401})
}
}