'use client'
import { useState, useCallback, ChangeEvent, useEffect} from "react"
import { AiFillFileImage} from 'react-icons/ai'
interface UploaderProps{
    atualizarImg: (imagem: {image: string | null, }, file: File | null) => void 
}
export default function Uploader_linha(props: UploaderProps){
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

    useEffect(() => {
        if(file && img){
            props.atualizarImg(img, file)
        }
    }, [file, img])
    return (
        <div className="w-full h-full flex justify-center items-center relative " >
            <form className="flex " action="">
                <div className="w-[100px] h-[25px] border-zinc-300 border-dashed border-2 absolute flex items-center justify-center">
                    {file? <span className="overflow-hidden max-h-4 pr-2 flex font-normal text-xs ">{file.name}</span> : <AiFillFileImage className="w-5 h-5"/>}</div>
                <input className={`flex flex-col justify-center items-center border-2 border-dashed z-30
                 border-zinc-300 h-[25px] w-[100px] rounded-md opacity-0`} type="file" accept="image/*"
                   onChange={aoSelecionar} />
                 
            </form>
        </div>
    )
}