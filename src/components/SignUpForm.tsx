'use client'
import { signUp } from '@/app/actions/users/signUp'
import {useState} from 'react'
export default function SignUpForm(){
    const [mensagem, setMensagem] = useState("")
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    async function handleSubmit (){
      console.log('Criando usuario')
        setMensagem("Criando usuário")
        const mensagem = await signUp(data.email, data.password, data.name)
        setMensagem(mensagem)
        setTimeout(() => setMensagem(""), 5000)
      }
    return (
      <div className='flex justify-center items-center h-full'>
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

          <button className='bg-red-800 text-white hover:bg-red-900 p-2' onClick={handleSubmit}>Cadstrar</button>
          <div></div>
          <p>{mensagem}</p>
        </div>
        </div>
      </div>
    )
}