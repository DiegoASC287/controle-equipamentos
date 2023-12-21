'use client'
import { signUp } from '@/app/actions/users/signUp'
import {useEffect, useState} from 'react'

interface mensagemProps{
  status: "ok" | "erro" | "carregando" | "pronto"
  msg: string
}
export default function SignUpForm(){
    const [mensagem, setMensagem] = useState<mensagemProps>({status: "pronto", msg: ""})
    const [msgFinal, setMsgFinal] = useState<{status: 'erro' | 'carregando' | 'pronto'| 'ok', msgs: string[]}>()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [confirmarSenha, setConfirmarSenha] = useState("")
    
    async function handleSubmit (){
      const erros:mensagemProps[] = []
      if(!data.name || data.name === ""){
        erros.push({status: "erro", msg: "Falta inserir o nome!"})
      }
      
      if(!data.email || data.email === ""){
        erros.push({status: "erro", msg: "Falta inserir o email!"})
      }
      if(!data.password || data.password === ""){
        erros.push({status: "erro", msg: "Falta inserir a senha!"})
      }
      if(data.password !== confirmarSenha){
        erros.push({status: "erro", msg: "As senhas não correspondem!"})
      }
        if(erros.length === 0){

          setMsgFinal({status: 'carregando', msgs:["Carregando ..."]})
          
          const mensagem:mensagemProps = await signUp(data.email, data.password, data.name)
          setMsgFinal({status: mensagem.status, msgs: [mensagem.msg]})
          await setTimeout(() => setMsgFinal({status: 'pronto', msgs: []}), 7000)
        }else{
          setMsgFinal({status: 'erro', msgs: erros.map(e => e.msg )})
          await setTimeout(() => setMsgFinal({status: 'pronto', msgs:[]}), 7000)
        }
      }

      function renderizarStatus(){
        switch (msgFinal?.status){
          case 'pronto': return null;
          case 'carregando': return <div>Carregando...</div>;
          case 'erro': return (
            <ul className='p-1'>
            {msgFinal?.msgs?.map((e, i) => <li className={`bg-red-300`} key={i}>{e}</li>)}
            </ul>
          );
          case 'ok': return (
            <ul className='p-1'>
            {msgFinal?.msgs?.map((e, i) => <li className={`bg-green-400`} key={i}>{e}</li>)}
            </ul>
          )
        }
      }
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col w-full sm:w-1/3 bg-zinc-100 shadow-md shadow-zinc-400 p-3 rounded-lg gap-3'>
          
        <div className='flex flex-col'>
          <div className='w-full flex flex-col item'>

          <label htmlFor="">Nome</label>
          <input type="text" className='p-2' placeholder='Digite seu nome' value={data.name} onChange={ e => setData({...data, name: e.target.value})}/>
          </div >
          <div className='w-full flex flex-col item'>

          <label htmlFor="">Email</label>
          <input type="email" placeholder="email@exemplo.com" className='p-2' value={data.email} onChange={ e => setData({...data, email: e.target.value})}/>
          </div>
          <div className='w-full flex flex-col item'>

          <label htmlFor="">Senha</label>
          <input type="password" className='p-2' value={data.password} onChange={ e => setData({...data, password: e.target.value})}/>
          </div>
          <div className='w-full flex flex-col item'>

          <label htmlFor="">Confirmar senha</label>
          <input type="password" className='p-2' value={confirmarSenha} onChange={ e => setConfirmarSenha(e.target.value)}/>
          </div>

          <button className='bg-red-800 text-white hover:bg-red-900 p-2 mt-4' onClick={handleSubmit}>Cadstrar</button>
          <div></div>
            {renderizarStatus()}
                    </div>
        </div>
      </div>
    )
}