'use client'
import Image from "next/image"
import Link from "next/link";
import link from "@/app/pathspers";
import Obra from "@/model/Obra";
interface MaquinaProps{
    obra: Obra
}
export default function ObraItem(props: MaquinaProps){
    const {obra} = props
    return (
        <div className="w-[220px]">        
        <Link href={{
            pathname: `${link}/inicio/obras/obra`,
            query: {codigo: obra.codigo}}} >
     
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
            <div className="relative w-[200px] h-[200px] top-1">

            <Image src={obra.imagem_url || "/"} fill alt="Imagem"/>
            </div>
            </div>
            <div className="flex pt-2 px-2 h-full w-full justify-between">
                <div className="font-bold text-left">{obra.nome}</div>
                
            </div>

        </div>
        </Link>
            </div>
    )
}