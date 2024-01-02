import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import { Log } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/authOptions"

export async function POST(request: Request) {
    const {descricao}: Log = await request.json()
    const session = await getServerSession(authOptions)
        try {
            const log = await prisma.log.create({
                data: {
                    email: session?.user?.email ? session.user.email : "",
                    descricao,
                }
            })

            return NextResponse.json(log)
        } catch (err) {

            return NextResponse.json({ err: err }, { status: 401 })
        }
    }


export const dynamic = "force-dynamic";