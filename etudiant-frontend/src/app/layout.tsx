// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner' 
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portail Étudiant',
  description: 'Système de gestion des étudiants, départements et formations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className && 'min-h-screen flex flex-col'}>
        <Navbar />
        <div className='flex-1'>
          {children}
        </div>
        <Toaster richColors />
        <footer className="text-center text-sm text-muted-foreground">
        © 2024 Portail Étudiant. Tous droits réservés.
      </footer>
      </body>
    </html>
  )
}