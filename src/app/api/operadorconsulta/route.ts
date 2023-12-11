import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const tipo = searchParams.get("tipo")
        const operador = await prisma.operador.findMany({where:{cpf: {contains: ""}}, include: {certificacoes:true}})
        
        return NextResponse.json(operador)
    }

