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
        fetch(`${link}/api/maquinas?id=${props.id}`, {
            cache: 'no-store'
        })
        .then(item => item.json()).then(maq => setMaquina(maq))
    }, [])
return (
    <div>Oi</div>
)
}