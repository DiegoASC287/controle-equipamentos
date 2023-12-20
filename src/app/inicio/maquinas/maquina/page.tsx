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
import { IconCheck, IconFileArrowLeft, IconFileArrowRight, IconTrash } from "@tabler/icons-react";
import { Tooltip } from "@nextui-org/react";
import DropObras from "@/components/DropObras";
import Obra from "@/model/Obra";

interface PageDetailProps {
    params: { id: string }
}


export default async function PaginaMostrarMaquina() {

    const [maquina, setMaquina] = useState<Maquina>()
    const [editando, setEditando] = useState<boolean>(false)
    const [carregando, setCarregando] = useState<boolean>(true)
    const [addAObra, setAddAObra] = useState<boolean>(false)
    const [obraSeleiconada, setObraSelecionada]= useState<Obra>()
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

    function deletarMaquina(){
        
        fetch(`${link}/api/maquinas/cadastro`,
            {
                cache: 'no-cache',
                method: 'DELETE',
                body: JSON.stringify(maquina)
            })
            .then(item => item.json()).then(maq => {
                setCarregando(false)
            })
        fetch(`${link}/api/maquinas/imgmaquina`,
            {
                cache: 'no-cache',
                method: 'DELETE',
                body: JSON.stringify({linkDoc: [maquina?.imagem,
                     maquina?.documento,
                     maquina?.maquina_pesada?.artUrl,
                     maquina?.maquina_pesada?.planoManUrl]})
            })
            .then(item => item.json()).then(maq => {
                setCarregando(false)
            })
    }
    function arquivarMaquina(cod_obra?: string){
        if(cod_obra){
            fetch(`${link}/api/maquinas/aqruivarmaq`,
            {
                cache: 'no-cache',
                method: 'POST',
                body: JSON.stringify({idMaquina: maquina?.id,
                     ativa: !maquina?.ativa,
                     cod_obra: cod_obra} as {idMaquina: number, ativa: boolean, cod_obra: string})
            })
            .then(item => item.json()).then(res => {
                setMaquina({...maquina, ativa: res.ativa, cod_obra: res.cod_obra})
                alert(res?.msg)
                })
        }
    }
    return (
        <div className="bg-zinc-50 h-full w-full flex justify-center">
            <div className="w-11/12 bg-zinc-100 rounded-lg mt-5 p-3 shadow-md shadow-zinc-400">

                <div className="flex flex-row p-3 border-b-2 border-zinc-400 w-full">
                    <div>
                        {maquina?.imagem?(

                        <MaquinaFoto link={maquina?.imagem} id={id ? id : "999"} />
                        ): (null)}
                        <div className="flex items-center bg-zinc-300 justify-between px-1">
                        <Link href={{
                            pathname: `/inicio/maquinas/maquinaassociacoes`,
                            query: {
                                id,
                                codigo
                            }
                        }} >
                            <button className="bg-zinc-300 hover:bg-zinc-200 w-full p-1">Editar associações de trabalho</button>
                        </Link>
                        {maquina?.ativa? (

                        <Tooltip className="bg-zinc-200 text-sm rounded-md px-2 border-dashed border-zinc-400 border-2"
             content="Arquivar máquina" delay={0} closeDelay={0} placement="bottom">

                        <button onClick={e => arquivarMaquina(maquina?.cod_obra)} 
                        className="flex items-center justify-center bg-zinc-300 px-1 hover:bg-zinc-200"><IconFileArrowRight /></button>
             </Tooltip>
                        ):(
                        <Tooltip className="bg-zinc-200 text-sm rounded-md px-2 border-dashed border-zinc-400 border-2"
             content="Adicionar máquina a uma obra" delay={0} closeDelay={0} placement="bottom">

                        <button onClick={(e) => {
                            e.preventDefault()
                            setAddAObra(!addAObra)}} 
                        className="flex items-center justify-center bg-zinc-300 px-1 hover:bg-zinc-200"><IconFileArrowLeft /></button>
             </Tooltip>

                        )}
             <Tooltip isDisabled={maquina?.ativa} className="bg-zinc-200 text-sm rounded-md px-2 border-dashed border-zinc-400 border-2"
             content="Excluir máquina" delay={0} closeDelay={0} placement="bottom">

                        <button disabled={maquina?.ativa} onClick={deletarMaquina} 
                        className={`${maquina?.ativa? ("text-zinc-400 "): ("text-black hover:bg-zinc-200")} flex items-center justify-center bg-zinc-300 px-1`}><IconTrash /></button>
             </Tooltip>
                            </div>
                            <div className="flex">{addAObra ? (
                            <>
                            <DropObras selecionar={setObraSelecionada} dimTexto={35}/>
                            <button disabled={maquina?.ativa} onClick={e => {
                                arquivarMaquina(obraSeleiconada?.codigo? obraSeleiconada.codigo : "Nenhuma")
                                setAddAObra(false)
                            }} 
                        className={` flex 
                        items-center justify-center bg-zinc-300 px-1 w-full hover:bg-zinc-200`}><IconCheck /></button>
                            </>
                            ) : null}
                            </div>
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