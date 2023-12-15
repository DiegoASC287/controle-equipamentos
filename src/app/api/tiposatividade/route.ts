import prisma from '@/app/lib/prisma'
import {NextResponse} from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const {nome, unidade} = body

    try{
        const tipo = await prisma.tipoAtividade.create({
            data:{
                nome: nome,
                unidade: unidade
            }
        })
        return NextResponse.json(tipo)
    }catch(err){
        console.log(err)
    }
    
}