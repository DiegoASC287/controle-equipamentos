import AddMaquina from "@/components/AddMaquina"
import MaquinaItem from "@/components/MaquinaItem"
import link from "@/link/link"

async function getData() {
    const testURL = `${link}/api/maquinas` 
    const data = await fetch(testURL, {cache: 'no-store'})
    const maquina = await data.json()
    return maquina
}
export default async function PaginaMaquinas(){
    const maquinas = await(getData())
    
    return (
        <div className="h-screen">

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 p-3">
            <AddMaquina/>
            {maquinas.map((e: any) => <MaquinaItem key={e.id} maquina={e}/>)}
        </div>
        </div>
    )
}