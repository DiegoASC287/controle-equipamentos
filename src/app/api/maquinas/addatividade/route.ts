import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import LinhaTabPartDiaria from "@/model/LinhaTabPartDiaria"

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get("id"))
    const codigoobra = searchParams.get("codigoobra")
    const atividade = await prisma.atividade.findMany({
        where:{
            maquinaId: id

        },include:{
            interferencias: true,
            apontador: true,
            eap: true
        }
    })
    return NextResponse.json(atividade)
}

export async function POST(request: Request) {
    const atividade:LinhaTabPartDiaria = await request.json()
    if(atividade){   
        try{
            console.log(atividade)
            const atividadeAdd = await prisma.atividade.create({
                data:{
                    data_final_trabalho: atividade.data_final_trabalho,
                    data_inicial_trabalho: atividade.data_inicial_trabalho,
                    descricao_serv: atividade.descricao_serv,
                    horimetro_inicial: atividade.horimetro_inicial,
                    horimetro_final: atividade.horimetroFinal,
                    operador: atividade.operador,
                    cod_obra: atividade.cod_obra?.toString(),
                    maquina: {
                        connect: {
                            id: atividade.idMaquina
                    }
                }, interferencias:{
                    create: atividade.interferencias
                },apontador: {
                    connect: {id: atividade.apontadorId}
                }, eap: {
                    connect: {
                        item: atividade.eapId
                    }
                }
                
        },include: {
            interferencias: true,
            apontador: true
        }
    })
            
            
            return NextResponse.json({msg: "Adicionado com sucesso", atividade: atividadeAdd}, {status: 200})
        } catch(e){
            return NextResponse.json({erro: e}, {status: 406})
        }
}else {
    return NextResponse.json({er: "Atividade vazia"}, {status: 406})
}
}

export const dynamic = "force-dynamic";