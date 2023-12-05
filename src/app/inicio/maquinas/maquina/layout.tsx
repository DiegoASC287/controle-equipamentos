import { MaquinaProvider } from "@/data/context/maquina/MaquinaContext"

interface MaquinaLayoutProps{
    children: any
}
export default function MaquinaLayout(props: MaquinaLayoutProps){
    return (
        <div className="w-full">
            <MaquinaProvider>
            {props.children}
            </MaquinaProvider>
        </div>
    )
}