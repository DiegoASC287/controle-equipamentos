import { del } from "@vercel/blob";
import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'

export const runtime = 'edge'

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz", 7)


export async function DELETE(req: Request) {
    const corpo: { linkDoc: string[] } = await req.json()
    if (corpo) {
        await del(corpo.linkDoc)
        return NextResponse.json({ msg: "Deletado com sucesso!" })
    } else {
        return NextResponse.json({ msg: "Erro" })
    }
}

export const dynamic = "force-dynamic";