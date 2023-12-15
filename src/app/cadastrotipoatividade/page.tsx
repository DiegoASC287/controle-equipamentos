'use client'

import { useEffect, useState } from "react"
import link from "../pathspers"

export default function CadastrarEap(){

    const [nome, setNome] = useState<string>("")
    const [unidade, setUnidade] = useState<string>("")

    function finalizar(){
        if(process.env.NODE_ENV !== 'production'){

            console.log(nome, unidade)
            fetch(`${link}/api/tiposatividade`, {
                method: "POST",
                cache: 'no-store',
                body: JSON.stringify({nome, unidade})
            }).then(res => res.json()).then(lista => console.log(lista))
        }
    }

    return (
        <div>
            <label htmlFor="">Codigo da obra</label>
            <input type="text" className="bg-zinc-200" value={nome} onChange={e => setNome(e.target.value)}/>
            <input type="text" className="bg-zinc-200" value={unidade} onChange={e => setUnidade(e.target.value)}/>
            <button onClick={e => finalizar()}>Finalizar</button>
        </div>
    )
}