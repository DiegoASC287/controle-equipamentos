import {IconLogin, IconLogout, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/lib/authOptions";

export default async function BarraCabecalho(){
    const session = await getServerSession(authOptions)
    return (
        <div className={`h-[50px] flex justify-between bg-red-900 border-b-1 border-zinc-500`}>
            <div className="flex justify-start items-center gap-10 px-2 text-white">
            <Image  src="/imgs/logo.png" alt="Logo" width={200} height={50}/>
            <Link href={"/inicio/obras"} passHref>
            <span className="hover:border-b-2 border-white ">Obras</span>
            </Link>
            </div>
            <div className="flex items-center px-5 text-white gap-5 font-bold">
            <span className="hidden sm:inline">{session && session.user?.name}</span>
            
            {session?.user? (
                <>
                <IconUserCircle size="30px" color="white"/>
                <Link href={"/auth/signout"}>
                <button className="flex gap-3 items-center">
                <span>Sair</span>
                <IconLogout size="20" color="white"/>
                </button>
                </Link>
                </>
            ): (
                <Link href={"/auth/signin"}>
                <button className="flex gap-3 items-center">
                <span>Entrar</span>
                <IconLogin size="20" color="white"/>
                </button>
                </Link>
                )}
            </div>
            
        </div>
    )
}
