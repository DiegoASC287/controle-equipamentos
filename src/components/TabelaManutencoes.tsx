'use client'
import Maquina from "@/model/Maquina"
import link from "@/app/pathspers"
import { useEffect, useState } from "react"
import MaquinaPlanoMan from "@/model/MaquinaPlanoMan"
import { tiposManutencao } from "@/app/constants/constantes"
import Calendario from "./Calendario"
import Uploader_pdf_img from "./Uploader_pdf_img"
import {IconCircleXFilled, IconSquareCheckFilled, IconX} from "@tabler/icons-react"
import RegistroManutencaoProps from "@/model/RegistroManutencao"
import Link from "next/link"
import { CircularProgress } from "@nextui-org/react"

interface TabelaManutencoesProps {
    id: string | undefined
}
interface StatusAddProps {
    status: "ok" | "erro" | "carregando" | "pronto",
    msg?: string
}

export default function TabelaManutencoes(props: TabelaManutencoesProps) {
    const [maquina, setMaquina] = useState<Maquina>()
    const [selectDescricao, setSelectDescricao] = useState<string>("")
    const [selectTipo, setSelectTipo] = useState<string>("Verificação")
    const [selectMomento, setSelectMomento] = useState<number>(0)
    const [listaDescricoes, setListaDescricoes] = useState<string[]>() 
    const [dataManutencao, setDataManutencao] = useState<Date>(new Date())
    const [custoManutencao, setCustoManutencao] = useState<number>(0)
    const [file, setFile] = useState<File | null>(null)
    const [arquivoUrl, setArquivoUrl] = useState<{image: string | null}>()
    const [listaMan, setListaManLocal] = useState<RegistroManutencaoProps[]>([])
    const [lista, setLista] = useState<RegistroManutencaoProps[]>()
    const [statusAdd, setStatusAdd] = useState<StatusAddProps>({ status: 'pronto' })
    const [desativarBotaoX, setDesBX] = useState<boolean>(false)
    const [disAddLinha, setDisAddLinha] = useState<boolean>(false)

    useEffect(() => {
        fetch(`${link}/api/maquinas/consultamanutencoes?id=${props.id}`, {
            cache: 'no-store'
        })
            .then(item => item.json()).then(maq => {setMaquina(maq)
                setListaManLocal(valor => [...maq.manutencoes])
                const array:string[] = Array.from(new Set(maq?.planoManutencao?.map((e:MaquinaPlanoMan, i:number) => e.descricao.trim())))
                array.unshift("")
                setListaDescricoes(array)
            })
    
            }, [])

    useEffect(() => {

            setTimeout(()=>setStatusAdd({status: 'pronto'}), 20000)
        
    }, [statusAdd])
    
    function renderizarMomento(){
        switch (maquina?.unidade){
            case "h": return "Horímetro";
            case "km": return "Odômetro";
            case 'mês': return "mês"
        }
    }

    function removerLinha(linha: RegistroManutencaoProps){
        setDesBX(true)
        fetch('/api/maquinas/cadastroimg', {
            method: 'DELETE',
            body: JSON.stringify(linha)
        }).then(res => res.json()).then(resposta => {
            fetch('/api/maquinas/consultamanutencoes', {
                method: 'DELETE',
                body: JSON.stringify(linha)
            }).then(res => res.json()).then(p => {
                setListaManLocal(p)
                setDesBX(false)
            }) 
        })
    }

    async function adicionarLinha(linha: RegistroManutencaoProps){
        setDisAddLinha(true)
        const erros = []
        if(!selectDescricao || selectDescricao===""){
            erros.push("Falta selecionar ou escrever a descrição do serviço!")
        }
        if(!file){
            erros.push("Falta selecionar a nota fiscal!")
        }

        if(erros.length === 0){
            setStatusAdd({status: "carregando", msg: "Carregando..."})

            if(file){
            fetch('/api/maquinas/cadastroimg', {
                method: 'POST',
                headers: { 'content-type': linha.nfFile?.type || 'application/octet-stream' },
                body: linha.nfFile
            }).then(async (res) => res.json()).then(({ url }) => {
                fetch('/api/maquinas/consultamanutencoes', {
                    method: 'POST',
                    body: JSON.stringify({
                        tipo: linha.tipo,
                        descricao: linha.descricao,
                        momento: linha.momento,
                        dataRealizacao: linha.dataRealizacao,
                        nfManutencao: url,
                        custo: linha.custo,
                        maquinaId: maquina?.id
                    } as RegistroManutencaoProps)
                }).then(res => res.json()).then((resposta: RegistroManutencaoProps) => {
                    setListaManLocal(valor => [...valor, resposta]
                        )
                    setStatusAdd({status: "ok", msg: "Adicionado com sucesso!"})
                    setDisAddLinha(false)
            })
            })
        }
        }else{
            alert(erros.reduce((anterior, proximo) => `${anterior + proximo} \n`, "Erros \n"))
        }
        

    }

    function renderizarDescricaoMan(){
        switch(selectTipo){
            case "Preventiva": {
                return (<select className=" w-full h-full py-2"
                    value={selectDescricao} onChange={e => setSelectDescricao(e.target.value)}>
                        <option value="">Nenhuma</option>
                    {maquina?.planoManutencao?.filter(a => a.tipo === "Preventiva").map((e, i) => <option key={e.id}>{e.descricao}</option> )}
                </select>
                )}
            case "Corretiva": {
                return (<input type="text" className=" w-full h-full p-2 " value={selectDescricao} 
                onChange={e => setSelectDescricao(e.target.value)}/>)}
            case "Verificação": {
                return (<select className=" w-full h-full py-2"
                    value={selectDescricao} onChange={e => setSelectDescricao(e.target.value)}>
                        <option value="">Nenhuma</option>
                    {maquina?.planoManutencao?.filter(a => a.tipo === "Verificação").map((e, i) => <option key={e.id}>{e.descricao}</option> )}
                </select>
                )}
            default: return <div>Nenhum</div>
        }
    }
    function atualizarArquivo(imagem: {image: string | null}, file: File | null){
        setFile(file)
        setArquivoUrl(imagem)
    }

    function renderizarStatus(){
        switch (statusAdd.status){
            case "ok": return <div className="w-full p-1 bg-green-300">{statusAdd.msg}</div>
            case "erro": return <div className="w-full p-1 bg-red-400">{statusAdd.msg}</div>
            case "carregando": return <div className="w-full p-2 bg-zinc-400">{statusAdd.msg}</div>
            default: return null
        }
    }



    function renderizarTabela(){
        return  (
            listaMan?.map((registro: any, i: number) => <tr key={i}>
                        <td className={`border-l-2 min-w-120px border-zinc-300 px-5 py-2 ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>{registro.tipo}</td>
                        <td className={`border-l-2 min-w-120px border-zinc-300 px-5 py-2 ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>{registro.descricao}</td>
                        <td className={`border-l-2 min-w-120px border-zinc-300 px-5 py-2 ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>{registro.momento}</td>
                        <td className={`border-l-2 min-w-150px border-zinc-300 px-5 py-2 ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>{new Date(Date.parse(`${registro.dataRealizacao}`)).toLocaleDateString("pt-br",
                            { day: 'numeric', month: '2-digit', year: 'numeric' })}</td>
                        <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>{`R$ ${registro.custo.toFixed(2)}`.replace(",", ".")}</td>
                        <td className={`border-l-2 text-blue-700 hover:text-blue-500 border-zinc-300 px-5 py-2 ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}><Link href={registro.nfManutencao}>Baixar NF</Link></td>
                        <td className={`border-l-2 text-blue-700 hover:text-blue-500 border-zinc-300 px-5 py-2 ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}>
                            <div className="w-full h-full flex justify-end">

                            <button disabled={desativarBotaoX} onClick={e => removerLinha(registro)}><IconCircleXFilled className="text-red-500" size={25}/></button>
                            </div>
                            </td>
                    </tr>
                    )
        )
    }
    return (
        <div className="max-h-[400px] min-h-[380px] overflow-y-auto">
             {renderizarStatus()}
             <div className=" w-full p-1 bg-zinc-300 font-bold flex justify-center items-center border-l-2 border-r-2 border-t-2 border-black">Tabela de manutenções</div>
        
        <table className="border-collapse w-full max-h-[300px]">
            <thead>
                <tr className="bg-gray-300">
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Tipo</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start max-w-[150px]">Descrição</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start max-w-[100px]">{renderizarMomento()}</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start max-w-[140px]">Data de realização</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Custo (R$)</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start min-w-[100px]">NF</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-end">Ação</th>
                </tr>
                
                <tr className="bg-gray-300">
                <th className="border-2 border-zinc-700 text-start max-w-[150px]">
                <select className=" w-full h-full py-2"
                                value={selectTipo} onChange={e => setSelectTipo(e.target.value)}>
                                {tiposManutencao?.map((e, i) => <option key={i}>{e}</option> )}
                            </select>
                </th>
                    <th className="border-2 border-zinc-700 text-start max-w-[150px]">{
                        renderizarDescricaoMan()
                    }</th>
                    <th className="border-2 border-zinc-700 text-start max-w-[100px]">
                        <input type="number" className=" w-full h-full p-2 " value={selectMomento} 
                        onChange={e => setSelectMomento(+e.target.value)}  /></th>
                    <th className="border-2 border-zinc-700 px-2 max-w-[100px] bg-white">
                        <Calendario className="max-w-[100px]" id="" legenda="" onChange={setDataManutencao} 
                        value={dataManutencao}/>
                    </th>
                    <th className="border-2 border-zinc-700 text-start max-w-[100px] bg-white">
                    <input type="number" className=" w-full h-full p-2 " value={custoManutencao} 
                    onChange={e => setCustoManutencao(+e.target.value)}/>
                    </th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start max-w-[100px] bg-white relative">
                        <Uploader_pdf_img className="w-[100px]" atualizarImg={atualizarArquivo}/>
                    </th>
                    <th className="border-2 border-zinc-700 max-w-[150px] text-end align-text-center bg-white">
                        <div className="w-full h-full flex justify-end pr-5 gap-2">
                       
                        <button disabled={disAddLinha} onClick={e => adicionarLinha({tipo: selectTipo,
                             descricao: selectDescricao,
                              momento: selectMomento, dataRealizacao: dataManutencao, custo: custoManutencao,
                              nfFile: file, nfImg: arquivoUrl})}>
                        <IconSquareCheckFilled className="text-green-600 hover:text-green-400" size={30}/>
                        </button>
                        
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className="border-2 border-zinc-300">
                {renderizarTabela()}
            </tbody>
        </table>
        </div>
    )
}