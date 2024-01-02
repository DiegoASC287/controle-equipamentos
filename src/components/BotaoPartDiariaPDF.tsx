'use client'
import Link from "next/link";
import { IconFileTypePdf} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
interface BotaoPartDiariaProps{
    children?: ReactNode
}

export default function BotaoPartDiariaPDF(props: BotaoPartDiariaProps){
    const search = useSearchParams()
    const codigo = search.get('codigoobra')
    const id = search.get('id')
    return (
        <Link href={{pathname: `/inicio/maquinas/gerarpdfpd`,
        query: {
            id,
            codigoobra: codigo

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
            <IconFileTypePdf/>
            Gerar PDF
            </div>
        </button>
                 </Link>
    )
}