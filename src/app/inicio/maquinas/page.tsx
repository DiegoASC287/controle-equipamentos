'use client'
import MaquinaItem from "@/components/MaquinaItem"
import link from "@/app/pathspers"
import BarraFiltro from "@/components/BarraFiltro"
import { useEffect, useState } from "react"
import FiltroProps from "@/model/FiltroProps"
import Maquina from "@/model/Maquina"
import { useSearchParams } from "next/navigation"

export default function PaginaMaquinas(){
    
    const [filtro, setFiltro] = useState<FiltroProps | null | undefined>({categoria: "", tipo: "", nome: ""})
    const [maquinas, setMaquinas] = useState<Maquina[]>()
    const [listaFiltrada, setListaFiltrada] = useState<Maquina[]>()

    const search = useSearchParams()
    const codigo = search.get("codigoobra")

    function renderizarMaquinas(){
        if(filtro){
            return listaFiltrada?.map((e: any) => <MaquinaItem key={e.id} maquina={e}/> )
        }else{
            return maquinas?.map((e: any) => <MaquinaItem key={e.id} maquina={e}/> )
        }
    }
    
    useEffect(() => {
        fetch(`${link}/api/maquinas?codigoobra=${codigo}`, {cache: 'no-cache'}).then(res => res.json()).then(maq => {
            setMaquinas(maq)
            setFiltro({categoria: "", tipo: "", nome: ""})})
    }, [])
 
    function alterarFiltro(filt: FiltroProps){
        setFiltro(filt)
    }
    
    useEffect(() => {
        setListaFiltrada(maquinas?.filter(e => e.categoria?.startsWith(filtro ? filtro.categoria : '') &&
         e.tipo?.startsWith(filtro ? filtro.tipo : '') && e.nome?.toLowerCase().startsWith(filtro ? filtro.nome.toLowerCase() : '')))
    }, [filtro])

    return (
        <div className="h-screen">
            <BarraFiltro setFiltro={alterarFiltro}/>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 p-3">
            {renderizarMaquinas()}
        </div>
        </div>
    )
}