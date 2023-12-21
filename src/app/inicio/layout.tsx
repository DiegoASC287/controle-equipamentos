import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";
import Link from "next/link";
import { IconLogin, IconMoodSad } from "@tabler/icons-react";
interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

const cargos = ["Assistente de planejamento", "Gerente de planejamento", "Diretor", "Criador"]

export default async function LayoutPagina({ children }: LayoutProps) {
    const session = await getServerSession(authOptions)
    console.log(cargos.includes(session?.papel ? session?.papel : ""))
    
    function renderizarDados() {
        console.log(session?.papel)
        if (!(session && session.user)) {
            return (
                <div className="bg-zinc-100 h-screen flex justify-center items-center flex-col">
                    
                        <div className=" flex items-center justify-around p-5 w-1/3 rounded-lg shadow-md shadow-zinc-400 h-1/5 text-xl bg-zinc-200">
                            Você não está logado!
                            <Link href={"/auth/signin"}>
                            <IconLogin size={50} className="text-gray-400 hover:text-zinc-600 hover:cursor-pointer" />
                            </Link>
                        </div>
                    <div>{session?.papel}</div>
                    
                    
                </div>
            )
        }
        if (session.papel) {
            if (cargos.includes(session.papel)) {
                return (
                    <div className='flex'>
                        <div className='flex-grow'>{children}</div>
                    </div>
                )
            } else {
                return (<div className="h-screen flex justify-center items-center">
                    <div className=" flex items-center justify-center p-5 w-1/3 rounded-lg shadow-md shadow-zinc-400 h-1/5 text-xl bg-zinc-200">
                        Você não tem permissão para acessar essa área! <IconMoodSad size={200} className="text-gray-400" />
                    </div>
                </div>)
            }
        }

    }

    return renderizarDados()
}