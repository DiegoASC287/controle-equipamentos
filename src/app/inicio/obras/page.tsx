'use client'
import { Obra } from "@prisma/client";
import { useEffect, useState } from "react";
import ObraItem from "@/components/ObraItem";
import link from "@/app/pathspers";
export default function PaginaObras(){
    const [maquinas, setObras] = useState<Obra[]>()
    useEffect(() => {
        fetch(`${link}/api/obras/consulta`, {cache: 'no-cache'}).then(res => res?.json()).then(obrasCarreg => {
            console.log(obrasCarreg)
            setObras(obrasCarreg)
    })}, [])

    function renderizarObras(){
            return maquinas?.map((e: any) => <ObraItem key={e.id} obra={e}/> )

    }
    return (
        <div className="p-5 flex gap-3">{renderizarObras()}</div>
    )
}