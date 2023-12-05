import { ReactNode } from "react"

interface CelulaProps{
    titulo:string | undefined | ReactNode
    texto: string | undefined | ReactNode
}
export default function CelulaAluguelInfo(props: CelulaProps){
    return (
        <div className={`border-b-2 border-zinc-300 px-4 py-1
        bg-zinc-200 w-full flex justify-between gap-5`}>
            <div className="flex justify-start text-zinc-400 text-sm ">
                {props.titulo}
            </div>
            <div className="flex justify-end text-lg">
                {props.texto}
            </div>
        </div>
    )
}