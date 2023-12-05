'use client'
import DropEap from "@/components/DropEap"
import ItemAssociacaoEapModel from "@/model/ItemAssociacaoEapModel"
import Maquina from "@/model/Maquina"
import TipoAtividade from "@/model/TipoAtividade"
import { IconX } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import LoadingCircular from '@/components/loadings/LoadingCircular'
import link from "@/app/pathspers"

interface PageAssociacoesProps{
    params: {id:string}
}

export default function PageAssociacoes({
    
    params,
  }: PageAssociacoesProps){
    
    const [atribuicoes, setAtribuicoes] = useState<ItemAssociacaoEapModel[]>([])
    const [linhaAtribuicao, setLinhaAtribuicao] = useState<ItemAssociacaoEapModel>({maquinaId:0, tipo_atividade_id:0})
    const [listaTipos, setListaTipos] = useState<TipoAtividade[]>()
    const [selectTipo, setSelectTipo] = useState<string>()
    const [maquina, setMaquina] = useState<Maquina>()
    const [t_atividade_id, setTipoAtId] = useState(0)
    const [carregandoDel, setCarregandoDel] = useState(false)



    function adicionarAtribuicoes(atribuicao: ItemAssociacaoEapModel){
        if(atribuicoes){
            fetch(`${link}/api/maquinas/associacaoatividade`, {
                    method: 'POST',
                    body: JSON.stringify(atribuicao)
                }).then(resp => resp.json()).then(result => {
                    if (result?.apelido){
                        setAtribuicoes([...atribuicoes, result])}
                    }
                    )

        }
    }
    useEffect(() => {
        buscar_atividade_id()
    }, [selectTipo])
    function buscarTipos(){
        fetch(`${link}/api/maquinas/tiposatividade`, {
                    method: 'GET', cache: 'no-store'
                }).then(resp => resp.json()).then(result => {
                    setListaTipos(result)})

    }

    function buscar_atividade_id(){
        const at = listaTipos?.filter(e => e.nome === selectTipo)[0].id
        if (at){
            setTipoAtId(at)
        }}

    useEffect(() => {
        fetch(`${link}/api/maquinas/consulta?id=${params.id}`)
        .then(res => res.json())
        .then(maquinaRes => setMaquina(maquinaRes))
        buscarAtribuicoes()
        buscarTipos()


    }, [])

    function buscarAtribuicoes(){
        fetch(`${link}/api/maquinas/associacaoatividade?id=${params.id}`, {cache: 'no-store'})
        .then(res => res.json())
        .then(atribuicoesRes => {
            console.log(atribuicoesRes)
            setAtribuicoes(atribuicoesRes)})
    }

    function deletarAtribuicao(id:number){
        fetch(`${link}/api/maquinas/associacaoatividade?id=${id}`, {cache: 'no-store', method: "DELETE"})
        .then(res => res.json())
        .then(atribuicoesRes => {
            setAtribuicoes(atribuicoes.filter(e => e.id !== atribuicoesRes.id))})
            setCarregandoDel(false)
    }

    function renderizarOuNaoX(e:any){
        if(carregandoDel === false){
            return <IconX onClick={atrib => {
                setCarregandoDel(true)
                console.log(carregandoDel)
                e.id? deletarAtribuicao(e.id):undefined}} className='hover:text-zinc-400 hover:cursor-pointer'/>
        }else{
            return <LoadingCircular/>
        }
    }
    return (
        <div className="flex justify-center">
        <div className='col-span-full bg-zinc-100 p-3 shadow-md'>
        <div className='font-bold'>Atribuição de atividades à maquina</div>
        <div className='flex gap-1 mt-2'>
            <DropEap dimTexto={20} selecionar={(e) => setLinhaAtribuicao({...linhaAtribuicao, itemEap: e})}/>
            <input className="px-2 border-2" type="text" placeholder='Descrição' value={linhaAtribuicao?.apelido} 
            onChange={e => setLinhaAtribuicao({...linhaAtribuicao, apelido: e.target.value})}/>
            <select className="px-2 border-2" value={selectTipo} onChange={e => setSelectTipo(e.target.value)}>
                <option key={120} className="px-2 border-2" value="">Selecione o tipo</option>
                {listaTipos?.map((e,i) => <option key={i} className="px-2 border-2">{e.nome}</option>)}
            </select>
            <button className='bg-zinc-300 px-2 hover:bg-zinc-400'
            onClick={e => {adicionarAtribuicoes({
                itemEap: linhaAtribuicao?.itemEap,
                apelido: linhaAtribuicao?.apelido,
                tipo_atividade_id:  t_atividade_id ,
                tempId: (Math.random()*10000).toFixed(0),
                maquinaId: maquina?.id? maquina.id:0})
            
                }}
            >Adicionar</button>
        </div>
        <ul className='mt-2'>
            
            {atribuicoes?.map((e, i) => <li key={e.itemEap} className='flex gap-3 border-b-2 items-center'> <span>{e.itemEap}</span> - <span>{e.apelido}</span> - un: 
            <span>{listaTipos?.filter(k => k.id === e.tipo_atividade_id)[0]?.unidade}</span> 
            <span>{renderizarOuNaoX(e)}</span>
            </li>)}
        </ul>
    </div></div>)}