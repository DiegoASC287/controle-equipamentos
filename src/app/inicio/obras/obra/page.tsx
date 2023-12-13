'use client'
import link from "@/app/pathspers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react'
import OperadorProps from "@/model/OperadorProps";
import LoadingCircular from '@/components/loadings/LoadingCircular'
import Link from "next/link";
import Obra from "@/model/Obra";
import Image from "next/image";


export default function PaginaMostrarMaquina(props:any) {

    const [obra, setObra] = useState<Obra>()
    const [editando, setEditando] = useState<boolean>(false)
    const [carregando, setCarregando] = useState<boolean>(true)
    const search = useSearchParams()
    const codigo = search.get("codigo")
    
    const [equipamento, setEquipamento] = useState<OperadorProps | undefined | null>()


    useEffect(() => {
        fetch(`${link}/api/obras/consultaunica?codigo=${codigo}`,
            {
                cache: 'no-store'
            })
            .then(item => item.json()).then(obraRes => {
                setObra(obraRes)
                setCarregando(false)
            })
    }, [])

    return (
        <div className="bg-zinc-50 h-full w-full flex justify-center ">
            <div className="w-11/12 bg-zinc-100 rounded-lg mt-5 p-3 shadow-md shadow-zinc-400">

                <div className="flex flex-row p-3 border-b-2 border-zinc-400 w-full">
                    <div>
                    <div className="h-[300px] w-[350px] border-zinc-300 border-2 flex justify-center items-center overflow-hidden">
                    {obra?.imagem_url? (
                        <Image src={obra?.imagem_url} width={350} height={300} alt="Imagem"/>
                    ): (
                        <div className="w-full h-full relative">
                            <Image src={'/imgs/desenhomaq.webp'} className="opacity-40" width={350} height={300} alt="Imagem"/>
                            <div className="absolute top-[110px] left-[110px]">
                            <LoadingCircular />
                            </div>
                        </div>
                    )}  
                </div>

                    <div className="flex w-full bg-zinc-200 justify-center">
                       {`${obra?.codigo} - ${obra?.nome}`}
                    </div>
                    
                       <Link href={`${link}/inicio/maquinas/?codigoobra=${codigo}`}>
                       <div className="flex w-full justify-center p-1 bg-zinc-400"> Máquinas
                    </div>
                       </Link>
                    </div>
                <div>

                </div>
                        

                </div>
            </div>
        </div>
    )
}
