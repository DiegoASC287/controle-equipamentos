'use server'
import bcrypt from 'bcrypt'
import prisma from "@/app/lib/prisma"

export const signUp = async (email: string, password: string, name:string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(user){
        return 'Já existe um usuário com esse email'
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    await prisma.user.create({
        data: {
            email,
            hashedPassword: passwordHash,
            name
        }
    });
    return 'Usuário criado com sucesso!'
}