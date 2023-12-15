'use client'
import DescricaoAlugado from "@/components/DescricaoAlugado";
import TabelaManutencoes from "@/components/TabelaManutencoes";
import MaquinaFoto from "@/components/MaquinaFoto";
import BotaoPartDiaria from "@/components/BotaoPartDiaria";
import link from "@/app/pathspers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react'
import Maquina from "@/model/Maquina";
import ExibirPropMaq from "@/components/ExibirPropMaq";
import OperadorProps from "@/model/OperadorProps";
import Link from "next/link";


interface PageDetailProps {
    params: { id: string }
}


export default async function PaginaMostrarMaquina() {

    const [maquina, setMaquina] = useState<Maquina>()
    const [editando, setEditando] = useState<boolean>(false)
    const [carregando, setCarregando] = useState<boolean>(true)
    const search = useSearchParams()
    const id = search.get("id")
    const codigo = search.get("codigoobra")

    const [equipamento, setEquipamento] = useState<OperadorProps | undefined | null>()


    useEffect(() => {
        fetch(`${link}/api/maquinas/consulta?id=${id}`,
            {
                cache: 'no-cache'
            })
            .then(item => item.json()).then(maq => {
                setMaquina(maq)
                setCarregando(false)
            })
    }, [])

    return (
        <div className="bg-zinc-50 h-full w-full flex justify-center ">
            <div className="w-11/12 bg-zinc-100 rounded-lg mt-5 p-3 shadow-md shadow-zinc-400">

                <div className="flex flex-row p-3 border-b-2 border-zinc-400 w-full">
                    <div>
                        <MaquinaFoto id={id ? id : "999"} />
                        <Link href={{
                            pathname: `/inicio/maquinas/maquinaassociacoes`,
                            query: {
                                id,
                                codigo
                            }
                        }} >
                            <button className="bg-zinc-300 hover:bg-zinc-200 w-full p-1">Editar associações de trabalho</button>
                        </Link>
                    </div>
                    <div className="flex w-full">
                        <div className=" flex flex-col w-1/2 m-1">
                            {maquina?.nome ? (
                                <ExibirPropMaq aoAlterar={setEquipamento}
                                    editando={editando} titulo="Equipamento" maquina={{ ...maquina }} />
                            ) : (null)}

                        </div>
                        <DescricaoAlugado id={Number(id)} />
                    </div>

                </div>
                <TabelaManutencoes id={id ? id : "999"} />

                <div>
                </div>
                <BotaoPartDiaria id={id ? id : "999"} />
            </div>
        </div>
    )
}