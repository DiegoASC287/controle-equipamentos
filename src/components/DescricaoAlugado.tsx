'use client'
import { useEffect, useState } from "react";
import Celula from "./Celula";
import Maquina from "@/model/Maquina";
import CelulaAluguelInfo from "./CelulaAluguelInfo";
import Link from 'next/link'
import link from "@/app/pathspers";
interface DescricaoAlugadoProps{
    id: number | undefined
}

export default function DescricaoAlugado(props: DescricaoAlugadoProps){
    const [maquina, setMaquina] = useState<Maquina>()
    const [carregando, setCarregando] = useState<boolean>(true)
    useEffect(()=> {
        fetch(`${link}/api/maquinas/consulta?id=${props.id}`, 
        {
            cache:'no-store'
        })
        .then(item => item.json()).then(maq => {
            setMaquina(maq)
            setCarregando(false)
        })
    }, [])

    const formato = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    return (
        maquina?.origem === "Alugado" ? (
            <>
        
        <div className="flex flex-col flex-grow mx-2">
            <div className="bg-zinc-300 py-1 text-center">Informações sobre o aluguel</div>
        <CelulaAluguelInfo titulo="Equipamento" texto={carregando? 
        <div className="text-sm text-zinc-400">Carregando ...</div> : maquina?.nome} />
        <CelulaAluguelInfo titulo="Modelo" texto={carregando? 
        <div className="text-sm text-zinc-400">Carregando ...</div> : maquina?.modelo} />
        <CelulaAluguelInfo titulo="Data de locação" texto={carregando? 
        <div className="text-sm text-zinc-400">Carregando ...</div> : `${formato.format(new Date(`${maquina?.aluguelInfo?.data_locacao}`))}`} />
        <CelulaAluguelInfo titulo="Previsão de entrega" texto={carregando? 
        <div className="text-sm text-zinc-400">Carregando ...</div> : `${formato.format(new Date(maquina?.aluguelInfo?.previsao_entrega ?
            maquina?.aluguelInfo.previsao_entrega : ""))}`} />
        <CelulaAluguelInfo titulo="Fornecedor" texto={carregando? 
        <div className="text-sm text-zinc-400">Carregando ...</div> : maquina?.aluguelInfo?.fornecedor} />
        <CelulaAluguelInfo titulo={`Limite de ${maquina.unidade === "h" ? "horas" : "quilômetros"}`}  texto={carregando? 
        <div className="text-sm text-zinc-400">Carregando ...</div> 
        : `${maquina?.contador && maquina?.contadorInicial? (maquina?.contador-maquina?.contadorInicial):0}/${maquina?.aluguelInfo?.limite}`} />
        
        </div>
        </>
        ): (<div>Próprio</div>)
        
    )
}