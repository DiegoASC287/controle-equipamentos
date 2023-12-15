'use client'
import ModeloItemEAP from '../model/ModeloItemEAP'
import { useEffect, useState } from 'react'
import {BiChevronDown} from 'react-icons/bi'
import {AiOutlineSearch} from 'react-icons/ai'
import link from '@/app/pathspers'
import { useSearchParams } from 'next/navigation'

export default function DropEap(props:{selecionar: (item:string) => void, dimTexto:number}){

    const [eap, setEap] = useState<ModeloItemEAP[]>()
    const [descricaoInput, setDescricaoInput] = useState<string>("")
    const [itemInput, setItemInput] = useState<string>("")
    const [selecionado, setSelecionado] = useState<ModeloItemEAP>()
    const [aberto, setAberto] = useState<boolean>(false)

    const search = useSearchParams()
    const codigo = search.get("codigo")

    useEffect(() => {
        fetch(`${link}/api/eap/lerecadastrar?codigo=${codigo}`, {
                cache: 'no-store'
            })
            .then(item => item.json()).then(eap => {
                setEap(eap)
        })
    }, [])
    return (
        <div className="w-60 md:w-[1200px] max-w-sm font-medium relative">
            <div onClick={e=> setAberto(!aberto)}
            className="bg-white w-full p-1 flex items-center justify-between rounded border-2 border-zinc-200">
                
                { selecionado ? (<div><span>{`${selecionado?.item} - `}</span>
                <span>{selecionado?.descricao.length >= props.dimTexto ? selecionado?.descricao.substring(0,props.dimTexto) + " ...": selecionado.descricao}</span></div>): ("Selecione um item da EAP")}
                <BiChevronDown size={20} className={`${aberto && 'rotate-180'}`} />
                </div>
                <ul className={`rounded-b-lg shadow-lg border-2 border-zinc-200 bg-white mt-2 overflow-y-auto ${aberto ? 'max-h-96 absolute max-w-sm z-10' : 'hidden'}`}>
                    <div className='flex items-center px-2 sticky top-0 bg-white'>
                        <AiOutlineSearch className={'text-gray-700'} size={18}/>
                        <input
                        onChange={e => setItemInput(e.target.value.toLowerCase())}
                        value={itemInput}
                        type="text" placeholder='Item'
                        className='placeholder:text-gray-400 p-2 outline-none border-r-2 w-32' />
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
                            if(linha?.item?.toLowerCase() !== selecionado?.item?.toLowerCase()){
                                setSelecionado(linha)
                                setAberto(false)
                                setDescricaoInput("")
                                setItemInput("")
                                props.selecionar(linha.item)
                            }
                        }
                    }
                     key={linha.item} 
                    className={`border-b-2 border-zinc-200 p-2 text-sm hover:bg-zinc-100 hover:cursor-pointer
                     ${(linha?.descricao?.toLowerCase().startsWith(`${descricaoInput}`))
                     && (linha?.item.split(".")[1]?.toLowerCase().startsWith(`${itemInput}`))?'block':'hidden'}`}>
                        <span className='pl-2'>{`${linha.item.split("-")[1]}.${linha.item.split(".")[1]} - `}</span><span>{linha.descricao}</span></li>)}
                    
                </ul>
        </div>
    )
}