interface InputManutencaoProps{
    texto: string
    value?: string | number
    type: string
    onChange: (e:any) => void
}

export default function InputManutencao({type, texto, value, onChange}: InputManutencaoProps){
    return (
        <div className="flex justify-between mt-1 pl-2">
                        <div className="pr-2 flex items-center">{texto}</div>
                        <input className=" w-36 border-b-2 rounded-sm mr-2 pl-1 border-gray-400 bg-zinc-200 my-1" 
                        type={type}
                        value={value}
                        onChange={e => onChange(type=== "text" ? e.target.value : +e.target.value)}
                         />
                    </div>
    )
}