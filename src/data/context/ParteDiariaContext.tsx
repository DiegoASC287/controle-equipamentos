'use client'
import { ReactNode, createContext, useEffect, useState } from "react";
import Maquina from "@/model/Maquina";
interface ContextProps {
    children: ReactNode
    
}

interface ContextParams {
    children?: ReactNode
    maquina: Maquina | undefined;
    atualizarMaquina?: (id: number) => void;
}


const ParteDiariaContext  = createContext<ContextParams | undefined>(undefined)

export function ParteDiariaProvider({children}: ContextProps) {
    const [maquina, setMaquina] = useState<Maquina>()
    
    return (
        <ParteDiariaContext.Provider value={{maquina: maquina}}  >
            {children}
        </ParteDiariaContext.Provider>
    )
}

export default ParteDiariaContext 