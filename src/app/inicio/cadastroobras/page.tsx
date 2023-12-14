'use client'
import { useEffect, useState } from 'react'
import Image from "next/image";
import link from '@/app/pathspers';
import Uploader from '@/components/Uploader';
import Obra from '@/model/Obra';

interface PageDetailProps {
    params: { id: string }
}

interface linhaTemplate {
    id: number
    tipo_veiculo: string
    manutencao: string
    intervalo: number
    tipo: string
}

interface StatusAddProps {
    status: "ok" | "erro" | "carregando" | "pronto",
    msg?: string
}


export default function PaginaCadastrarMaquina({
    params,
}: PageDetailProps) {

    const [selecionarOrigem, setSelOrigem] = useState<string>()
    const [imagem, setImagem] = useState<string | null>()
    const [obraNome, setObraNome] = useState<string>("")
    const [obraCodigo, setObraCodigo] = useState<string>("")
    const [statusAdd, setStatusAdd] = useState<StatusAddProps>({ status: 'pronto' })
    const [obraAdicionada, setObraAdicionada] = useState<Obra>()
    const [desatBotAddObra, setDesBotAddObra] = useState<boolean>(false)


    function atImg(imagem: any) {
        const { url } = imagem
        setImagem(url)
    }

    useEffect(() => {
        setTimeout((e: any) => setStatusAdd({ status: 'pronto', msg: "" }), 10000)
    }, [statusAdd])

    function renderizarAviso() {
        switch (statusAdd.status) {
            case 'pronto': {
                return null
            } case 'carregando': {
                return <div className='bg-zinc-200'>Adicionando máquina...</div>
            } case 'erro': {
                return <div className='bg-red-400'>Erro, não conseguimos adicionar esta máquina!</div>
            } case 'ok': {
                return <div className='bg-green-300'>Máquina adicionada com sucesso!</div>
            }
        }

    }



    async function addObra(obra: Obra) {
        setDesBotAddObra(true)
        const erros = []

        if (!obra?.codigo || obra?.codigo === "") {
            erros.push("Falta digitar o código da obra")
        }
        if (!obra?.imagem_url || obra?.imagem_url === "") {
            erros.push("Falta selecionar a foto")
        }
        if (!obra?.codigo || obra?.codigo === "") {
            erros.push("Falta selecionar a foto")
        }

        await fetch(`${link}/api/obras/cadastro?codigo=${obra.codigo}`, {
            method: 'GET',
        }).then(resp => resp.json()).then((result) => {
            result? (erros.push("Já existe uma obra com esse código!")): null
        })
        
       
        if (erros.length === 0) {
        
                    await fetch(`${link}/api/obras/cadastro`, {
                        method: 'POST',
                        cache: "no-cache",
                        body: JSON.stringify(obra)
                    }).then(resp => resp.json()).then(result => {
                        setObraAdicionada(result)
                        setDesBotAddObra(false)
                        alert("Obra adicionada com sucesso!")
                    })

                }else {
            alert(erros.reduce((anterior, proximo) => `${anterior + proximo}\n`, "Erros: \n"))
            setDesBotAddObra(false)
        }

    }

 

    return (

        <div className='flex w-full mt-5 justify-center'>
            <div className='grid md:grid-cols-3 flex-wrap gap-3 bg-zinc-50 shadow-lg shadow-zinc-400 p-3 rounded-lg'>
                <div className="h-[250px] w-[250px] border-zinc-300 border-2 flex justify-center items-center">
                    {imagem ? (
                        <Image src={imagem} width={250} height={250} alt="Imagem" />
                    ) : (
                        <Uploader atualizarImg={atImg} />
                    )

                    }
                </div>

                <div className="bg-zinc-50 w-full px-2 col-span-1 md:col-span-2">
                    <div className="w-full  mt-2 rounded-md flex flex-col">
                        <input className="p-1 border-2 mb-1" type="text" placeholder="Código da obra"
                            value={obraCodigo}
                            onChange={e => setObraCodigo(e.target.value)} />
                  
                    </div>
                    <div className="w-full  mt-2 rounded-md flex flex-col">
                        <input className="p-1 border-2 mb-1" type="text" placeholder="Nome da obra"
                            value={obraNome}
                            onChange={e => setObraNome(e.target.value)} />
                  
                    </div>
                </div>


                    <button disabled={desatBotAddObra}
                        className=" p-2 border-2 mb-1 mt-3 bg-red-800 hover:bg-red-900 text-white font-bold w-full"
                        onClick={e => addObra({
                            codigo: obraCodigo,
                            imagem_url: imagem ? imagem : "",
                            nome: obraNome

                        })}>Adicionar Obra</button>
                </div>

            </div>


    )
}