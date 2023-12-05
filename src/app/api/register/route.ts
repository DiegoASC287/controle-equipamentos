import bcrypt from 'bcrypt'
import prisma from '@/app/lib/prisma'
import {NextResponse} from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const {name: name, email:email, password: password} = body?.data


    if (!name || !email || !password){
        return NextResponse.json({msg: "Falta preencher algum campo obrigatório!"}, {status: 400})
    }
    try{
        const exist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (exist){
            return NextResponse.json({msg:"Usuário já cadastrado!"}, {status: 400})
        }
        const hashedPassword = await bcrypt.hashSync(password, 10)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        })
        return NextResponse.json({msg:"Criado com sucesso!"}, {status: 200})
    }catch(err){
        console.log(err)
    }
    
}