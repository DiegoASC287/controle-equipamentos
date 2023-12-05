'use client'
import {useEffect, useState} from 'react'
import AddAlugado from '@/components/AddAlugado';
import Maquina from '@/model/Maquina';
import MaquinaPlanoMan from '@/model/MaquinaPlanoMan';
import Image from "next/image";
import InputManutencao from '@/components/InputManutencao';
import { IconX } from '@tabler/icons-react';
import CaminhaoInterf from '@/model/Caminhao';
import Caminhao from '@/components/tipos/Caminhao';
import AluguelInfoProps from '@/model/AluguelInfo';
import DropEap from '@/components/DropEap';
import ItemAssociacaoEapModel from '@/model/ItemAssociacaoEapModel';
import TipoAtividade from '@/model/TipoAtividade';

interface PageDetailProps{
    params: {id:string}
}

export default function PaginaMostrarMaquina({
    params,
  }: PageDetailProps){
    
    const [selecionarOrigem, setSelOrigem] = useState<string>()
    const [imagem, setImagem] = useState<string | null>()
    const [equipamento, setEquipamento] = useState<string>("")
    const [modelo, setModelo] = useState<string>("")
    const [unidade, setUnidade] = useState<string>("")
    const [tipoSelect, setTipo] = useState<string>()
    const [manutencao, setManutencao] = useState<string>("")
    const [intervalo, setIntervalo] = useState<number>(0)
    const [contador, setContador] = useState<number>(0)
    const [alimentacao, setAlimentacao] = useState<string | undefined>("")
    const [categoria, setCategoria] = useState<string>("")
    const [planoManutencao, setPlanoMan] = useState<MaquinaPlanoMan[]>([])
    const [aluguelInfo, setAluguelInfo] = useState<AluguelInfoProps>()
    const [caminhao, setCaminhao] = useState<CaminhaoInterf>()
    const [atribuicoes, setAtribuicoes] = useState<ItemAssociacaoEapModel[]>([])
    const [linhaAtribuicao, setLinhaAtribuicao] = useState<ItemAssociacaoEapModel>({maquinaId:0, tipo_atividade_id:0})
    const [listaTipos, setListaTipos] = useState<TipoAtividade[]>()
    const [selectTipo, setSelectTipo] = useState<string>()
    const [maquinaAdicionada, setMaquinaAdicionada] = useState<Maquina>()
    const [t_atividade_id, setTipoAtId] = useState(0)

    const un = ["Unidade", "mês", 'h', 'km']
    const tipo = ['', 'Caminhão', 'Retro escavadeira', 'Notebook', 'Outro']
    const categorias = ["", "Pesada", "Leve", "Equipamento eletrônico"]

    

    

    function atualizarCaminhao(caminhao: CaminhaoInterf){
        setCaminhao(caminhao)
        setAlimentacao(caminhao.alimentacao)
    }

    

    

    function finalizar(maquina: Maquina){

        console.log('Maquina adicionada')
    }

    function addMaquina(maq: Maquina){
        const maqCaminhao = {...maq, caminhao:caminhao}
        switch (maq?.tipo){
            case "Caminhão": {
                fetch(`http://localhost:3000/api/maquinas/cadastro`, {
                    method: 'POST',
                    body: JSON.stringify({...maqCaminhao})
                }).then(resp => resp.json()).then(result => setMaquinaAdicionada(result))
            
            }break;
        }
    }

    
    
    function placeHolderQuant(){
        if(unidade === "h"){
            return "Horímetro"
        }else if(unidade === "km"){
            return "Odômetro"
        }else {
            return "Selecione a unidade"
        }
    }

    function renderizarTipo(){
        switch (tipoSelect){
            case 'Caminhão':{
                return <Caminhao onChange={atualizarCaminhao}/>
            } break;

        }
    }
    function adicionarManutencao(man: MaquinaPlanoMan){
        setPlanoMan([...planoManutencao, man])
    }

    function atualizarDadosAluguel(e:AluguelInfoProps){
            setAluguelInfo(e)
        }
    
    return (

        <div className='flex w-full mt-5 justify-center'>
            <div className='grid md:grid-cols-3 flex-wrap gap-3 bg-zinc-50 shadow-lg shadow-zinc-400 p-3 rounded-lg'>
            <div className="h-[250px] w-[250px] border-zinc-300 border-2 flex justify-center items-center">
                {imagem? (
                    <Image src={imagem} width={250} height={250} alt="Imagem"/>
                ):
                "Foto"}
                </div>
        
        <div className="bg-zinc-50 w-full px-2 col-span-1 md:col-span-2">
            <div className="w-full  mt-2 rounded-md flex flex-col">
            <input className="p-1 border-2 mb-1" type="text" placeholder="Equipamento..." 
            value={equipamento} 
            onChange={e => setEquipamento(e.target.value)}/>
            <input className="p-1 border-2 mb-1" type="text" placeholder="Modelo..." 
            value={modelo} 
            onChange={e => setModelo(e.target.value)}/>
            <div className='flex items-center'>
            <label className='w-1/2'>Unidade</label>
            <select className=" px-1 border-2 mb-1 w-1/2"
                    value={unidade} onChange={e => setUnidade(e.target.value)}>
                        {un.map((e, i) => <option key={i}>{e}</option>)}
                    </select>
                    </div>
            <div className='flex items-center'>
            <label className='w-1/2'>{placeHolderQuant()}</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="number"
            value={contador} 
            onChange={e => setContador(+e.target.value)}/>
            </div>
            
            <div className='flex items-center'>
            <label className='w-1/2'>Categoria</label>
            <select className=" w-1/2 px-1 border-2 mb-1"
                value={categoria} onChange={e => setCategoria(e.target.value)}>
                {categorias.map((e, i) => <option key={i}>{e}</option>)}
            </select>
            </div>
            <div className='flex items-center'>
            <label className='w-1/2'>Tipo</label>
            <select className=" w-1/2 px-1 border-2 mb-1"
                value={tipoSelect} onChange={e => setTipo(e.target.value)}>
                {tipo.map((e, i) => <option key={i}>{e}</option>)}
            </select>
            </div>
                    
            </div>
            
        </div>
        <div className='flex flex-col'>
        <div className='bg-zinc-50 flex gap-5'>
                    <div className='text-sm text-zinc-400 '>Origem</div>
                    <select className='pl-2 text-zinc-800 bg-zinc-50 w-full' value={selecionarOrigem} onChange={e => setSelOrigem(e.target.value)}>
                        <option className='text-right'>Próprio</option>
                        <option className='text-right'>Alugado</option>
                    </select>
                    </div>
                    {selecionarOrigem === "Alugado"?<AddAlugado onChange={atualizarDadosAluguel} value={aluguelInfo}/>:<div>Próprio</div>}
                    
                    
        </div>
        <div className='md:col-span-2 w-full'>
                    {renderizarTipo()}
        </div>
        <div>
        <div className="mt-2 w-full ">
                
                <div className="min-w-max px-2 py-1 bg-gray-400 flex justify-center">Manutenções periódicas</div>
                <div className="bg-gray-300 flex flex-col justify-around min-w-max">
                    
                    <InputManutencao type="text" texto=" Manutenção" onChange={setManutencao} value={manutencao}/>
                    <InputManutencao type="number" texto= "Intervalo." onChange={setIntervalo} value={intervalo}/>
                    <div className="flex justify-between mt-1 pl-2">
                    </div>
                    <button className=" p-2 bg-zinc-200 hover:bg-zinc-300"
                    onClick={e => (manutencao?.trim() === "" || intervalo <= 0 ? alert("Falta preencher campos obrigatórios") : adicionarManutencao({
                        descricao: manutencao, intervalo: intervalo, id: (Math.random()*1000).toFixed(0)}))
                         }>
                            Adicionar manutenção</button>
                            
                </div>
            </div>
        </div>
        <div className=' max-h-60 overflow-y-auto col-span-2'>
        <div className="flex flex-grow items-center justify-center bg-gray-400 mt-1 py-1 font-bold">Plano de manutenções</div>
        <table className='w-full'>
                
                    <thead className="">
                    <tr className="bg-zinc-300 ">
                        <th className="  border-b-2 border-zinc-400 border-l-2 border-r-2 px-5 py-2 text-start ">Manutenção</th>
                        <th className=" border-b-2 border-r-2 border-zinc-400 px-5 py-2 text-start ">Intervalo {unidade !== "" ? `(${unidade})`:""}</th>
                        <th className=" border-b-2 border-r-2 border-zinc-400 px-5 py-2 text-end">Ação</th>
                    </tr>
                </thead>
                <tbody className="border-2 border-zinc-300">
                {planoManutencao?.map((registro, i:number) => <tr key={i}>
                <td className={`border-l-2 border-zinc-200 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.descricao}</td>
                <td className={`border-l-2 border-zinc-200 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.intervalo}</td>
                <td className={`border-l-2 border-zinc-200 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'} text-end`}>
                    <button onClick={e => setPlanoMan(planoManutencao.filter(filt => {
                        return filt.id != registro.id}))}><IconX/></button></td>
                </tr>
                )}
                </tbody>
                    </table>
                </div>
                
                <button className="col-span-full p-2 border-2 mb-1 mt-3 bg-red-800 hover:bg-red-900 text-white font-bold w-full"
            onClick={e => addMaquina({
                manutencoes: [],
                nome: equipamento,
                modelo: modelo,
                origem: "Alugado",
                imagem: "https://source.unsplash.com/featured/300x300?backhoe",
                aluguelInfo: aluguelInfo? aluguelInfo : undefined,
                planoManutencao: planoManutencao.map((plano) => {
                    return {descricao: plano.descricao, intervalo: plano.intervalo}
                }),
                alimentacao: alimentacao,
                contador: contador,
                contadorInicial: contador,
                categoria: categoria,
                unidade: unidade,
                tipo: tipoSelect,
                
        })}>Adicionar máquina</button>
        
        </div>

        
        </div>
       
    )
}