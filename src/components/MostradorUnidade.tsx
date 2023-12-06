interface MostradorUnidadeProps{
    valor?: string
    unidade?: string
}
export default function MostradorUnidade(props: MostradorUnidadeProps){
    return (
        <div className="font-bold bg-opacity-50 pl-2 pr-5 py-1 rounded-l-lg bottom-2 right-0 absolute bg-red-600 text-white">
            {props.valor} {props.unidade}
        </div>
    )
}