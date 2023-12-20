'use client'
import { cpfMask } from '@/app/functions/cpfMask'
import { useEffect, useState } from 'react'
import {BiChevronDown} from 'react-icons/bi'
import {AiOutlineSearch} from 'react-icons/ai'
import link from '@/app/pathspers'
import Obra from '@/model/Obra'



export default function DropObras(props:{
    selecionar: (operador:Obra) => void, dimTexto:number,
    }){

    const [obras, setObras] = useState<Obra[]>()
    const [codigoInput, setCodigoInput] = useState<string>("")
    const [nomeInput, setNomeInput] = useState<string>("")
    const [selecionado, setSelecionado] = useState<Obra>()
    const [aberto, setAberto] = useState<boolean>(false)
    useEffect(() => {
        
        fetch(`${link}/api/obras/consulta`, {
                cache: 'no-store'
            })
            .then(operadorR => operadorR.json()).then(obras => {
                setObras(obras)
        })
    }, [])
    return (
        <div className="w-60 md:w-[600px] max-w-[18em] font-medium relative">
            <div onClick={e=> setAberto(!aberto)}
            className="bg-white w-full p-1 flex items-center justify-between rounded border-2 border-zinc-200">
                
                { selecionado ? (<div><span>{`${selecionado?.codigo} - `}</span>
                <span>{selecionado?.nome.length >= props.dimTexto ? selecionado?.nome.substring(0,props.dimTexto) + " ...": selecionado.nome}</span></div>): ("Selecione uma obra")}
                <BiChevronDown size={20} className={`${aberto && 'rotate-180'}`} />
                </div>
                <ul className={`rounded-b-lg shadow-lg border-2 border-zinc-200 bg-white mt-2 overflow-y-auto ${aberto ? 'max-h-96 absolute max-w-[18em] z-10' : 'hidden'}`}>
                    <div className='flex items-center px-2 sticky top-0 bg-white'>
                        <AiOutlineSearch className={'text-gray-700'} size={18}/>
                        <input
                        onChange={e => setNomeInput(cpfMask(e.target.value.toLowerCase()))}
                        value={nomeInput}
                        type="text" placeholder='CPF'
                        className='placeholder:text-gray-400 p-2 outline-none border-r-2 w-32' />
                        <AiOutlineSearch className={'text-gray-700'} size={18}/>
                        <input
                        onChange={e => setCodigoInput(e.target.value.toLowerCase())}
                        value={codigoInput}
                        type="text" placeholder='Nome'
                        className='placeholder:text-gray-400 p-2 outline-none' />
                    </div>
                    {(obras && obras?.length > 0) ? (
                        obras?.map(linha => <li
                            onClick={
                                () => {
                                    if(linha?.nome?.toLowerCase() !== selecionado?.codigo?.toLowerCase()){
                                        setSelecionado(linha)
                                        setAberto(false)
                                        setCodigoInput("")
                                        setNomeInput("")
                                        props.selecionar(linha)
                                    }
                                }
                            }
                             key={linha.codigo} 
                            className={`border-b-2 border-zinc-200 p-2 text-sm hover:bg-zinc-100 hover:cursor-pointer
                             ${(linha?.nome?.toLowerCase().startsWith(`${codigoInput}`))
                             && (linha?.codigo?.toLowerCase().startsWith(`${nomeInput}`))?'block':'hidden'}`}>
                                <span className='pl-2'>{`${linha.codigo} - `}</span><span>{linha.nome}</span></li>)
                    ): (
                        <li className='text-center p-2 text-zinc-500'>Nenhuma obra cadastrada</li>
                    )}
                    
                    
                </ul>
        </div>
    )
}