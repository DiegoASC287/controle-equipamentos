import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import OperadorProps from "@/model/OperadorProps"
export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const cpf = searchParams.get("cpf")
    if (cpf){
        const operador = await prisma.operador.findUnique({
            where:{
                cpf: cpf
            }
        })
        return NextResponse.json(operador)
    }
}

export async function POST(request: Request) {
    const corpo:OperadorProps = await request.json()
    if(corpo){    
    const operador = await prisma.operador.create({
        data:{
            nome: corpo.nome,
            cpf: corpo.cpf,
            idade: corpo.idade,
            imagem_url: corpo.imagem_url,
            sobrenome: corpo.sobrenome,
        }
    })
    return NextResponse.json({msg: "Adicionado com sucesso!"})
}
    return NextResponse.json({msg: "Erro"})
}