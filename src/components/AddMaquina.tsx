'use client'
import { IconAlertTriangleFilled, IconPlus, } from "@tabler/icons-react";
import Link from "next/link";

export default function AddMaquina(){
    return (
        <Link href={{
            pathname: `/inicio/maquinas/maquinacadastro/001`}} >
     
        <div className={`
        flex flex-col border rounded-lg p-1
        border-zinc-200 
        bg-zinc-100
        items-center
        h-[320px]
        w-[220px]
        hover:border-3 hover:border-black
        `}>
            <div className="flex flex-col pt-2 px-2 h-full w-full justify-center items-center">
                <IconPlus width={50} height={50} color='#b5b5b5'/>
                <div className="text-zinc-400">Adicionar</div>
                </div>
            </div>

       
        </Link>
    )
}