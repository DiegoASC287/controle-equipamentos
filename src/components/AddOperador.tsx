'use client'
import {  IconPlus, } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddOperador(){
    const router = useRouter()
    return (
        <button onClick={e => router.push(`/inicio/operador/cadastrooperador`)}
         className={`
        flex flex-col border rounded-lg p-1
        border-zinc-200
        bg-zinc-100
        items-center
        h-[250px]
        w-[220px]
        hover:border-3 hover:border-black
        `}>
            <div className="relative flex flex-col h-full w-full justify-center items-center overflow-hidden">
                <Image className="  absolute opacity-40 z-0" src="/imgs/Operador.jpg" alt="add" height={250} width={220}/>
                <IconPlus className="z-10" width={50} height={50} color='#000'/>
                <div className="text-black z-40 font-semibold">Cadastrar Operador</div>
                </div>
            </button>

       
    )
}