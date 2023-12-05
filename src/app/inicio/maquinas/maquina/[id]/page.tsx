import DescricaoAlugado from "@/components/DescricaoAlugado";
import TabelaManutencoes from "@/components/TabelaManutencoes";
import MaquinaFoto from "@/components/MaquinaFoto";
import BotaoPartDiaria from "@/components/BotaoPartDiaria";

interface PageDetailProps{
    params: {id:string}
}

async function getData(id: string) {
    const testURL = `http://localhost:3000/api/maquinas/consulta?id=${id}` 
    const data = await fetch(testURL, {cache: 'no-store'})
    const maquina = await data.json()
    return maquina
}

export default async function PaginaMostrarMaquina({
    
    params,
  }: PageDetailProps){
    const maquina = await getData(params.id)
        
    return (
        <div className="bg-zinc-50 h-screen w-full ">
            <div className="flex flex-row p-3 pb-3 border-b-2 border-zinc-400 w-full"> 
                <MaquinaFoto id={params.id}/>
                <div className="flex">
                    <DescricaoAlugado id={Number(params.id)}/>
                </div>

                </div>
                    <TabelaManutencoes id={params.id}/>
                    
                <div>
                </div>
                <BotaoPartDiaria id={params.id}/>
        </div>
    )
}