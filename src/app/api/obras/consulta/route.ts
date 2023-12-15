import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET(req: NextRequest) {
    const obras = await prisma.obra.findMany()

    return NextResponse.json(obras)
    }

export const dynamic = "force-dynamic";

