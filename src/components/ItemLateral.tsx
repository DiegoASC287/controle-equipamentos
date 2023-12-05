import Link from "next/link"
interface ItemLateralProps{
    icone: any
    texto: string
    href: string
}
export default function ItemLateral(props: ItemLateralProps){
    return (
        <Link href={props.href} passHref>

        <button className=" text-red-800 pb-2 pt-2 hover:text-red-600 w-full flex flex-col items-center justify-center px-1 border-zinc-300 mx ">
            <span>{props.icone}</span>
            {props.texto}
            </button>
        </Link>
    )
}