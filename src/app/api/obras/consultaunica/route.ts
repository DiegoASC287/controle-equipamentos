import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET(request: NextRequest) {

    const {searchParams} = new URL(request.url)
    const codigo = searchParams.get("codigo")
    if(codigo){
        try{
            const obra = await prisma.obra.findUnique({where:{
                codigo: codigo
            }})
            return NextResponse.json(obra)
        } catch (e){
            console.log(e)
            return NextResponse.json({err: "erro"})
        }
    }
    
    }

