'use client'

import ItemEAP from "@/model/ModeloItemEAP"
import { useEffect, useState } from "react"
import link from "../pathspers"

export default function CadastrarEap(){

    const [cod_obra, setCodObra] = useState<string>("")
    const [linhaEap, setLinhaEap] = useState<ItemEAP[]>()

    function subirEap(){
        fetch("./Eap2.csv").then(res => res.text()).then(texto => {
            const valor = texto.split("\n")
            const linhasObj = valor.map(linha => {
                const linhaCur = linha.replace("\r", "").split(";")
                return {cod_obra, codigo: "000", atividades: [], descricao: linhaCur[1], item: linhaCur[0], indice: 0, preco_unitario: 0,
                 unidade: linhaCur[2]? linhaCur[2]?.toLowerCase():""}
            })

            setLinhaEap(linhasObj.map((k, i) => {return {...k, item: `${(Math.random()*10000).toFixed(0)}-${k.item}`}}).filter(e => e.descricao && e.descricao?.trim() !== ""
             && e.item && e.item !== ""))
        })
    }

    function finalizar(){
        fetch(`${link}/api/eap/lerecadastrar`, {
            method: "POST",
            cache: 'no-store',
            body: JSON.stringify(linhaEap)
        }).then(res => res.json()).then(lista => null)
    }

    useEffect(() => {
        console.log(linhaEap)
        linhaEap?.forEach(e => console.log(e))
    }, [linhaEap])
    return (
        <div>
            <label htmlFor="">Codigo da obra</label>
            <input type="text" className="bg-zinc-200" value={cod_obra} onChange={e => setCodObra(e.target.value)}/>
            <button onClick={e => subirEap()}>add</button>
            <button onClick={e => finalizar()}>Finalizar</button>
        </div>
    )
}