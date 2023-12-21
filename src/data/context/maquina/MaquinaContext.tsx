'use client'
import Maquina from "@/model/Maquina";
import { createContext, useEffect, useState, } from "react";
import link from "@/app/pathspers";
import { useSearchParams } from "next/navigation";

interface ContextProps{
    maquina?: Maquina
    atualizarMaquina: (maquina:Maquina) => void
}

const MaquinaContext = createContext<ContextProps | null>({} as ContextProps)

const MaquinaProvider = ({children}: {children: React.ReactNode}) => {
    const search = useSearchParams()
    const id = search.get("id")
    const codigo = search.get("codigoobra")

    const [maquina, setMaquina] = useState<Maquina | undefined>({} as Maquina)
    function atualizarMaquina(maquina:Maquina) {
        setMaquina(maquina)
    }
    useEffect(() => {
        fetch(`${link}/api/maquinas/consultapagmaq?id=${id}`,
            {
                cache: 'no-cache'
            })
            .then(item => item.json()).then(maq => {
                setMaquina(maq)
                console.log(maq)
            })
    }, [])

    return (
        <MaquinaContext.Provider value={{maquina, atualizarMaquina}}>
            {children}
        </MaquinaContext.Provider>
    )
}

export {MaquinaProvider}
export default MaquinaContext