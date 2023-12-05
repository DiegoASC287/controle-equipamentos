import { IconBulldozer, IconStereoGlasses } from "@tabler/icons-react";
import ItemLateral from "./ItemLateral";
export default function BarraLateralHome(){
    return (
        <div className="flex flex-col items-center w-auto bg-gray-100 pt-4 border-r-2 h-screen">
            <ItemLateral href="/inicio/maquinas" icone={<IconBulldozer 
            className="text-red-800"/>} texto="Maquinas"/>
            <ItemLateral href="/" icone={<IconStereoGlasses className="text-red-800"/>} texto="EPIs"/>
            <ItemLateral href="/inicio/maquinas" icone={<IconBulldozer className="text-red-800"/>} texto="..."/>
            <ItemLateral href="/inicio/maquinas" icone={<IconBulldozer className="text-red-800"/>} texto="..."/>
            <ItemLateral href="/inicio/maquinas" icone={<IconBulldozer className="text-red-800"/>} texto="..."/>
            
        </div>
    )
}   