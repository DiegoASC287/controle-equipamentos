import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BarraCabecalho from '@/components/BarraCabecalho'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Aahbrant',
  description: 'Plataforma para gerenciamento de epis e máquinas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <Provider>

      <body className={`${inter.className} w-screen flex-grow`}>
      <BarraCabecalho/>
        {children}
        </body>
      </Provider>
    </html>
  )
}
