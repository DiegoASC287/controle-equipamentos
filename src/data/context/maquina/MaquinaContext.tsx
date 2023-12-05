'use client'
import { Maquina } from "@prisma/client";
import { createContext, useState, } from "react";

interface ContextProps{
    maquina: Maquina | undefined
    atualizarMaquina: (maquina:Maquina) => void
}

const MaquinaContext = createContext<ContextProps | null>(null)

const MaquinaProvider = ({children}: {children: React.ReactNode}) => {

    const [maquina, setMaquina] = useState<Maquina | undefined>(undefined)
    function atualizarMaquina(maquina:Maquina) {
        setMaquina(maquina)
    }

    return (
        <MaquinaContext.Provider value={{maquina, atualizarMaquina}}>
            {children}
        </MaquinaContext.Provider>
    )
}

export {MaquinaProvider, MaquinaContext}