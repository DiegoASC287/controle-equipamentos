'use client'
import CaminhaoInterf from "@/model/Caminhao"
import { useEffect, useState } from "react"

const alimentacaoLista = ["", "Diesel", "Gasolina", "Elétrico", "Manual", "Etanol", "Gás"]
interface CaminhaoProps{
    onChange: (caminhao: CaminhaoInterf) => void
}

export default function Caminhao(props:CaminhaoProps){
    const [caminhao, setCaminhao] = useState<CaminhaoInterf>()
    const [dim_x_cacamba, setDimX] = useState<number>(0)
    const [dim_y_cacamba, setDimY] = useState<number>(0)
    const [dim_z_cacamba, setDimZ] = useState<number>(0)

    useEffect(() => {
        props.onChange({
            volume_cacamba: dim_x_cacamba*dim_y_cacamba*dim_z_cacamba,
            foto_documento: caminhao?.foto_documento,
            alimentacao: caminhao?.alimentacao,
            foto_habilitacao: caminhao?.foto_habilitacao,
            placa: caminhao?.placa,
            tara: caminhao?.tara,
        })
    }, [dim_x_cacamba, dim_y_cacamba, dim_z_cacamba, caminhao]) 
    return (
        <div className="grid gap-2 md:grid-cols-2 p-2 border-2 border-zinc-100 w-full">
            <div>

            <div className='flex items-center'>
            <label className='w-1/2'>Tipo de alimentação</label>
            <select className="px-1 border-2 mb-1 w-1/2"
                value={caminhao?.alimentacao} onChange={e => setCaminhao({...caminhao, alimentacao: e.target.value})}>
                {alimentacaoLista.map((e, i) => <option key={i}>{e}</option>)}
            </select>
            </div>
            {/*-----*/}
            <div className='flex items-center'>
            <label className='w-1/2'>Tara</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="number"
            value={caminhao?.tara}  
            onChange={e => setCaminhao({...caminhao, tara: +e.target.value})}/>
            </div>
            {/*-----*/}
            <div className="flex flex-col">
            <div className="border-t-2 mt-2">Dimensões da caçamba</div>
            <div className="flex w-full flex-col">
            <div className='flex items-center'>
            <label className='w-1/2'>Largura</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="number"
            value={dim_y_cacamba}  
            onChange={e => setDimY(+e.target.value)}/>
            </div>
            
            {/*-----*/}
            <div className='flex items-center'>
            <label className='w-1/2'>Comprimento</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="number"
            value={dim_x_cacamba}  
            onChange={e => setDimX(+e.target.value)}/>
            </div>
            {/*-----*/}
            <div className='flex items-center border-b-2'>
            <label className='w-1/2'>Altura</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="number"
            value={dim_z_cacamba}  
            onChange={e => setDimZ(+e.target.value)}/>
            </div>
            {/*-----*/}
            <div className='flex items-center pt-2'>
            <label className='w-1/2'>Placa</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="text"
            value={caminhao?.placa}  
            onChange={e => setCaminhao({...caminhao, placa: e.target.value})}/>
            </div>
            {/*-----*/}
            </div>
            </div>
            </div>
            <div>
            <div className='flex flex-col'>
            <label className='w-1/2'>Foto da habilitação</label>
            <input className="px-2 border-2 mb-1" type="file"
            value={caminhao?.foto_habilitacao}  
            onChange={e => setCaminhao({...caminhao, foto_habilitacao: e.target.value})}/>
            </div>
            <div className='flex flex-col'>
            <label className='w-1/2'>Foto do documento</label>
            <input className="px-2 border-2 mb-1" type="file"
            value={caminhao?.foto_documento}  
            onChange={e => setCaminhao({...caminhao, foto_documento: e.target.value})}/>
            </div>

            </div>
            

        </div>
    )
}