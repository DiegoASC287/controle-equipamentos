import Obra from "@/model/Obra";
import ObraItem from "@/components/ObraItem";
import link from "@/app/pathspers";

async function getObras() {

    const {signal} = new AbortController()
    const req = await fetch(`${link}/api/obras/consulta`,  {cache: 'no-store', signal})
    const obras = await req.json()
    console.log(obras)
    return obras

}

export default async function PaginaObras(){

    const obras = await getObras()

    function renderizarObras(obras: Obra[]){
            return obras?.map((e: any) => <ObraItem key={e.id} obra={e}/> )

    }
    return (
        <div className="p-5 flex gap-3">{renderizarObras(obras)}</div>
    )
}