'use client'
import {categorias, tipo } from "@/app/constants/constantes"
import FiltroProps from "@/model/FiltroProps"
import { IconFilter } from "@tabler/icons-react"
import { useEffect, useState } from "react"
interface BarraFiltroProps{
    setFiltro: (filtro: FiltroProps) => void
}
export default function BarraFiltro({setFiltro}: BarraFiltroProps){
    const [selectTipo, setSelectTipo] = useState<string>("")
    const [categoria, setCategoria] = useState<string>("")
    const [nome, setNome] = useState<string>("")
    useEffect(() => {
        setFiltro({categoria: categoria, tipo: selectTipo, nome})
    }, [selectTipo, categoria, nome])
    useEffect(() => {
        setFiltro({categoria: '', tipo: '', nome})

    }, [])
    return (

        <div className="w-full h-10 bg-zinc-200 flex items-center justify-center gap-5 flex-wrap">
                <IconFilter/>
                <div className="flex gap-2 items-center">
                <input className="p-1 border-2 mb-1" type="text" placeholder="Equipamento..." 
                    value={nome} 
                    onChange={e => setNome(e.target.value)}/>
                </div>


                <div className="flex gap-2 items-center">
                <label >Tipo</label>
                <select className=" px-1 border-2 mb-1"
                value={selectTipo} onChange={e => setSelectTipo(e.target.value)}>
                {tipo.map((e, i) => <option key={i}>{e}</option>)}
            </select>
                    </div>
                    <div className="flex gap-2 items-center">
            <label >Categoria</label>
                <select className=" px-1 border-2 mb-1"
                value={categoria} onChange={e => setCategoria(e.target.value)}>
                {categorias.map((e, i) => <option key={i}>{e}</option>)}
            </select>
            </div>
            </div>
                    )
}