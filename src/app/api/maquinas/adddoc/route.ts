import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function POST(request: Request){
    const corpo:{
        maquinaId: number, 
        urlDocumento: string, 
        data_documento: Date, 
        artUrl: string, 
        planoManUrl: string
        docVitalicio: boolean} = await request.json()
    try{

        const maquinaSub = await prisma.maquina.update({
            where:{
                id: corpo.maquinaId
            }, data:{
                documento: corpo.urlDocumento,
                data_documento: corpo.data_documento,
                docVitalicio: corpo.docVitalicio
             }
        })
        const maquinaPesada = await prisma.maquinaPesada.update({
            where:{
                maquinaId: corpo.maquinaId
            }, data:{
                planoManUrl: corpo.planoManUrl,
                artUrl: corpo.artUrl
            }
        })
        return NextResponse.json({...maquinaSub, data_documento: corpo.data_documento, maquina_pesada: {...maquinaPesada}}, {status: 200})
    } catch(err) {
        return NextResponse.json(err, {status: 406})
    }

}