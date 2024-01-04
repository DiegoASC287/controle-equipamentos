'use client'
import { useEffect, useState } from "react";
import InputManutencao from "./InputManutencao";
import Calendario from "./Calendario";
import AluguelInfoProps from "@/model/AluguelInfo";


interface AddAlugadoProps{
    value?: AluguelInfoProps
    onChange: (novoValor: AluguelInfoProps) => void
    unidade: string
}
export default function AddAlugado(props: AddAlugadoProps){

    const [dataLocacao, setDLocacao] = useState<Date>(new Date())
    const [previsaoEntrega, setPEntrega] = useState<Date>(new Date())
    const [fornecedor, setFornecedor] = useState<string>("")
    const [limite, setLimite] = useState<number>(0)

    useEffect(() => {
        props.onChange({fornecedor: fornecedor, data_locacao: dataLocacao, limite: limite, previsao_entrega: previsaoEntrega})
    }, [dataLocacao, previsaoEntrega, fornecedor, limite])
    return (
    <div>
        <div className="flex w-full flex-col sm:flex-row gap-2 ">
        <div className="mt-2 w-full">
                <div className="min-w-max px-2 py-1 bg-gray-400 flex justify-center">Informações sobre a locação</div>
                <div className="bg-gray-300 flex flex-col justify-around min-w-max">
                    <Calendario id="dataLoc" legenda="Data e hora de locação" onChange={setDLocacao} value={dataLocacao}/>
                </div>
                <div className="bg-gray-300 flex flex-col justify-around min-w-max pt-2">
                    <Calendario id="dataLoc" legenda="Data e hora entrega" onChange={setPEntrega} value={previsaoEntrega}/>
                </div>
                <div className="bg-gray-300 flex flex-col justify-around min-w-max pt-1">
                <InputManutencao type="text" texto="Fornecedor" onChange={setFornecedor} value={fornecedor}/>
                </div>
                <div className="bg-gray-300 flex flex-col justify-around min-w-max pt-1">
                <InputManutencao type="number" texto={`Limite de ${props.unidade === 'h' ? "horas": "quilômetros"}`} onChange={setLimite} value={limite}/>
                </div>
            </div>
        </div>
        </div>
    )
}