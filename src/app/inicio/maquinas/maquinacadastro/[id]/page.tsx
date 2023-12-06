'use client'
import {put} from '@vercel/blob'
import {useEffect, useState} from 'react'
import AddAlugado from '@/components/AddAlugado';
import Maquina from '@/model/Maquina';
import MaquinaPlanoMan from '@/model/MaquinaPlanoMan';
import Image from "next/image";
import InputManutencao from '@/components/InputManutencao';
import { IconX } from '@tabler/icons-react';
import MaquinaPesadaInterf from '@/model/MaqPesada';
import MaquinaPesada from '@/components/tipos/MaqPesada';
import AluguelInfoProps from '@/model/AluguelInfo';
import link from '@/app/pathspers';
import Uploader from '@/components/Uploader';

interface PageDetailProps{
    params: {id:string}
}

interface linhaTemplate {
    id: number
    tipo_veiculo: string
    manutencao: string
    intervalo: number
}

interface StatusAddProps{
    status: "ok" | "erro" | "carregando" | "pronto",
    msg?: string
}


const alimentacaoLista = ["", "Diesel", "Gasolina", "Elétrico", "Manual", "Etanol", "Gás"]

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
    const [maquinaPesada, setMaquinaPesada] = useState<MaquinaPesadaInterf>()
    const [statusAdd, setStatusAdd] = useState<StatusAddProps>({status: 'pronto'})

    const [maquinaAdicionada, setMaquinaAdicionada] = useState<Maquina>()

    const un = ["Unidade", "mês", 'h', 'km']
    const tipo = ['','Escavadeira hidráulica', "Mini escavadeira", 'Caminhão Munck', 'Caminhão Pipa', 'Pá carregadeira',"Motoniveladora", 'Outro']
    const categorias = ["", "Pesada", "Leve", "Equipamento eletrônico"]

    function atImg(imagem: any){
        const {url} = imagem
        setImagem(url)
    }

    function renderizarAviso(){
        switch(statusAdd.status){
            case 'pronto': {
                return null
            }case 'carregando':{
                return <div className='bg-zinc-200'>Adicionando máquina...</div>
            }case 'erro': {
                return <div className='bg-red-400'>Erro, não conseguimos adicionar esta máquina!</div>
            }case 'ok': {
                return <div className='bg-red-400'>Máquina adicionada com sucesso!</div>
            }
        }
    }

    useEffect(() => {
        fetch(`${link}/api/maquinas/consultatemplateman?tipo_veiculo=${tipoSelect}&unidade=${unidade}`, {
            method: 'GET',
        }).then(resp => resp.json()).then(resultado => {
            planoManTemp(resultado)})
    }, [tipoSelect, unidade])

    function atualizarMaquinaPesada(maqPesada: MaquinaPesadaInterf){
        setMaquinaPesada(maqPesada)
    }

    function carregarImagem(path:string){

    }

    function planoManTemp(lista: linhaTemplate[]){
        setPlanoMan(lista.map(e => {
            return {id:e.id, intervalo: e.intervalo, descricao: e.manutencao}}))
    }


    function addMaquina(maq: Maquina){
        const maqCaminhao = {...maq, maqPesada:maquinaPesada}
        switch (maq?.categoria){
            case "Pesada": {
                fetch(`${link}/api/maquinas/cadastro`, {
                    method: 'POST',
                    body: JSON.stringify({...maqCaminhao})
                }).then(resp => resp.json()).then(result => {
                    setMaquinaAdicionada(result)
                    alert("Máquina adicionada com sucesso!")})
            
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
        switch (categoria){
            case 'Pesada':{
                return <MaquinaPesada onChange={atualizarMaquinaPesada}/>
            } 
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
                ):(
                   <Uploader atualizarImg={atImg}/>
                )
                
                }
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
            <label className='w-1/2'>Tipo de alimentação</label>
            <select className="px-1 border-2 mb-1 w-1/2"
                value={alimentacao} onChange={e => setAlimentacao(e.target.value)}>
                {alimentacaoLista.map((e, i) => <option key={i}>{e}</option>)}
            </select>
            </div>
            
            
            
            </div>
        </div>
        <div className='flex flex-col'>
        <div className='bg-zinc-50 flex gap-5'>
                    <div className='text-sm text-zinc-400 '>Origem</div>
                    <select className='pl-2 text-zinc-800 bg-zinc-50 w-full' value={selecionarOrigem} 
                    onChange={e => setSelOrigem(e.target.value)}>
                        <option className='text-right'>Próprio</option>
                        <option className='text-right'>Alugado</option>
                    </select>
                    </div>
                    {selecionarOrigem === "Alugado"?<AddAlugado onChange={atualizarDadosAluguel} 
                    value={aluguelInfo}/>:<div>Próprio</div>}
                    
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
                    onClick={e => (manutencao?.trim() === "" || intervalo <= 0 ? alert("Falta preencher campos obrigatórios")
                     : adicionarManutencao({
                        descricao: manutencao, intervalo: intervalo, id: (Math.random()*1000).toFixed(0)}))
                         }>
                            Adicionar manutenção</button>
                            
                </div>
            </div>
        </div>
        <div className=' max-h-96 overflow-y-auto col-span-2'>
        <div className="flex flex-grow items-center justify-center bg-gray-400 mt-1 py-1 font-bold">
            Plano de manutenções</div>
        <table className='w-full'>
                
                    <thead className="">
                    <tr className="bg-zinc-300 ">
                        <th className="  border-b-2 border-zinc-400 border-l-2 border-r-2 px-5 py-2 text-start text-sm">
                            Manutenção</th>
                        <th className=" border-b-2 border-r-2 border-zinc-400 px-5 py-2 text-start text-sm">Intervalo 
                        {unidade !== "" ? `(${unidade})`:""}</th>
                        <th className=" border-b-2 border-r-2 border-zinc-400 px-5 py-2 text-end text-sm">Ação</th>
                    </tr>
                </thead>
                <tbody className="border-2 border-zinc-300">
                {planoManutencao?.map((registro, i:number) => <tr key={i}>
                <td className={`border-l-2 border-zinc-200 px-5 text-sm ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>
                    {registro.descricao}</td>
                <td className={`border-l-2 border-zinc-200 px-5 text-sm  ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>
                    {registro.intervalo}</td>
                <td className={`border-l-2 border-zinc-200 px-5 text-sm ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'} text-end`}>
                    <button onClick={e => setPlanoMan(planoManutencao.filter(filt => {
                        return filt.id != registro.id}))}><IconX/></button></td>
                </tr>
                )}
                </tbody>
                    </table>
                </div>
                <div>{renderizarAviso()}</div>
                <button 
                className="col-span-full p-2 border-2 mb-1 mt-3 bg-red-800 hover:bg-red-900 text-white font-bold w-full"
            onClick={e => addMaquina({
                manutencoes: [],
                nome: equipamento,
                modelo: modelo,
                origem: "Alugado",
                imagem: imagem ? imagem : null,
                aluguelInfo: aluguelInfo? aluguelInfo : undefined,
                planoManutencao: planoManutencao.map((plano) => {
                    return {descricao: plano.descricao, intervalo: plano.intervalo}
                }),
                alimentacao: alimentacao,
                contador: contador,
                contadorInicial: contador,
                categoria: categoria,
                unidade: unidade,
                
        })}>Adicionar máquina</button>
        
        </div>

        
        </div>
       
    )
}