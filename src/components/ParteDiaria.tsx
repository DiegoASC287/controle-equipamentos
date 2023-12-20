'use client'
import LinhaTabPartDiaria from "@/model/LinhaTabPartDiaria"
import { useEffect, useState } from "react"
import FormParteDiaria from "./FormParteDiaria"
import TabelaPartesDiarias from "./TabelaPartesDiarias"
import { Maquina } from "@prisma/client"
import Calendario from "./Calendario"
import link from "@/app/pathspers"

interface ParteDiariaProps{
    params:{id:string, cod_obra: string}
}

export default function ParteDiaria({params}: ParteDiariaProps){
    const [maquina, setMaquina] = useState<Maquina>()
    const [tabelaPD, setTabelaPD] = useState<LinhaTabPartDiaria[]>([])
    const [dataParte, setDataParte] = useState<Date | undefined>(new Date) 
    const [trazerInfos, setTrazerInfos] = useState<LinhaTabPartDiaria[]>([])
    const [horimetroInicialDia, setHorimetroInicialDia] = useState<number>()
    const [horimetroFinalDia, setHorimetroFinalDia] = useState<number>()
    const [totalInterferencias, setTotalInterferencias] = useState<number>(0)
    
    useEffect(()=> {
        fetch(`${link}/api/maquinas/addatividade?id=${params.id}&codigoobra=${params.cod_obra}`, {
            cache: 'no-store'
        })
        .then(item => item.json()).then(tabela => {
            setTabelaPD(tabela)})
    }, [])   
    useEffect(()=> {
        fetch(`${link}/api/maquinas/consultaapenasmaquina?id=${params.id}`, {
            cache: 'no-store'
        })
        .then(item => item.json()).then(maq => {
            setMaquina(maq)
    })
    }, [])   

    const formato2 = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "short",
      })

    function atualizarTabela(linha: LinhaTabPartDiaria){
        console.log(linha)
        setTabelaPD(a => [linha, ...a])
    }

    function importarDados(tabela: LinhaTabPartDiaria[]){
        setTrazerInfos(tabela)
        
    }

    function renderizarDadosCabecalho(){
        const infosDia = trazerInfos.filter(e => (new Date(e.data_inicial_trabalho).getDay() ===
         dataParte?.getDay()) &&
        new Date(e.data_inicial_trabalho).getMonth() === dataParte?.getMonth() &&
        new Date(e.data_inicial_trabalho).getFullYear() === dataParte?.getFullYear()
        )

        if(infosDia){
            const horimetros = infosDia.map(e => e.horimetro_inicial)
            const menor = horimetros.reduce((menor, comparacao) => {
                if (menor && comparacao){
                    return menor > comparacao ? comparacao:menor}
                    
                }, 1000000)
            if(horimetros && menor) {
                setHorimetroInicialDia(menor)
            }
            const maiorhor = horimetros.reduce((maior, comparac) => {
                if (maior && comparac){
                    return maior < comparac ? comparac:maior}
                    
                }, 0.00001)
            setHorimetroFinalDia(maiorhor)
            const totalInterfs = infosDia.map((e:LinhaTabPartDiaria) => (e.interferencias))
            const listahorarios:any[] = []
            const horariosInterfs = totalInterfs.map(e=> listahorarios.push(...e))
            const horariosValue = listahorarios.map(p => Number(new Date(p.hora_final)) - Number(new Date(p.hora_inicial)))
            const valorTotalHInterfs = horariosValue.reduce((inicial, proximo) => inicial + proximo, 0)
            setTotalInterferencias(valorTotalHInterfs/3600000)

            
        }
    }

    return (
        <div className='flex flex-grow justify-center bg-gray-200 items-center'>
            <div className={`w-full sm:w-11/12
             bg-gray-100 shadow-md
              shadow-slate-500 mt-6
               rounded-t-2xl overflow-hidden`}>
                <div className='border-b-2 border-gray-500 grid grid-cols-2 bg-zinc-300'>
                    
                    <div>

                    <ul className='grid grid-cols-3  p-5  '>
                        <li className='col-span-full font-semibold text-lg text-left 
                        border-b-2 border-zinc-700 pb-1'>Parte diária - {maquina?.nome}, C.C. 034 - Adutora de Boqueirao</li>
                        <li className='text-left col-span-full font-semibold'>FORN: <span className='font-normal'>Catita</span></li>
                        <li className='text-left font-semibold'>MODELO 
                        <div className='font-normal'>{maquina?.modelo}</div>
                        </li>
                        <li className='text-left font-semibold'>MARCA 
                        <div className='font-normal'>
                        CRIAR CAMPO MARCA
                            </div></li>
                        <li className='text-left font-semibold'>CATEGORIA <div className='font-normal'>
                        {maquina?.categoria} </div></li>
                    </ul>
                        </div>
                        <div className=' pl-4 my-4 border-l-2 border-zinc-600 flex items-center'>
                        <div className='pr-4'>

                        <div className='text-xl font-semibold flex flex-col items-center'>
                        DIA
                        </div>
                        <div className="flex flex-col items-center">
                            <Calendario value={dataParte} onChange={setDataParte} id="cal" legenda=""/>
                            <button onClick={renderizarDadosCabecalho}>Buscar</button>
                        </div>
                        </div>
                        <div className='flex flex-grow flex-col border-2 h-full '>
                            <div className="flex flex-col">
                                Horímetro
                            <div className="text-sm">inicial: {horimetroInicialDia !== 1000000 ? horimetroInicialDia : "--"}</div>
                            <div className="text-sm">final: {horimetroFinalDia !== 0.00001 ? horimetroFinalDia : "--"}</div>
                            <div className="text-sm">Saldo: {(horimetroFinalDia && horimetroInicialDia 
                                && (horimetroFinalDia !== 1000000 && horimetroFinalDia !== 0.00001 )) ? horimetroFinalDia-horimetroInicialDia : ""}</div>
                            <div className="text-sm">Interferências: {totalInterferencias.toFixed(2)}h</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    {maquina?.ativa? (
                    <FormParteDiaria idMaquina={+params?.id} adicionarLinha={atualizarTabela}/>
                    ): (null)}
                </div>
                <div className='w-full flex mb-24'>

                <TabelaPartesDiarias trazerInfos={importarDados} tabela={tabelaPD}  maquinaId={Number(params?.id)}/>
                </div>
            </div>
        </div>
    )
}