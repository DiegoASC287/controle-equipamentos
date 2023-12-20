import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function POST(request: Request) {
    const dados: {idMaquina: number, ativa: boolean, cod_obra: string} = await request.json()
        try{
            if(dados.ativa){
                
                const maquina = await prisma.maquina.update({
                    where: {
                        id: dados.idMaquina
                    },
                    data:{
                        ativa: dados.ativa,
                        data_inicio_servicos: new Date(),
                        cod_obra: dados.cod_obra
                    }
                })
            }

            if(!dados.ativa){

                const maquina = await prisma.maquina.update({
                    where: {
                        id: dados.idMaquina
                    },
                    data:{
                        ativa: dados.ativa,
                        cod_obra: 'Nenhuma'
                    }
                })
                const historico = await prisma.historicoMaquina.create({
                    data: {
                        cod_obra: dados.cod_obra,
                        data_final: new Date(),
                        maquina: {
                            connect: {
                                id: dados.idMaquina,
                            }
                        }
                    }
                })
            }
            return NextResponse.json({...dados, msg: dados.ativa ? "Máquina desarquivada com sucesso!" : "Máquina arquivada com sucesso!"}, {status: 200})
        } catch (err){
            return NextResponse.json({err: err}, {status: 401})
        }
}

export const dynamic = "force-dynamic";