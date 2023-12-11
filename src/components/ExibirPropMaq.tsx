'use client'

import { IconCheck, IconEdit } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import MostrarOperador from "./MostrarOperador"
import OperadorProps from "@/model/OperadorProps"
import DropOperador from "./DropOperador"
import link from "@/app/pathspers"
import Maquina from "@/model/Maquina"

interface ExibirPropMaqProps {
    editando: boolean
    maquina?: Maquina
    titulo?: string
    aoAlterar: (operador?: OperadorProps | null) => void
}

export default function ExibirPropMaq(props: ExibirPropMaqProps) {
    const [maquina, setMaquina] = useState<Maquina>()
    const [editando, setEditando] = useState<boolean>(true)
    const [operador, setOperador] = useState<OperadorProps | null>()
    const [alteracoes, setAlteracoes] = useState<{operador: boolean, nome: boolean, modelo: boolean}>({nome: false, modelo:false, operador: false})

    function alterarVisualizacao(){
        setOperador(undefined)
    }

    function mudarOperador(operador: OperadorProps | null){
        setMaquina(valor => {return {...valor, maquina_pesada:{...valor?.maquina_pesada, operador:operador}}})
        setOperador(operador)
        setAlteracoes(valor => {return {...valor, operador:true}})
    }

    function concluirEdicao(){
        const erros = []
        
        if(!maquina?.nome || maquina?.nome.trim() === ""){
            erros.push("Faltou preencher o equipamento!")
        }
        if(!maquina?.modelo || maquina?.modelo.trim() === ""){
            erros.push("Faltou preencher o modelo!")
        }
        if(alteracoes.operador){
            if(operador){
        
                fetch(`${link}/api/maquinas/updatemetodo`, {
                    cache: 'no-store',
                    method: 'POST',
                    body: JSON.stringify(maquina)
                }).then(resp => resp.json()).then(resultado => {
                    props.aoAlterar(resultado)
                    alteracoes.operador=false}
                    )
                
            } else{
                erros.push("A máquina deve ter um operador!")
                }
            }
            setEditando(false)
    }

    useEffect(() => {

    }, [operador])
    useEffect(() => {
        setMaquina(props.maquina)
        setOperador(props.maquina?.maquina_pesada?.operador)
    }, [])
    function renderizarSelectOpEdit(){
        if(maquina?.tipo && maquina?.tipo.trim() !== ""){
            return (<div className="flex gap-4 justify-between mt-1">
                <div>
                    Operador
                    </div>
                {operador?(
                <MostrarOperador exibirX operador={operador ? operador : {} as OperadorProps} tipo={maquina?.tipo} alterarVisualizacao={alterarVisualizacao}/>
                ): (

                <DropOperador dimTexto={30} selecionar={mudarOperador} tipo_maquina={maquina.tipo}/>
                )}
            </div>)
        }else{
            return <div>Teste</div>
        }
    }
    function renderizarSelectOp(){
        if(maquina?.tipo && maquina?.tipo.trim() !== ""){
            return (<div>
                Operador
                {operador? (
                <MostrarOperador operador={operador ? operador : {} as OperadorProps} tipo={maquina?.tipo} alterarVisualizacao={alterarVisualizacao}/>
                ): (

                <div>Nenhum operador selecionado!</div>
                )}
            </div>)
        }else{
            return <div>Teste</div>
        }
    }

    function renderizarOps(){
            switch(maquina?.unidade){
                case "h": {
                    return(
                        <div>Horímetro</div>
                    )
                }
                case "km": {
                    return(<div>Odômetro</div>)
                }
                case "mês": {
                    return(<div>Meses</div>)
                }default: {
                    return <div>Contador</div>
                }
        }
    }
    useEffect(() => {
        setMaquina(props.maquina)
    }, [])
    function renderizacaoCondicional() {
        if (editando) {
            return (
                <div className="flex relative">
                    <div className="flex flex-col w-11/12">
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Equipamento</div>
                            <input className="flex-grow text-right" type="text" value={maquina?.nome}
                                onChange={e => setMaquina({ ...maquina, nome: e.target.value })} />
                        </div>
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Modelo</div>
                            <input className="flex-grow text-right" type="text" value={maquina?.modelo}
                                onChange={e => setMaquina({ ...maquina, modelo: e.target.value })} />
                        </div>
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Categoria</div>
                            <div className="w-1/2 text-right">{maquina?.categoria}</div>
                        </div>
                            
                            {maquina?.categoria === "Pesada" ? (<>
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                                <div className="w-1/2 ">Tipo</div>
                                <div className="w-1/2 text-right">{maquina?.tipo}</div>
                        </div>
                            </>
                            ): (null)}
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Unidade</div>
                            <div className="w-1/2 text-right">{maquina?.unidade}</div>
                        </div>
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Alimentação</div>
                            <div className="w-1/2 text-right">{maquina?.alimentacao}</div>
                        </div>
                        
                        {(maquina?.categoria ==="Pesada" && maquina?.tipo !== "" )? renderizarSelectOpEdit():null}
                    </div>
                    <IconCheck className="absolute right-1 top-1" onClick={e => {
                        concluirEdicao()

                    }} />
                </div>
            )
        } else {
            return (
                <div className="flex relative">
                    <div className="flex flex-col w-11/12">
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Equipamento</div>
                            <div className="w-1/2 text-right">{maquina?.nome}</div>
                        </div>
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Modelo</div>
                            <div className="w-1/2 text-right">{maquina?.modelo}</div>
                        </div>
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Categoria</div>
                            <div className="w-1/2 text-right">{maquina?.categoria}</div>
                        </div>
                            
                            {maquina?.categoria === "Pesada" ? (<>
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                                <div className="w-1/2 ">Tipo</div>
                                <div className="w-1/2 text-right">{maquina?.tipo}</div>
                        </div>
                            </>
                            ): (null)}
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Unidade</div>
                            <div className="w-1/2 text-right">{maquina?.unidade}</div>
                        </div>
                        <div className="flex justify-between w-full border-b-2 border-zinc-300 pb-2 px-2">
                            <div className="w-1/2 ">Alimentação</div>
                            <div className="w-1/2 text-right">{maquina?.alimentacao}</div>
                        </div>
                        
                        {(maquina?.categoria ==="Pesada" && maquina?.tipo !== "" )? renderizarSelectOp():null}

                    </div>
                    <button className="absolute right-1 top-1" onClick={e => {
                        setEditando(true)
                        props.aoAlterar(maquina?.maquina_pesada?.operador)
                    }}>

                    <IconEdit className="hover:text-zinc-600"/>
                    </button>
                </div>
            )
        }
    }
    return (
        <div>
            {renderizacaoCondicional()}
            
            </div>
    )
}