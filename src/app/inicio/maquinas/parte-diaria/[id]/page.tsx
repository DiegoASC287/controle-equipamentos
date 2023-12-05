
import ParteDiaria from '@/components/ParteDiaria'
import ParteDiariaContext, { ParteDiariaProvider } from '@/data/context/ParteDiariaContext'

interface ParteDiariaProps{
    params:{id:string}
}

export default function PaginaParteDiaria({params}: ParteDiariaProps){


    return (
        <ParteDiariaProvider>
        <ParteDiaria params={params} />
        </ParteDiariaProvider>
    )
}