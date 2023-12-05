'use client'
import Maquina from "@/model/Maquina"
import link from "@/app/pathspers"
import { useEffect, useState } from "react"

interface TabelaManutencoesProps{
    id: string | undefined
}

export default function TabelaManutencoes(props: TabelaManutencoesProps){
    const [maquina, setMaquina] = useState<Maquina>()
    useEffect(()=> {
        fetch(`${link}/api/maquinas/consultamanutencoes?id=${props.id}`, {
            cache: 'no-store'
        })
        .then(item => item.json()).then(maq => setMaquina(maq))
    }, [])
    return (
        <table className="border-collapse w-full">
            <thead>
                <tr className="bg-gray-300">
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Id</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Descrição</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Tipo</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Un</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Momento</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Data de realização</th>
                    <th className="border-2 border-zinc-700 px-5 py-2 text-start">Custo</th>
                </tr>
            </thead>
            <tbody className="border-2 border-zinc-300">
            {maquina?.manutencoes?.map((registro: any, i:number) => <tr key={registro.id}>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.id}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.descricao}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.tipo}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.unidade}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{registro.momento}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{new Date(Date.parse(`${registro.dataRealizacao}`)).toLocaleDateString("pt-br",
         { day: 'numeric', month: '2-digit', year: 'numeric' })}</td>
            <td className={`border-l-2 border-zinc-300 px-5 py-2 ${i%2 === 0 ? 'bg-zinc-100': 'bg-white'}`}>{`R$ ${registro.custo.toFixed(2)}`.replace(",", ".")}</td>
            </tr>
            )}
            </tbody>
        </table>
    )
}