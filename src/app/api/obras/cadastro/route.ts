import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import Obra from "@/model/Obra"

export async function POST(request: Request) {
    const corpo:Obra = await request.json()

        try{
            const obra = await prisma.obra.create({
                data:{
                    codigo: corpo.codigo,
                    imagem_url: corpo.imagem_url,
                    nome: corpo.nome
                }
            })

            return NextResponse.json(obra)
        } catch (err){
            
            return NextResponse.json({err: err}, {status: 401})
        }
}
export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const codigo = searchParams.get("codigo")
    const obra = await prisma.obra.findUnique({where:{codigo: codigo ? codigo : "" }})
    
    return NextResponse.json(obra)
    }

