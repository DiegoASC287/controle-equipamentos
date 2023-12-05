import ModeloItemEAPApelido from '../model/ModeloItemEAPApelido'
'use client'
import { useEffect, useState } from 'react'
import {BiChevronDown} from 'react-icons/bi'
import {AiOutlineSearch} from 'react-icons/ai'
import link from '@/app/pathspers'

export default function DropEapApelido(props:{selecionar:
     (item:ModeloItemEAPApelido) => void, 
     dimTexto:number,
    maquinaId?: number  }){

    const [eap, setEap] = useState<ModeloItemEAPApelido[]>()
    const [descricaoInput, setDescricaoInput] = useState<string>("")
    const [itemInput, setItemInput] = useState<string>("")
    const [selecionado, setSelecionado] = useState<ModeloItemEAPApelido>()
    const [aberto, setAberto] = useState<boolean>(false)
    useEffect(() => {
        fetch(`${link}/api/maquinas/associacaoatividade?id=${props.maquinaId}`, {
                cache: 'no-store'
            })
            .then(item => item.json()).then(eap => {
                setEap(eap)
                console.log(eap)
        })
    }, [])
    return (
        <div className="w-60 md:w-[600px] max-w-sm font-medium relative">
            <div onClick={e=> setAberto(!aberto)}
            className="bg-white w-full p-1 flex items-center justify-between rounded border-2
             border-zinc-200">
                
                { selecionado ? (<div>
                <span>{selecionado?.apelido.length >= props.dimTexto ?
                 selecionado?.apelido.substring(0,props.dimTexto) + " ...": 
                 selecionado.apelido}</span></div>): ("Selecione o serviço")}
                <BiChevronDown size={20} className={`${aberto && 'rotate-180'}`} />
                </div>
                <ul className={`rounded-b-lg shadow-lg border-2 border-zinc-200
                 bg-white mt-2 overflow-y-auto ${aberto ?
                  'max-h-96 absolute max-w-sm z-10' : 'hidden'}`}>
                    <div className='flex items-center px-2 sticky top-0 bg-white'>
                        <AiOutlineSearch className={'text-gray-700'} size={18}/>
                        
                        <input
                        onChange={e => setDescricaoInput(e.target.value.toLowerCase())}
                        value={descricaoInput}
                        type="text" placeholder='Descrição'
                        className='placeholder:text-gray-400 p-2 outline-none' />
                    </div>
                    {eap?.map(linha => <li
                    onClick={
                        () => {
                            if(linha?.apelido?.toLowerCase() !== selecionado?.apelido?.toLowerCase()){
                                setSelecionado(linha)
                                setAberto(false)
                                setDescricaoInput("")
                                setItemInput("")
                                props.selecionar(linha)
                            }
                        }
                    }
                     key={linha.id} 
                    className={`border-b-2 border-zinc-200 p-2 text-sm hover:bg-zinc-100 
                    hover:cursor-pointer
                     ${(linha?.apelido?.toLowerCase().startsWith(`${descricaoInput}`))?'block'
                     :'hidden'}`}>
                        <span>{linha.apelido}
                        </span></li>)}
                    
                </ul>
        </div>
    )
}