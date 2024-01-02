import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function POST(request: Request) {
        try{
            const mauqina = await prisma.user.update({
                where: {
                    id: 'clq70czsf0000j4xbadq1t8sa'
                },
                data:{
                    papel: 'Assistente de planejamento'
                }
                
            })
            
            
            return NextResponse.json("Adicionado com sucesso!")
        } catch (err){
            return NextResponse.json({err: err}, {status: 401})
        }
}

export const dynamic = "force-dynamic";