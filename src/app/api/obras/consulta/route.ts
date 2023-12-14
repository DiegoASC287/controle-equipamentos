import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET(req: Request) {
    const obras = await prisma.obra.findMany()

    return NextResponse.json(obras)
    }

