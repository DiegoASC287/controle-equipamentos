import { put, del } from "@vercel/blob";
import {NextResponse} from 'next/server'
import {customAlphabet} from 'nanoid'
import RegistroManutencaoProps from "@/model/RegistroManutencao";

export const runtime = 'edge'

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz", 7)

export async function POST(req:Request) {
    const file = req.body || ""


    const contentType = req.headers.get('content-type') || 'text/plain'
    const filename = `${nanoid()}.${contentType.split("/")[1]}`
    const blob = await put(filename, file, {contentType, access: 'public'})
    return NextResponse.json(blob)
}
export async function DELETE(req:Request) {
    const corpo:RegistroManutencaoProps = await req.json()
    if(corpo?.nfManutencao){
        await del(corpo.nfManutencao)
        return NextResponse.json({msg: "Deletado com sucesso!"})
    }else{
        return NextResponse.json({msg: "Erro"})
    }
}

export const dynamic = "force-dynamic";