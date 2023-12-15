import Maquina from "@/model/Maquina"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get("id"))
    const maquina = await prisma.maquina.findUnique({
        where:{
            id: id
        }, include:{
            manutencoes: true,
            planoManutencao: true
        }
    })
    return NextResponse.json(maquina)
}

export const dynamic = "force-dynamic";