'use client'
import link from "@/app/pathspers"
import Calendario from "@/components/Calendario"
import PDFFile from "@/components/PDFFile"
import MaquinaContext from "@/data/context/maquina/MaquinaContext"
import LinhaTabPartDiaria from "@/model/LinhaTabPartDiaria"
import Obra from "@/model/Obra"
import { PDFViewer } from "@react-pdf/renderer"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function Home() {
    const ctx = useContext(MaquinaContext)
    const [dataInicio, setDataInicio] = useState<Date>()
    const [dataFim, setDataFim] = useState<Date>()
    const [tabelaPD, setTabelaPD] = useState<LinhaTabPartDiaria[]>()
    const [obra, setObra] = useState<Obra>({} as Obra)
    const search = useSearchParams()
    const codigo = search.get('codigoobra')
    const id = search.get('id')

    useEffect(()=> {
        fetch(`${link}/api/maquinas/addatividade?id=${id}&codigoobra=${codigo}`, {
            cache: 'no-store'
        })
        .then(item => item.json()).then(tabela => {
            setTabelaPD(tabela)})
    }, [])  
    useEffect(()=> {
        fetch(`${link}/api/obras/cadastro?codigo=${codigo}`, {
            cache: 'no-store'
        })
        .then(item => item.json()).then(obraCur => {
            setObra(obraCur)})
    }, [])  
    return (
        <div className="flex justify-center flex-col items-center">
            <div className="flex p-2 w-1/2 gap-5 justify-center">
            <div className="flex items-center gap-5">
            <label htmlFor="">Data inicial</label>
            <Calendario className="max-w-[250px]" id="" legenda="" onChange={setDataInicio} value={dataInicio}/>
            </div>
            <div className="flex items-center gap-5">

            <label  htmlFor="">Data final</label>
            <Calendario className="max-w-[250px]" id="" legenda="" onChange={setDataFim} value={dataFim}/>
            </div>
            </div>
            {dataInicio && dataFim && tabelaPD ? (

            <PDFViewer className="w-full h-screen" height={96 / 25.4 * 297} width={96 / 25.4 * 210}>
                <PDFFile periodoFinal={dataFim} 
                periodoInicio={dataInicio} 
                maquina={ctx?.maquina ? ctx.maquina : {}} 
                listaPartDiaria={tabelaPD} obra={obra}/>
            </PDFViewer>
            ): (null)}
        </div>
    )
}
