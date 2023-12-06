'use client'
import link from "@/app/pathspers"
interface MaquinaFotoProps{
    id: string
}

import Image from "next/image"
import Maquina from "@/model/Maquina"
import { useEffect, useState } from "react"

export default function MaquinaFoto(props: MaquinaFotoProps){
    const [maquina, setMaquina] = useState<Maquina>()
    useEffect(()=> {
        console.log(props.id)
        fetch(`${link}/api/maquinas?id=${props.id}`, {
            cache: 'no-store'
        })
        .then(item => item.json()).then(maq => {
            console.log(maq)
            setMaquina(maq)})
    }, [])
return (
    <div className="h-[250px] w-[250px] border-zinc-300 border-2 flex justify-center items-center">
                {maquina?.imagem? (
                    <Image src={maquina.imagem} width={250} height={250} alt="Imagem"/>
                ):(
                    <div>Sem imagem</div>
                )
                
                }
                </div>
)
}