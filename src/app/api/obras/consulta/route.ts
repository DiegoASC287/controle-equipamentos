import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const codigo = searchParams.get("t")

    const obras = await prisma.obra.findMany()

    return NextResponse.json(obras)
    }

