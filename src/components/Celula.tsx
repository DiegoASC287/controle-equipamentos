import { ReactNode } from "react"

interface CelulaProps{
    titulo:string | undefined | ReactNode
    texto: string | undefined | ReactNode
}
export default function Celula(props: CelulaProps){
    return (
        <div className="rounded-lg px-4 py-1 bg-zinc-100 ml-2 mb-1 w-full">
            <div className="flex justify-start text-zinc-400 text-sm">
                {props.titulo}
            </div>
            <div className="flex justify-end text-lg">
                {props.texto}
            </div>
        </div>
    )
}