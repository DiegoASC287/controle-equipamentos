import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function POST(request: Request) {
    const dados: {idMaquina: number, contador: number} = await request.json()
        try{
            const mauqina = await prisma.maquina.update({
                where: {
                    id: dados.idMaquina
                },
                data:{
                    contador: dados.contador
                }
                
            })
            
            
            return NextResponse.json("Adicionado com sucesso!")
        } catch (err){
            return NextResponse.json({err: err}, {status: 401})
        }
}
