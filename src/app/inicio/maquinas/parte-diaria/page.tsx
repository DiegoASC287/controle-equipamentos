'use client'
import ParteDiaria from '@/components/ParteDiaria'
import ParteDiariaContext, { ParteDiariaProvider } from '@/data/context/ParteDiariaContext'
import { useSearchParams } from 'next/navigation'

interface ParteDiariaProps{
    params:{id:string}
}

export default function PaginaParteDiaria({params}: ParteDiariaProps){
    const search = useSearchParams()
    const id = search.get("id")

    return (
        <ParteDiariaProvider>
        <ParteDiaria params={id? {id: id} : {id:"999"}} />
        </ParteDiariaProvider>
    )
}