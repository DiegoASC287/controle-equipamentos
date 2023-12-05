import Maquina from "@/model/Maquina"
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function POST(request: Request) {
    const corpo:Maquina = await request.json()

    if(corpo.origem == "Alugado"){   
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
                    aluguelInfo: {
                        create:{
                            ...corpo.aluguelInfo
                        },
                    },planoManutencao: {
                        create: corpo.planoManutencao
                    },
                    caminhao: {
                        create: corpo.caminhao ? {
                            alimentacao: corpo.caminhao?.alimentacao,
                            foto_documento: corpo.caminhao?.foto_documento,
                            foto_habilitacao: corpo.caminhao?.foto_habilitacao,
                            placa: corpo.caminhao?.placa,
                            volume_cacamba: corpo.caminhao?.volume_cacamba,
                        } : undefined
                    },tipo: corpo.tipo,
                    
                }
                
            })
            
            
            return NextResponse.json(mauqina)
        } catch (err){
            return NextResponse.json({err: err}, {status: 401})
        }
}
}