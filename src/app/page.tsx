'use client'
import link from './pathspers'
import { replace } from 'lodash'
import {useEffect, useState} from 'react'
export default function Home() {
 /* const [lista, setLista] = useState<string>()
  
  useEffect(() => {
    fetch('tipos_maquinas.csv', {cache: 'no-store'}).then(e => e.text()).then(res => {
      setLista(res)})

    
}, [])
useEffect(() => {
  const listaSep = lista?.replaceAll("\r", "").split("\n").map(e => e.split(";"))
  const itens = listaSep?.map(e => {return {tipo_veiculo: e[0], manutencao: e[1], intervalo: Number(e[2]), unidade: e[3]}})
  console.log(itens)
  fetch(`${link}/api/maquinas/consultatemplateman`, {
    method: 'POST',
    body: JSON.stringify(itens)
}).then(resp => resp.json()).then(resultado => {
    console.log(resultado)})

}, [lista])*/
  return (
    <>
<div>Tesaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaate</div>
    </>
    
  )
}
