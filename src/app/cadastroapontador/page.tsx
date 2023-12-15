'use client'

import { useEffect, useState } from "react"
import link from "../pathspers"

export default function CadastrarEap(){

    const [nome, setNome] = useState<string>("")
    const [idade, setUnidade] = useState<number>(0)

    function finalizar(){
        if(process.env.NODE_ENV !== 'production'){

            fetch(`${link}/api/apontadores`, {
                method: "POST",
                cache: 'no-store',
                body: JSON.stringify({nome, idade})
            }).then(res => res.json()).then(lista => console.log(lista))
        }
    }

    return (
        <div>
            <label htmlFor="">Codigo da obra</label>
            <input type="text" className="bg-zinc-200" value={nome} onChange={e => setNome(e.target.value)}/>
            <input type="text" className="bg-zinc-200" value={idade} onChange={e => setUnidade(+e.target.value)}/>
            <button onClick={e => finalizar()}>Finalizar</button>
        </div>
    )
}