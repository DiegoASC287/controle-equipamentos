'use client'
import ParteDiaria from '@/components/ParteDiaria'
import { ParteDiariaProvider } from '@/data/context/ParteDiariaContext'
import { useSearchParams } from 'next/navigation'

interface ParteDiariaProps{
    params:{id:string}
}

export default function PaginaParteDiaria({params}: ParteDiariaProps){
    const search = useSearchParams()
    const id = search.get("id")
    const cod_obra = search.get("codigoobra")

    return (
        <ParteDiariaProvider>
        <ParteDiaria params={{id: id?id:"999", cod_obra: cod_obra? cod_obra:"999"}} />
        </ParteDiariaProvider>
    )
}