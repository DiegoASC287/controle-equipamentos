'use client'
import link from "@/app/pathspers"
import LoadingCircular from '@/components/loadings/LoadingCircular'
interface MaquinaFotoProps{
    id: string
    link?: string
}

import Image from "next/image"

export default function MaquinaFoto(props: MaquinaFotoProps){
    
return (
    <div className="h-[300px] w-[350px] border-zinc-300 border-2 flex justify-center items-center overflow-hidden">
                    {props.link? (
                        <Image src={props.link} width={350} height={300} alt="Imagem"/>

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