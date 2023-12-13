'use client'
import MaquinaPesadaInterf from "@/model/MaqPesada"
import { useEffect, useState } from "react"
import DropOperador from "../DropOperador"
import OperadorProps from "@/model/OperadorProps"
import MostrarOperador from "../MostrarOperador"
import Uploader_pdf_img from "../Uploader_pdf_img"


interface MaquinaPesadaProps{
    onChange: (maqPes: MaquinaPesadaInterf) => void
    tipo?: string
}

export default function MaquinaPesada(props:MaquinaPesadaProps){
    const [maqPesada, setMaqPesada] = useState<MaquinaPesadaInterf>()
    const [operador, setOperador] = useState<OperadorProps | null>(null)
    const [tipo, setTipo] = useState<string|undefined>()
    const [fileART, setFileART] = useState<File | null>(null)
    const [imgART, setImgART] = useState<{image: string | null, }>({image: null})
    const [filePlanoMan, setFilePlanoMan] = useState<File | null>(null)
    const [imgPlanoMan, setImgPlanoMan] = useState<{image: string | null, }>({image: null})

    function atArquivoART(imagem: {image: string | null, }, file: File | null){
        setFileART(file)
        setImgART(imagem)
    }
    function atArquivoPlanoMan(imagem: {image: string | null, }, file: File | null){
        setFilePlanoMan(file)
        setImgPlanoMan(imagem)
    }

    useEffect(() => {
        props.onChange({
            dimensao_trabalho: maqPesada?.dimensao_trabalho,
            foto_documento: maqPesada?.foto_documento,
            identificador: maqPesada?.identificador,
            operador: operador,
            fileART,
            imgART,
            filePlanoMan,
            imgPlanoMan
        })
    }, [maqPesada, operador, fileART, imgART, imgPlanoMan, filePlanoMan]) 
    function alterarVisualizacao(){
        setOperador(null)
    }
    useEffect(() => {
        setTipo(props.tipo)
    }, [])

    function renderizarSelectOp(){
        if(props.tipo && props.tipo.trim() !== ""){
            return (<div>
                Operador
                {operador? (
                <MostrarOperador operador={operador} tipo={tipo} alterarVisualizacao={alterarVisualizacao} exibirX/>
                ): (

                <DropOperador dimTexto={30} selecionar={setOperador} tipo_maquina={props.tipo}/>
                )}
            </div>)
        }else{
            return null
        }
    }

    return (
        <div className="grid gap-2 md:grid-cols-2 p-2 border-2 border-zinc-100 w-full">
            <div>

           
            {/*-----*/}
            <div className="flex flex-col">
            <div className="flex w-full flex-col">
            {/*-----*/}
            <div className='flex items-center'>
            <label className='w-1/2'>Dimensão de trabalho</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="number"
            value={maqPesada?.dimensao_trabalho}  
            onChange={e => setMaqPesada({...maqPesada, dimensao_trabalho: +e.target.value})}/>
            </div>
            {/*-----*/}
            <div className='flex items-center pt-2'>
            <label className='w-1/2'>Placa/Identificador</label>
            <input className="px-2 w-1/2 border-2 mb-1" type="text"
            value={maqPesada?.identificador}
            onChange={e => setMaqPesada({...maqPesada, identificador: e.target.value})}/>
            </div>
            <div className='flex items-center pt-2'>
            <label className='w-1/2'>ART</label>
            <Uploader_pdf_img atualizarImg={atArquivoART}/>
            </div>
            <div className='flex items-center pt-2'>
            <label className='w-1/2'>Plano de manutenção</label>
            <Uploader_pdf_img atualizarImg={atArquivoPlanoMan}/>
            </div>
            {/*-----*/}
            </div>
            </div>
            </div>
            {renderizarSelectOp()}
            

        </div>
    )
}