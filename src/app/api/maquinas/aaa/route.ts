import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function POST(request: Request) {
        try{
            const mauqina = await prisma.user.update({
                where: {
                    id: 'clq71dhg20000z4x6b20h76qs'
                },
                data:{
                    papel: 'Criador'
                }
                
            })
            
            
            return NextResponse.json("Adicionado com sucesso!")
        } catch (err){
            return NextResponse.json({err: err}, {status: 401})
        }
}

export const dynamic = "force-dynamic";