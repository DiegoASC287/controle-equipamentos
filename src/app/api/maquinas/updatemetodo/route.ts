import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import Maquina from "@/model/Maquina"


export async function POST(request: Request){
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    const corpo:Maquina = await request.json()
    try{
        console.log(corpo)

        const maquinaSub = await prisma.maquinaPesada.update({
            where:{
                maquinaId: corpo.id
            }, data:{
                operador: {
                    connect: {
                        cpf: corpo.maquina_pesada?.operador?.cpf
                    }
                }
            }, select:{
                operador: true
            }
        })
        console.log(maquinaSub)
        return NextResponse.json(maquinaSub, {status: 200})
    } catch(err) {
        return NextResponse.json(err, {status: 406})
    }

}