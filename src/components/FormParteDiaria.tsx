'use client'
import FormatoInterferencia from "@/model/FormatoInterferencia"
import ModeloItemEapApelido from "@/model/ModeloItemEAPApelido"
import { useEffect, useState } from "react"
import Calendario from "./Calendario"
import LinhaTabPartDiaria from "@/model/LinhaTabPartDiaria"
import { IconArrowBigRight, IconX } from "@tabler/icons-react"
import { Apontador, Maquina } from "@prisma/client"
import DropEapApelido from "./DropEapApelido"
import link from "@/app/pathspers"

interface FormParteDiariaProps {
adicionarLinha: (linhaTab: LinhaTabPartDiaria) => void
idMaquina: number
}



export default function FormParteDiaria(props: FormParteDiariaProps){
    const [maquina, setMaquina] = useState<Maquina>()
    const [apontadores, setApontadores] = useState<Apontador[]>()
    const [apontador, setApontador] = useState<string>("")
    const [descricaoServ, setDescricao] = useState<string>('')
    const [dataInicialTrabalho, setDataInicialTrabalho] = useState(new Date()) 
    const [dataFinalTrabalho, setDataFinalTrabalho] = useState(new Date()) 
    const [dataInicialInterf, setDataInicialInterf] = useState(new Date()) 
    const [dataFinalInterf, setDataFinalInterf] = useState(new Date()) 
    const [motivoInterf, setMotivoInterf] = useState<string>('')
    const [operador, setOperador] = useState<string>('')
    const [listaInterfs, setListaInterfs] = useState<FormatoInterferencia[]>([])
    const [selecao, setSelecao] = useState<string>()
    const [horimetroInicial, setHorimetroInicial] = useState<number>()
    const [horimetroFinal, setHorimetroFinal] = useState<number>()
    const [eap, setEap] = useState<ModeloItemEapApelido[]>()
    const [selectItemEap, setSelectItemEap] = useState<ModeloItemEapApelido>()
    const [total_combustivel, setVolAbastecido] = useState<Number>(0)
    const [contadorAbastecimento, setContadorAbastecimento] = useState<Number>(0)

    const motivosLista =["","ALMOÇO", "ABASTECIMENTO","DESCLOCAMENTO", "MANUTENÇÃO",
    "CHUVA", "FALTA DE FRENTE", "OUTROS"]

    function alterarSelect(e: any){
        setSelecao(e.target.value)
        e.target.value !== "OUTROS" ? setMotivoInterf(e.target.value) : setMotivoInterf("")
    }

    const formatoHora = new Intl.DateTimeFormat("pt-BR", {
        hour: "numeric",
        minute: "numeric",
      })
      function addAtividade(atividade: LinhaTabPartDiaria){
        fetch(`${link}/api/maquinas/addatividade?id=${props.idMaquina}`, {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({...atividade})
        }).then(resp => resp.json()).then(result => console.log(result))

        if(horimetroFinal && maquina?.contador){
        
            if (horimetroFinal >= maquina.contador){
                fetch(`${link}/api/maquinas/updatecontador`, {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({idMaquina: maquina.id,
                contador: horimetroFinal})
        })
            }
        }

    }

    function selecionarItemEap(item: ModeloItemEapApelido){
        setSelectItemEap(item)
    }

    useEffect(() => {
        buscarApontadores()
        buscarInfosMaquina()
    }, [])

    function buscarApontadores(){
        fetch(`${link}/api/apontadores`, {
            method: 'GET',
            cache: 'no-store',
        }).then(resp => resp.json()).then(result => {
            setApontadores(result)})
    }

    function buscarInfosMaquina(){

            fetch(`${link}/api/maquinas/consultaapenasmaquina?id=${props.idMaquina}`, {
                cache: 'no-store'
            })
            .then(item => item.json()).then(maq => {
                setMaquina(maq)
        })
    }
    

    useEffect(() => {
        maquina?.contador? (
            setHorimetroInicial(maquina?.contador)
        ) : (null)
        maquina?.contador? (
            setHorimetroFinal(maquina?.contador)
        ) : (null)
    }, [maquina])

    function adicionarInterfAlista(){
        if (motivoInterf === "ABASTECIMENTO"){
            if(total_combustivel !==0 && contadorAbastecimento !== 0){

                setListaInterfs(valor => [{total_combustivel:total_combustivel, contador: contadorAbastecimento ,hora_inicial:dataInicialInterf,
                    hora_final: dataFinalInterf, motivo: motivoInterf, id: (Math.random()*1000).toFixed(0)}, ...valor])
                }else{
                    alert(`Preencha os campos Val abastecido e ${maquina?.unidade === "h" ? 'horímetro': 'odômetro'}`)
                }
            }else{
                setListaInterfs(valor => [{hora_inicial:dataInicialInterf,
                    hora_final: dataFinalInterf, motivo: motivoInterf, id: (Math.random()*1000).toFixed(0)}, ...valor])
            }
    }

    function tratarEntrada(){

        const erros: string[] = []
        descricaoServ?.trim() === "" ? erros.push("Descrição em branco"):null;
        apontador?.trim() === "" ? erros.push("Selecione um apontador"):null;
        selectItemEap?.apelido.trim() === "" ? erros.push("Selecione um item da EAP"):null;

        motivoInterf?.trim() === "" ? erros.push("Motivo de interferência em branco"):null;

        operador?.trim() === "" ? erros.push("Digite o nome do operador"):null;

        dataFinalTrabalho <= dataInicialTrabalho ? 
        erros.push("Data final de trabalho menor ou igual à data inicial") : null;

        dataFinalInterf <= dataInicialInterf ? 
        erros.push("Data final de interferência menor ou igual à data inicial") : null;

        (horimetroFinal && horimetroInicial? horimetroFinal <= horimetroInicial : false) ? 
        erros.push("Horímetro final menor ou igual à data inicial") : null;

        (dataInicialInterf < dataInicialTrabalho) ? 
        erros.push("Hora inicial de interferência menor que hora inicial de trabalho") : null;
        (dataFinalInterf > dataFinalTrabalho) ? 
        erros.push("Hora final de interferência maior que hora final de trabalho") : null;
        (dataFinalInterf < dataInicialTrabalho) ? 
        erros.push("Hora final de interferência menor que hora inicial de trabalho") : null;
        (dataInicialInterf > dataFinalTrabalho) ? 
        erros.push("Hora inicial de interferência maior que hora final de trabalho") : null;

        const filtro = listaInterfs.filter(e => e.motivo === "ABASTECIMENTO");
        (filtro.length > 0 && total_combustivel ===0 ? erros.push("Preencha o total de combustível abastecido!") : null);
        (filtro.length > 0 && contadorAbastecimento ===0 ? erros.
            push(`Preencha o ${maquina?.unidade === "h" ? "horímetro": "odômetro"}`): null);
        

        if (erros.length == 0){
            const ativi = {
                idMaquina: props.idMaquina,
                dataFinalInterf: dataFinalInterf,
                data_final_trabalho: dataFinalTrabalho,
                dataInicialInterf: dataInicialInterf,
                data_inicial_trabalho: dataInicialTrabalho,
                descricao_serv: descricaoServ,
                motivoInterf: motivoInterf,
                operador: operador,
                interferencias: listaInterfs.map((e:FormatoInterferencia)=> ({hora_inicial: e.hora_inicial,
                     hora_final: e.hora_final, motivo: e.motivo,
                     contador: e.contador, total_combustivel: e.total_combustivel})),
                registroNovo: true,
                horimetroFinal: horimetroFinal,
                horimetroInicial: horimetroInicial,
                apontadorId: Number(apontador.split("-")[0]),
                eapId: selectItemEap?.itemEap.trim(),

            }
            addAtividade(ativi)
            

            
        }else{
            alert(erros.reduce((resultado, proximo) => {
                return (`${resultado}\n${proximo}`)
            }, ""))
        }
    }

    return (
        <div className="grid grid-cols-3 gap-5 m-2">
            <div className="flex flex-col col-span-full gap-5 items-start">
            <div className="flex gap-4 flex-grow w-full">
            <div className="flex flex-col">
            <label className="w-full bg-zinc-100" >Ítem da EAP</label>
            <DropEapApelido selecionar={selecionarItemEap} dimTexto={50} maquinaId={props.idMaquina}/>
            </div>

            <div className="flex flex-col">
            <label className="w-full bg-zinc-100 flex-grow" >Descrição da atividade</label>
            <input type="text" placeholder="Digite a descrição" className="pl-2 bg-zinc-100 border-b-2 border-zinc-300 flex-grow " value={descricaoServ}
            onChange={e => setDescricao(e.target.value)}/>
            </div>      
            </div>
            <div className="flex gap-4">

            <label className="w-full bg-zinc-100" >Apontador responsável</label>
            <select name="motivo" id="motivo" value={apontador} onChange={e => setApontador(e.target.value)}>
                <option></option>
                {apontadores?.map((apontador) => <option key={apontador.id}>{`${apontador.id} - ${apontador.nome}`}</option>)}
            </select>
            </div>
            </div>
            <div className="flex flex-col border-r-2 border-zinc-300 pr-3">
            <div className="font-semibold">Registro de atividade</div>
            <div className="flex justify-between gap-2">
            <Calendario onChange={setDataInicialTrabalho} value={dataInicialTrabalho} 
            id="dataInicial"
            legenda="Data e hora inicial"/>
            <Calendario onChange={setDataFinalTrabalho} value={dataFinalTrabalho} 
            id="dataInicial"
            legenda="Data e hora final"/>
            </div>
            <label className="text-sm w-full bg-zinc-100 mt-1" >Operador do equipamento</label>
            <input type="text" placeholder="Nome do operador da máquina" 
            className="pl-2 bg-zinc-100 border-b-2 border-zinc-300" value={operador}
            onChange={e => setOperador(e.target.value)}/>
            </div>
            <div className="flex flex-col justify-between border-zinc-300 pr-3">
            <div className="flex gap-5">
            <div className="flex flex-col flex-grow">
            <div className="font-semibold">Interferência</div>
            <div className="flex gap-3 flex-grow">
            <Calendario onChange={setDataInicialInterf} value={dataInicialInterf} id="dataInicial"
            legenda="Data e hora inicial"/>
            <Calendario onChange={setDataFinalInterf} value={dataFinalInterf} id="dataInicial"
            legenda="Data e hora final"/>
            </div>
            </div>
            </div>
            <div className="flex justify-between gap-5">
            <div className="flex flex-col flex-grow">
            <label className="text-sm w-full bg-zinc-100 mt-1" >Motivo da interferência</label>
            <select name="motivo" id="motivo" value={selecao} onChange={e => alterarSelect(e)}>
                {motivosLista.map((motivo,i) => <option key={i}>{motivo}</option>)}
            </select>
            <div className={`${motivoInterf === "ABASTECIMENTO" ? 'block': 'hidden'}`}>
                <div className="flex justify-between items-center">
                {"Vol abastecido (L)"}
                <input type="number" className="mt-2 ml-2" value={+total_combustivel} onChange={e => setVolAbastecido(+e.target.value)} />
                </div>
                <div className="flex justify-between items-center">
                {maquina?.unidade === "h" ? "Horímetro" : "odômetro"}
                <input type="number" className="mt-2 ml-2" value={+contadorAbastecimento} onChange={e => setContadorAbastecimento(+e.target.value)} />
                </div>
            </div>
            </div>
            <div className="flex flex-grow">
            {selecao === "OUTROS" ? (
                <input type="text" value={motivoInterf} onChange={e => setMotivoInterf(e.target.value)}
                className="flex flex-grow pl-2 bg-zinc-100 border-b-2 border-zinc-300" placeholder="Digite o motivo" />
                ):(
                    false
                    )}
                    </div>
            </div>
            </div>
            <div className="flex flex-grow ">
                <button className="bg-zinc-400 hover:bg-zinc-500 h-full text-white px-1"
                onClick={adicionarInterfAlista}><IconArrowBigRight/></button>
                <ul className="flex flex-col pr-2">
                    {listaInterfs.length > 0 ? listaInterfs.map(e => <li key={e.id} className="border-b-2 border-zinc-300 ml-2 flex items-center">
                        {formatoHora.format(e.hora_inicial)} - {formatoHora.format(e.hora_final)}: {e.motivo}
                         <button onClick={ea => setListaInterfs(listaInterfs.filter(efilt => e.id !== efilt.id))}
                            ><IconX size={20}/></button> </li>):
                             <div className="flex justify-center items-center text-zinc-500 p-4 h-full ">Nenhuma interferência</div>}
                </ul>
            </div>
            <div className="flex">
                <div>

            <label className="text-sm w-full bg-zinc-100" >Horímetro inicial</label>
            <input type="number" placeholder="Digite..." className="pl-2 bg-zinc-100 border-b-2 border-zinc-300 w-32" value={horimetroInicial}
            onChange={e => setHorimetroInicial(+e.target.value)}/>
            </div>
                <div>

            <label className="text-sm w-full bg-zinc-100" >Horímetro final</label>
            <input type="number" placeholder="Digite..." className="pl-2 bg-zinc-100 border-b-2 border-zinc-300 w-32" value={horimetroFinal}
            onChange={e => setHorimetroFinal(+e.target.value)}/>
            </div>
            </div>
            <button className="bg-zinc-300 p-2 hover:bg-zinc-400" onClick={(e) => tratarEntrada()}
            >Adicionar à tabela</button>

        </div>
    )
}