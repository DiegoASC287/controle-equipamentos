import { put } from "@vercel/blob";
import {NextResponse} from 'next/server'
import {customAlphabet} from 'nanoid'

export const runtime = 'edge'

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz", 7)

export async function POST(req:Request) {
    const file = req.body || ""


    const contentType = req.headers.get('content-type') || 'text/plain'
    const filename = `${nanoid()}.${contentType.split("/")[1]}`
    const blob = await put(filename, file, {contentType, access: 'public'})
    return NextResponse.json(blob)
}