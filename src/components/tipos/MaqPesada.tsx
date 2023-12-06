'use client'
import MaquinaPesadaInterf from "@/model/MaqPesada"
import { useEffect, useState } from "react"
import Calendario from "../Calendario"


interface MaquinaPesadaProps{
    onChange: (maqPes: MaquinaPesadaInterf) => void
}

export default function MaquinaPesada(props:MaquinaPesadaProps){
    const [maqPesada, setMaqPesada] = useState<MaquinaPesadaInterf>()
    const [dim_trabalho, setDimTrabalho] = useState<number>(0)
    const [data_venc_hab, setDataVHab] = useState<Date>(new Date)
    const [data_venc_doc, setDataVDoc] = useState<Date>(new Date)


    useEffect(() => {
        props.onChange({
            volume_trabalho: maqPesada?.volume_trabalho,
            foto_documento: maqPesada?.foto_documento,
            data_vencimento_documento: data_venc_doc,
            foto_habilitacao: maqPesada?.foto_habilitacao,
            data_vencimento_habilitacao: data_venc_hab,
            identificador: maqPesada?.identificador,
        })
    }, [dim_trabalho, maqPesada, data_venc_doc, data_venc_hab]) 
    return (
        <div className="grid gap-2 md:grid-cols-2 p-2 border-2 border-zinc-100 w-full">
            <div>

           
            {/*-----*/}
            <div className="flex flex-col">
            <div className="flex w-full flex-col">
            {/*-----*/}
            <div className='flex items-center'>
            <label className='w-1/2'>Dimensão de trabalho</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="number"
            value={dim_trabalho}  
            onChange={e => setDimTrabalho(+e.target.value)}/>
            </div>
            {/*-----*/}
            <div className='flex items-center pt-2'>
            <label className='w-1/2'>Placa/Identificador</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="text"
            value={maqPesada?.identificador}
            onChange={e => setMaqPesada({...maqPesada, identificador: e.target.value})}/>
            </div>
            {/*-----*/}
            </div>
            </div>
            </div>
            <div>
            <div className='flex flex-col'>
            <label className='w-1/2'>Foto da habilitação</label>
            <input className="px-2 border-2 mb-1" type="file"
            value={maqPesada?.foto_habilitacao}  
            onChange={e => setMaqPesada({...maqPesada, foto_habilitacao: e.target.value})}/>
            </div>
            <div className='flex flex-col'>
            <label >Data de vencimento da habilitação</label>
            <Calendario value={data_venc_hab}
             onChange={setDataVHab} id="cal" legenda=""/>
            </div>
            
            <div className='flex flex-col'>
            <label className='w-1/2'>Foto do documento</label>
            <input className="px-2 border-2 mb-1" type="file"
            value={maqPesada?.foto_documento}  
            onChange={e => setMaqPesada({...maqPesada, foto_documento: e.target.value})}/>
            </div>
            <div className='flex flex-col'>
            <label >Data de vencimento do documento</label>
            <Calendario value={data_venc_doc}
             onChange={setDataVDoc} id="cal" legenda=""/>
            </div>

            </div>
            

        </div>
    )
}