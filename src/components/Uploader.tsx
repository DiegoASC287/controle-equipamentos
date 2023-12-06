'use client'
import { useState, useCallback, ChangeEvent} from "react"
import { MdCloudUpload, MdDelete} from 'react-icons/md'
import { AiFillFileImage} from 'react-icons/ai'
interface UploaderProps{
    atualizarImg: (imagem: string | null) => void 
}
export default function Uploader(props: UploaderProps){
    const [img, setImg] = useState<{image: string | null, }>({image: null})
    const [file, setFile] = useState<File | null>()

    const aoSelecionar = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        if(file){
            if(file.size / 1024 /1024 >= 50){
                alert("Foto maior que 50MB")
            }else{
                setFile(file)
                const reader = new FileReader()
                reader.onload = (e) => {
                    setImg((prev) => ({...prev, image: e.target?.result as string}))
                }
                reader.readAsDataURL(file)
            }
        }
    }, [setImg] )
    return (
        <div className="w-full h-full flex justify-center items-center" >
            <form className="relative" action="">
                <div className="w-[200px] h-[200px] border-zinc-300 border-dashed border-2 absolute flex items-center justify-center">
                    {file? "Selecionado" : <AiFillFileImage className="w-9 h-9"/>}</div>
                <input className={`flex flex-col justify-center items-center border-2 border-dashed
                 border-zinc-300 h-[200px] w-[200px] hover:cursor-pointer rounded-md opacity-0`} type="file" accept="image/*"
                   onChange={aoSelecionar} />
                 <div className="flex justify-center">{file? (
                    <button onClick={ async (e) => {
                        e.preventDefault()
                        fetch('/api/maquinas/cadastroimg', {
                            method: 'POST',
                            headers: {'content-type': file?.type || 'application/octet-stream'},
                            body: file
                        }).then(async (res) => res.json()).then((link:string) => props.atualizarImg(link))
                    }}>Carregar</button>
                 ): ("Selecione uma imagem")}</div>
            </form>
        </div>
    )
}