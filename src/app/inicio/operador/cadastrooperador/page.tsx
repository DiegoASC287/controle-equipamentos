'use client'
import { cpfMask } from '@/app/functions/cpfMask';
import { useEffect, useState } from 'react'
import Maquina from '@/model/Maquina';
import MaquinaPlanoMan from '@/model/MaquinaPlanoMan';
import Image from "next/image";
import { IconCheck, IconClock, IconError404, IconSquareCheck, IconX } from '@tabler/icons-react';
import MaquinaPesadaInterf from '@/model/MaqPesada';
import AluguelInfoProps from '@/model/AluguelInfo';
import link from '@/app/pathspers';
import Uploader from '@/components/Uploader';
import {tipo} from '@/app/constants/constantes';
import Uploader_linha from '@/components/Uploader_linha';
import Calendario from '@/components/Calendario';
import CertificacoesOperadorProps from '@/model/CertificacoesOperadorProps';
import OperadorProps from '@/model/OperadorProps';

interface PageDetailProps {
    params: { id: string }
}

interface linhaTemplate {
    id: number
    tipo_veiculo: string
    manutencao: string
    intervalo: number
}

interface StatusAddProps {
    status: "ok" | "erro" | "carregando" | "pronto",
    msg?: string
}



export default function PaginaCadastroOperador({
    params,
}: PageDetailProps) {

    const [imagemOp, setImagem] = useState<string | null>()
    const [nomeInput, setNome] = useState<string>("")
    const [sobrenomeInput, setSobrenome] = useState<string>("")
    const [cpfInput, setCpf] = useState<string>("")
    const [idadeInput, setIdade] = useState<number>(0)
    const [tipoSelect, setTipo] = useState<string>()
    const [statusCertTemp, setStatusCertTemp] = useState<string>("Pendente")
    const [imgCertTemp, setImgTempCert] = useState<{ image: string | null, }>({ image: null })
    const [listaCertificacoes, setListaCertificacoes] = useState<CertificacoesOperadorProps[]>([])
    const [dataCertTemp, setDataCertTemp] = useState<Date>(new Date)
    const [numCertTemp, setNumCertTemp] = useState<string | undefined>(undefined)
    const [fileTemp, setFileTempCert] = useState<File | null>()

    const [maquinaAdicionada, setMaquinaAdicionada] = useState<Maquina>()
    const formato = new Intl.DateTimeFormat("pt-BR", {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })

    async function uploadFoto(certificado: CertificacoesOperadorProps, cpf: string) {
        fetch('/api/maquinas/cadastroimg', {
            method: 'POST',
            headers: { 'content-type': certificado.file?.type || 'application/octet-stream' },
            body: certificado.file
        }).then(async (res) => res.json()).then(({url}) => {
            const certificadoCurrent = {...certificado, url_certificado: url, operadorId: cpf} 
            fetch('/api/cadastrocertificado', {
                method: 'POST',
                body: JSON.stringify(certificadoCurrent)
            }).then(res => res.json()).then(resposta => { alert("Adicionado com sucesso")})
            
            
        })
    }

    function atImg(imagem: any) {
        const { url } = imagem
        setImagem(url)
    }

    function atImgCert(imagem: { image: string | null, }, file: File | null) {
        setImgTempCert(imagem)
        setFileTempCert(file)
        
    }

    useEffect(() => {
    }, [listaCertificacoes])

    function adicionarAListaCert(){
        const erros = []
        if(!dataCertTemp){
            erros.push("Falta preencher a data de vencimento do certificado!")
        }
        if(!numCertTemp){
            erros.push("Falta preencher o número do certificado!")
        }
        if(!tipoSelect || tipoSelect?.trim() === ""){
            erros.push("Falta preencher o tipo da máquina!")
        }
        if(!fileTemp || !imgCertTemp){
            erros.push("Falta selecionar a foto do certificado!")
        }if (listaCertificacoes.filter(e => e.numero_certificado === numCertTemp)?.length > 0){
            erros.push("Já existe um certificado com esse número")
        }
        if (listaCertificacoes.filter(e => e.tipo_maquina === tipoSelect)?.length > 0){
            erros.push("Já existe um certificado para este tipo de máquina")
        }

        if(erros.length === 0){
            if(fileTemp && imgCertTemp){
                setListaCertificacoes([... listaCertificacoes, {
                    data_vencimento: dataCertTemp,
                    numero_certificado: numCertTemp,
                    tipo_maquina: tipoSelect, 
                    url_certificado: fileTemp.name,
                    file: fileTemp,
                    img: {...imgCertTemp},
                    status: "Pendente",
                    aprovado_por: ""
                    }])
            }
            
        }else{
            if(erros.length >0){
                alert(`${erros.reduce((anterior, proximo) => `${anterior + proximo}\n`, 'Erros:\n')}`)

            }else{
                alert('Falta selecionar a foto')
            }
        }
    }

    function addOperador(op: OperadorProps) {

        const errosOp =[]

        if (!op.cpf || op.cpf.trim() === ""){
            errosOp.push("CPF em branco!")
        }

        if (!op.nome || op.nome.trim() ===""){
            errosOp.push("Nome do operador em branco!")
        }
        if (!op.sobrenome || op.sobrenome.trim() ===""){
            errosOp.push("Sobrenome do operador em branco!")
        }
        if (!op.idade || op.idade === 0){
            errosOp.push("Insira a idade do operador!")
        }
        
        console.log(errosOp)
        if(errosOp.length === 0 ){

            fetch(`${link}/api/operadorcadastro?cpf=${op.cpf}`, {
                method: 'GET',
            }).then(resp => resp.json()).then(result => {
                if(result){
                    alert("Já existe um usuário com esse email")
                }else{
                    fetch(`${link}/api/operadorcadastro`, {
                        method: 'POST',
                        body: JSON.stringify({ ...op })
                    }).then(resp => resp.json()).then(result => {
                        listaCertificacoes.map(async (e) => {
                            await uploadFoto(e, op.cpf)})
                    })
    
                }
            })
            
        }else{
            alert(errosOp.reduce((antes, depois) => `${antes+depois}\n`, "Erros: \n"))
        }

        }
    

    function renderizarIconeStatus(status:string){
        switch(status){
            case "Pendente":{
                return <IconClock/>
            }case "Verificado": {
                return <IconCheck color='green'/>
            }case "Indeferido":{
                <IconError404/>
            }
        }
    }

    return (

        <div className='flex w-full mt-5 justify-center'>
            <div className='grid md:grid-cols-3 flex-wrap gap-3 bg-zinc-50 shadow-lg shadow-zinc-400 p-3 rounded-lg'>
                <div className="h-[250px] w-[250px] border-zinc-300 border-2 flex justify-center items-center">
                    {imagemOp ? (
                        <Image src={imagemOp} width={250} height={250} alt="Imagem" />
                    ) : (
                        <Uploader atualizarImg={atImg} />
                    )

                    }
                </div>

                <div className="bg-zinc-50 w-full px-2 col-span-1 md:col-span-2">
                    <div className="w-full  mt-2 rounded-md flex flex-col">
                        <input className="p-1 border-2 mb-1" type="text" placeholder="Nome"
                            value={nomeInput}
                            onChange={e => setNome(e.target.value)} />
                        <input className="p-1 border-2 mb-1" type="text" placeholder="Sobrenome"
                            value={sobrenomeInput}
                            onChange={e => setSobrenome(e.target.value)} />
                        <div className='flex items-center'>
                            <label className='w-1/2'>Idade</label>
                            <input className="px-2 w-1/2 border-2 mb-1" type="number"
                                value={idadeInput}
                                onChange={e => setIdade(+e.target.value)} />
                        </div>
                        <div className='flex items-center'>
                            <label className='w-1/2'>CPF</label>
                            <input className="px-2 w-1/2 border-2 mb-1" type="text"
                                value={cpfInput}
                                onChange={e => setCpf(cpfMask(e.target.value))} />
                        </div>
                    </div>
                </div>
                
                <div>

                </div>
                <div className=' max-h-96 overflow-y-auto col-span-full'>
                    <div className="flex flex-grow items-center justify-center bg-gray-400 mt-1 py-1 font-bold">
                        Certificações de habilitação</div>
                        <div className='min-h-[400px]'>

                        
                    <table className='w-full'>

                        <thead className="">
                            <tr className="bg-zinc-300 ">
                                <th className="  border-b-2 border-zinc-400 border-l-2  px-5 py-2 text-start text-sm">
                                    Tipo de máquina</th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-start text-sm">Nº certificado</th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-end text-sm">Foto do certificado</th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-end text-sm">Data de vencimento</th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-end text-sm">Status</th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-end text-sm border-r-2">Aprovado</th>
                            </tr>
                            <tr className="bg-zinc-100 ">
                                <th className="  border-b-2 border-zinc-400 border-l-2  px-5 py-2 text-start text-sm">
                                    <div className='flex items-center'>
                                        <select className=" p-1 border-2 "
                                            value={tipoSelect} onChange={e => setTipo(e.target.value)}>
                                            {tipo.map((e, i) => <option key={i}>{e}</option>)}
                                        </select>
                                    </div></th>
                                <th className=" border-b-2  border-zinc-400 px-5 py-2 text-start text-sm"><input
                                 className=" border-zinc-300 border-2 p-1" type="text" placeholder="Nº do certificado"
                                    value={numCertTemp}
                                    onChange={e => setNumCertTemp(e.target.value)} /></th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-end text-sm"><Uploader_linha atualizarImg={atImgCert} /></th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-end text-sm">
                                    <Calendario value={dataCertTemp} id='1' legenda='' onChange={setDataCertTemp} /></th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-end text-sm"></th>
                                <th className=" border-b-2 border-zinc-400 px-5 py-2 text-end text-sm border-r-2"><button
                                onClick={e => adicionarAListaCert()}
                                className='flex items-center gap-1'>
                                    <IconSquareCheck className='pt-1' color='green' size={30}/>Finalizar</button></th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-zinc-300">
                            {listaCertificacoes?.map((registro, i: number) => <tr key={i}>
                                <td className={`border-l-2 border-zinc-200 px-5 text-sm
                                 ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>
                                    {registro.tipo_maquina}</td>
                                <td className={`border-l-2 border-zinc-200 px-5 text-sm  
                                ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>
                                    {registro.numero_certificado}</td>
                                <td className={`border-l-2 border-zinc-200 px-5 text-sm text-center 
                                ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>
                                    {registro.file? <div>Foto selecionada</div>: <div>Foto não selecionada</div>}</td>
                                <td className={`border-l-2 border-zinc-200 px-5 text-sm  
                                ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>
                                    {formato.format(new Date(`${registro.data_vencimento}`))}</td>
                                
                                <td className={`border-l-2 border-zinc-200 px-5 text-sm  
                                ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>
                                    {renderizarIconeStatus(statusCertTemp)}</td>
                                <td className={`border-l-2 border-zinc-200 px-5 text-sm  
                                ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>
                                    Pendente</td>
                                
                            </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
                <button
                    className="col-span-full p-2 border-2 mb-1 mt-3 bg-red-800 hover:bg-red-900 text-white font-bold w-full"
                    onClick={e => addOperador({
                        cpf: cpfInput,
                        idade:idadeInput,
                        nome: nomeInput,
                        imagem_url: imagemOp? imagemOp:"/",
                        sobrenome: sobrenomeInput,
                         })}>Cadastrar operador</button>

            </div>


        </div>

    )
}