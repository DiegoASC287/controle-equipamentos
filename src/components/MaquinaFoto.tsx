'use client'
import link from "@/app/pathspers"
import LoadingCircular from '@/components/loadings/LoadingCircular'
interface MaquinaFotoProps{
    id: string
}

import Image from "next/image"
import Maquina from "@/model/Maquina"
import { useEffect, useState } from "react"

export default function MaquinaFoto(props: MaquinaFotoProps){
    const [maquina, setMaquina] = useState<Maquina>()
    useEffect(()=> {
        fetch(`${link}/api/maquinas/consulta?id=${props.id}`, {
            cache: 'no-store'
        })
        .then(item => item.json()).then(maq => {
            setMaquina(maq)})
    }, [])
return (
    <div className="h-[300px] w-[350px] border-zinc-300 border-2 flex justify-center items-center overflow-hidden">
                    {maquina?.imagem? (
                        <Image src={maquina.imagem} width={350} height={300} alt="Imagem"/>

                    ): (
                        <div className="w-full h-full relative">
                            <Image src={'/imgs/desenhomaq.webp'} className="opacity-40" width={350} height={300} alt="Imagem"/>
                            <div className="absolute top-[110px] left-[110px]">
                            <LoadingCircular />
                            </div>
                        </div>
                    )}  
                </div>
)
}