'use client'
import Image from "next/image";
import OperadorProps from "@/model/OperadorProps";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface MostrarOperadorProps {
    operador: OperadorProps
    tipo?: string
    exibirX?:boolean
    alterarVisualizacao: () => void
}

export default function MostrarOperador(props: MostrarOperadorProps) {
    const [visualizarFoto, setVisualizarFoto] = useState<boolean>(false)
    function renderizarStatus() {
        const certificado = props.operador.certificacoes?.filter(e => e.tipo_maquina === props.tipo)
        if (certificado && certificado.length > 0) {
            return <div>Status: {certificado[0]?.status}</div>
        } else {
            return <div>Status: Não autorizado</div>
        }
    }
    function expandirFoto() {
        return <div className="absolute top-0 -left-72 w-72 h-72 bg-yellow-400">
            <button
                onClick={e => setVisualizarFoto(false)}
                className="absolute right-1 top-1 z-10 bg-white rounded-full">
                <IconX />
            </button>
            <div className="h-72 w-72 relative">
                <Image fill src={props.operador.imagem_url} alt="Foto" />
            </div>
        </div>
    }
    return (
        <div className="flex border-dashed border-2 border-zinc-300 rounded-xl overflow-hidden justify-between">
            <div className="flex gap-3 flex-wrap">
                <div className="relative">

                    <button onClick={e => setVisualizarFoto(valor => !valor)} className="h-[100px] w-[100px] relative">
                        <Image fill src={props.operador.imagem_url} alt="Foto" />
                    </button>
                    {visualizarFoto ? (
                        expandirFoto()
                    ) : (null)}
                </div>
                <div>

                    <div>{props.operador.nome} {props.operador.sobrenome}</div>
                    <div>CPF {props.operador.cpf}</div>
                    <div>Idade {props.operador.idade} anos</div>
                    {renderizarStatus()}
                </div>
            </div>
            {props.exibirX? (
            <button className="flex " onClick={e=> props.alterarVisualizacao()}>
                <IconX />
            </button>

            ): (null)}

        </div>
    )
}