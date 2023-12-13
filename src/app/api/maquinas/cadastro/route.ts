import Maquina from "@/model/Maquina"
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function POST(request: Request) {
    const corpo:Maquina = await request.json()

    if(corpo){   
        try{
            const mauqina = await prisma.maquina.create({
                data:{
                    nome: corpo.nome,
                    modelo: corpo.modelo,
                    imagem: corpo.imagem,
                    acaoNecessaria: corpo.acaoNecessaria,
                    quebrada: corpo.quebrada,
                    origem: corpo.origem,
                    contadorInicial: corpo.contadorInicial,
                    contador: corpo.contador,
                    unidade: corpo.unidade,
                    alimentacao: corpo.alimentacao,
                    categoria: corpo.categoria,
                    cod_obra: corpo.cod_obra,
                    aluguelInfo: {
                        create:{
                            ...corpo.aluguelInfo
                        },
                    },
                    planoManutencao: {
                        create: corpo.planoManutencao
                    },
                    maquina_pesada: {
                        create: corpo.maquina_pesada ? {
                            foto_documento: corpo.maquina_pesada?.foto_documento,
                            identificador: corpo.maquina_pesada?.identificador?.toString(),
                            dimensao_trabalho: corpo.maquina_pesada?.dimensao_trabalho,
                            data_vencimento_documento: corpo.maquina_pesada?.data_vencimento_documento,
                            operador: {
                                connect: {
                                    cpf: corpo.maquina_pesada.operador?.cpf
                                }
                            }
                        } : undefined
                    },tipo: corpo.tipo
                }
            })

            return NextResponse.json(mauqina)
        } catch (err){
            
            return NextResponse.json({err: err}, {status: 401})
        }
}
}

