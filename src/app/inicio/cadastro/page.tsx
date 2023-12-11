import AddMaquina from "@/components/AddMaquina";
import AddOperador from "@/components/AddOperador";

export default function PaginaCadastro(){
    return (
        <div className="flex gap-3 p-5">
            <AddMaquina/>
            <AddOperador/>
        </div>
    )
}