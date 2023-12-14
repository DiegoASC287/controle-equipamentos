'use client'
import { signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {useEffect, useState} from 'react'

interface MensagemProps{
    status: 'ok' | 'deny' | 'carregando' | 'pronto'
    mensagem: string
}

export default function SignInForm(){

    const router = useRouter()
    const {status} = useSession()
    const [mensagem, setMensagem] = useState<MensagemProps>({status: 'pronto', mensagem: ''})
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {

        if (status === 'authenticated'){
            router.refresh()
            router.push("/inicio/obras")
            router.refresh()
        }
    }, [status])

    async function handleSubmit (){

        try{
            setMensagem({status: "carregando", mensagem: 'Verificando...'})
            const signInResponse = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
            if (!signInResponse || signInResponse.ok !== true){
                setMensagem({status: "deny", mensagem: 'Email ou senha incorreto!'})
            }else{
                router.refresh()
            }
        }catch(err){
            console.log(err)
        }
        
        setTimeout(() => setMensagem({status: 'pronto', mensagem: ''}), 5000)
      }

      function renderizarAviso(){
        switch(mensagem?.status){
            case 'deny': {
                return <div className='w-full bg-red-500 text-white p-2'>{mensagem.mensagem}</div>
            }
            case 'ok': {
                return <div className='w-full bg-green-500 text-white p-2'>{mensagem.mensagem}</div>
            }
            case 'carregando': {
                return <div className='w-full bg-zinc-300 p-2'>{mensagem.mensagem}</div>
            }
        }
      }
    return (
        <div className='flex justify-center items-center h-full'>

        <div className='flex flex-col w-full sm:w-1/3 bg-zinc-100 shadow-md shadow-zinc-400 p-3 rounded-lg gap-3'>
          
          <div className='w-full flex flex-col item'>
            <div className='text-center text-2xl'>Fazer login</div>
          <label htmlFor="">Email</label>
          <input type="email" placeholder="email@exemplo.com" className='p-2' value={data.email} onChange={ e => setData({...data, email: e.target.value})}/>
          </div>
          <div className='w-full flex flex-col'>

          <label htmlFor="">Senha</label>
          <input type="password" className='p-2' value={data.password} onChange={ e => setData({...data, password: e.target.value})}/>
          </div>

          <button className='bg-red-800 text-white hover:bg-red-900 p-2' onClick={handleSubmit}>Login</button>
        <div>
            <p></p>

        {renderizarAviso()}
        </div>
        </div>
        </div>
    )
}