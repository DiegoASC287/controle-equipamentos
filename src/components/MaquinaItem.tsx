'use client'
import Maquina from "@/model/Maquina"
import { IconAlertTriangleFilled, IconCheck, IconRotateClockwise2 } from "@tabler/icons-react";
import Image from "next/image"
import Link from "next/link";
import MostradorUnidade from "./MostradorUnidade";
interface MaquinaProps{
    maquina: Maquina
}
export default function MaquinaItem(props: MaquinaProps){
    const {maquina} = props
    return (
        
        <Link href={{
            pathname: `/inicio/maquinas/maquina/${maquina.id}`}} >
     
        <div className={`
        flex flex-col border rounded-lg p-1
        border-zinc-200 
        bg-zinc-100
        items-center
        h-[320px]
        w-[220px]
        hover:border-3 hover:border-black
        `}>
            <div className="relative">
            <Image src={maquina.imagem || "/"} width={250} height={250} alt="Imagem"/>
            <MostradorUnidade valor={`${maquina.contador}`} unidade={maquina.unidade}/>
            </div>
            <div className="bg-gray-300 w-full flex justify-center">{maquina.origem}</div>
            <div className="flex pt-2 px-2 h-full w-full justify-between">
                <div className="font-bold text-left">{maquina.nome}</div>
                <div className={`flex px-1 justify-end items-end h-full ${maquina.quebrada ? "text-red-500" :
                 "text-orange-400"} text-sm flex-col`}>
                {(maquina.emUso && !maquina.quebrada)? <IconRotateClockwise2 color="green"/> : <IconRotateClockwise2 color="lightgray"/>}
                {maquina.acaoNecessaria || maquina.quebrada? <IconAlertTriangleFilled/> : <IconCheck color="green"/>}
                </div>
            </div>

        </div>
        </Link>
    )
}