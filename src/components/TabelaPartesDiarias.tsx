
import LinhaTabPartDiaria from "@/model/LinhaTabPartDiaria"

interface TabelaPartesDiariasProps{
    maquinaId: number | undefined
    trazerInfos: (infos: LinhaTabPartDiaria[]) => void
    tabela: LinhaTabPartDiaria[]

}

export default function TabelaPartesDiarias(props: TabelaPartesDiariasProps){
    
    const formato = new Intl.DateTimeFormat("pt-BR", {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })

    const formatoHora = new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    })
    return ( 
<table className="border-collapse w-full m-2">
            <thead>
                <tr className="bg-gray-300">
                    <th rowSpan={2} className="border-2 border-zinc-400 px-5 py-2 text-start">Cod. Atividade</th>
                    <th colSpan={3}className="border-2 border-zinc-400 px-5 py-2 text-center">Datas e horas dos registros de trabalho</th>
                    <th rowSpan={2} className="border-2 border-zinc-400 px-5 py-2 text-start">Operador</th>
                    <th rowSpan={2} className="border-2 border-zinc-400 px-5 py-2 text-start">Atividade</th>
                    <th rowSpan={2} className="border-2 border-zinc-400 px-5 py-2 text-start">Interferências</th>
                    <th rowSpan={2} className="border-2 border-zinc-400 px-5 py-2 text-start">Apontador</th>
                    <th rowSpan={2} className="border-2 border-zinc-400 px-5 py-2 text-start">Observações</th>
                </tr>
                <tr className="bg-gray-300">
                    <th className="border-2 border-zinc-400 px-5 py-2 text-start max-w-[100px]">Data</th>
                    <th className="border-2 border-zinc-400 px-5 py-2 text-start">H. Inicial</th>
                    <th className="border-2 border-zinc-400 px-5 py-2 text-start">H. final</th>
                </tr>
            </thead>
            <tbody className="border-2 border-zinc-300">
            {props.tabela?.map((registro: LinhaTabPartDiaria, i:number) => <tr key={i}>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro?.eapId?.split("-")[1]}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ?
             'bg-zinc-100': 'bg-white'}`}>{formato.format(new Date(registro.data_inicial_trabalho))}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>
                {formatoHora.format(new Date(registro.data_inicial_trabalho))}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>
                {formatoHora.format(new Date(registro.data_final_trabalho))}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.operador}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.descricao_serv}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>
            <ul>
                    {registro.interferencias?.map(e => {
                        return (<li key={e.id} className="border-b-2 border-zinc-300 ml-2 flex items-center">
                        {formatoHora.format(new Date(e.hora_inicial))} - {formatoHora.format(new Date(e.hora_final))}: {e.motivo}</li>)
                    })}
            </ul>
                </td>
                <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.apontador?.nome}</td>
                <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.observacoes}</td>
            
            </tr>
            )}
            </tbody>
        </table>
  
        
    )
}