'use client'
import { cpfMask } from '@/app/functions/cpfMask'
import { useEffect, useState } from 'react'
import {BiChevronDown} from 'react-icons/bi'
import {AiOutlineSearch} from 'react-icons/ai'
import link from '@/app/pathspers'
import OperadorProps from '@/model/OperadorProps'



export default function DropOperador(props:{
    selecionar: (operador:OperadorProps) => void, dimTexto:number,
    tipo_maquina: string | undefined,
    }){

    const [tipo, setTipo] = useState<string | undefined>()
    const [operadores, setOperadores] = useState<OperadorProps[]>()
    const [nomeInput, setNomeInput] = useState<string>("")
    const [cpfInput, setCPFinput] = useState<string>("")
    const [selecionado, setSelecionado] = useState<OperadorProps>()
    const [aberto, setAberto] = useState<boolean>(false)
    useEffect(() => {
        
        fetch(`${link}/api/operadorconsulta?tipo=${props.tipo_maquina}`, {
                cache: 'no-store'
            })
            .then(operadorR => operadorR.json()).then(operadorRes => {
                setOperadores(operadorRes)
        })
    }, [])
    return (
        <div className="w-60 md:w-[600px] max-w-sm font-medium relative">
            <div onClick={e=> setAberto(!aberto)}
            className="bg-white w-full p-1 flex items-center justify-between rounded border-2 border-zinc-200">
                
                { selecionado ? (<div><span>{`${selecionado?.cpf} - `}</span>
                <span>{selecionado?.nome.length >= props.dimTexto ? selecionado?.nome.substring(0,props.dimTexto) + " ...": selecionado.nome}</span></div>): ("Selecione um operador")}
                <BiChevronDown size={20} className={`${aberto && 'rotate-180'}`} />
                </div>
                <ul className={`rounded-b-lg shadow-lg border-2 border-zinc-200 bg-white mt-2 overflow-y-auto ${aberto ? 'max-h-96 absolute max-w-sm z-10' : 'hidden'}`}>
                    <div className='flex items-center px-2 sticky top-0 bg-white'>
                        <AiOutlineSearch className={'text-gray-700'} size={18}/>
                        <input
                        onChange={e => setCPFinput(cpfMask(e.target.value.toLowerCase()))}
                        value={cpfInput}
                        type="text" placeholder='CPF'
                        className='placeholder:text-gray-400 p-2 outline-none border-r-2 w-32' />
                        <AiOutlineSearch className={'text-gray-700'} size={18}/>
                        <input
                        onChange={e => setNomeInput(e.target.value.toLowerCase())}
                        value={nomeInput}
                        type="text" placeholder='Nome'
                        className='placeholder:text-gray-400 p-2 outline-none' />
                    </div>
                    {(operadores && operadores?.length > 0) ? (
                        operadores?.map(linha => <li
                            onClick={
                                () => {
                                    if(linha?.cpf?.toLowerCase() !== selecionado?.cpf?.toLowerCase()){
                                        setSelecionado(linha)
                                        setAberto(false)
                                        setNomeInput("")
                                        setCPFinput("")
                                        props.selecionar(linha)
                                    }
                                }
                            }
                             key={linha.cpf} 
                            className={`border-b-2 border-zinc-200 p-2 text-sm hover:bg-zinc-100 hover:cursor-pointer
                             ${(linha?.nome?.toLowerCase().startsWith(`${nomeInput}`))
                             && (linha?.cpf?.toLowerCase().startsWith(`${cpfInput}`))?'block':'hidden'}`}>
                                <span className='pl-2'>{`${linha.cpf} - `}</span><span>{linha.nome}</span></li>)
                    ): (
                        <li className='text-center p-2 text-zinc-500'>Nenhum operador encontrado</li>
                    )}
                    
                    
                </ul>
        </div>
    )
}