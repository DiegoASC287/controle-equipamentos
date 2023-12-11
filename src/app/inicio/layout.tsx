import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";
import Link from "next/link";
import BarraLateralHome from "@/components/BarraLateralHome";
interface LayoutProps{
    children: React.ReactNode | React.ReactNode[] 
}
export default async function LayoutPagina({children}: LayoutProps){
    const session = await getServerSession(authOptions)

    return (!session || !session?.user)? (
        <div className="bg-zinc-100 h-screen flex justify-center items-center flex-col">
            <div >Você não está logado!</div>
            <Link href={"/auth/signin"}>
            <div className="hover:text-blue-900">Clique aqui para fazer login</div>
            </Link>
            </div>
    ): (<div className='flex'>
    <BarraLateralHome/>
    <div className='flex-grow'>{children}</div>
    </div>)
}