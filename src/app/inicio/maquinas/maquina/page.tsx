'use client'
import DescricaoAlugado from "@/components/DescricaoAlugado";
import TabelaManutencoes from "@/components/TabelaManutencoes";
import MaquinaFoto from "@/components/MaquinaFoto";
import BotaoPartDiaria from "@/components/BotaoPartDiaria";
import link from "@/app/pathspers";
import { useSearchParams } from "next/navigation";
import {useEffect} from 'react'


interface PageDetailProps{
    params: {id:string}
}

async function getData(id: string) {
    const testURL = `${link}/api/maquinas/consulta?id=${id}` 
    const data = await fetch(testURL, {cache: 'no-store'})
    const maquina = await data.json()
    return maquina
}

export default async function PaginaMostrarMaquina(){
    const search = useSearchParams()
    const id = search.get("id")
    if (id){
        const maquina = await getData(id)
    }
    

    
        
    return (
        <div className="bg-zinc-50 h-screen w-full ">
            <div className="flex flex-row p-3 pb-3 border-b-2 border-zinc-400 w-full"> 
                <MaquinaFoto id={id ? id : "999"}/>
                <div className="flex">
                    <DescricaoAlugado id={Number(id)}/>
                </div>

                </div>
                    <TabelaManutencoes id={id? id : "999"}/>
                    
                <div>
                </div>
                <BotaoPartDiaria id={id? id:"999"}/>
        </div>
    )
}