import Maquina from "@/model/Maquina"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import TipoAtividade from "@/model/TipoAtividade"

export async function GET(request: NextRequest) {
    
    const tipo = await prisma.tipoAtividade.findMany()
    return NextResponse.json(tipo)
}

export const dynamic = "force-dynamic";