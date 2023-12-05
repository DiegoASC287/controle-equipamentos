import Link from "next/link";
import { IconPencil } from "@tabler/icons-react";
interface BotaoPartDiariaProps{
id: string
}

export default function BotaoPartDiaria(props: BotaoPartDiariaProps){
    return (
        <Link href={{pathname: `/inicio/maquinas/parte-diaria`,
        query: {
            id: props.id
        }}}>
        <button>
            <div
            className={`fixed right-2
            bottom-2 flex gap-2 bg-red-800 py-2
            pl-2 pr-3 rounded-md
            text-white
            hover:bg-red-900
            shadow-md  shadow-slate-400
            `}>
            <IconPencil/>
            Editar parte diária
            </div>
        </button>
                 </Link>
    )
}