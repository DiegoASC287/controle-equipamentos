import Maquina from "@/model/Maquina"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const codigo = searchParams.get("codigoobra")
    const maquinas = await prisma.maquina.findMany({where:{
        cod_obra: 'Nenhuma',
        ativa: false
    }})
    if(maquinas){
        return NextResponse.json(maquinas)
    }
    return new NextResponse("Erro", {status: 401})
}




export const dynamic = "force-dynamic";