'use server'
import bcrypt from 'bcrypt'
import prisma from "@/app/lib/prisma"
interface mensagemProps{
    status: "ok" | "erro" | "carregando" | "pronto"
    msg: string
  }

export const signUp = async (email: string, password: string, name:string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(user){
        return {status: 'erro', msg: "Já existe um usuário com esse email!"} as mensagemProps
    }

    if(email.split("@")[1] !== "aahbrant.com"){
        return {status: 'erro', msg: "O email deve ser do domínio @aahbrant.com"} as mensagemProps
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    await prisma.user.create({
        data: {
            email,
            hashedPassword: passwordHash,
            name
        }
    });
    return {status: 'ok', msg: "Usuário criado com sucesso!"} as mensagemProps
}