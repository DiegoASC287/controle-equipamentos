import {IconBackhoe, IconBuildingBridge, IconBulldozer, IconFilePlus} from "@tabler/icons-react";
import {Tooltip} from "@nextui-org/react";
import ItemLateral from "./ItemLateral";
export default function BarraLateralObras(){
    return (
        <div className="flex flex-col items-center w-auto bg-gray-100 pt-4 px-2 border-r-2 h-screen">
            <Tooltip className="bg-zinc-200 text-sm rounded-md px-2 border-dashed border-zinc-400 border-2"
             content="Obras" delay={0} closeDelay={0} placement="right">

            <ItemLateral href="/inicio/obras" icone={<IconBuildingBridge size={30}
            className="text-red-800"/>} texto=""/>
            </Tooltip>
            <Tooltip className="bg-zinc-200 text-sm rounded-md px-2 border-dashed border-zinc-400 border-2"
             content="Cadastros" delay={0} closeDelay={0} placement="right">
            <ItemLateral href="/inicio/cadastroobras" icone={<IconFilePlus className="text-red-800" size={30}/>} texto=""/>
            </Tooltip>
            <Tooltip className="bg-zinc-200 text-sm rounded-md px-2 border-dashed border-zinc-400 border-2"
             content="Máquinas" delay={0} closeDelay={0} placement="right">
            <ItemLateral href="/inicio/maquinasinativas?codigoobra=Nenhuma" icone={<IconBackhoe className="text-red-800" size={30}/>} texto=""/>
            </Tooltip>
        </div>
    )
}   