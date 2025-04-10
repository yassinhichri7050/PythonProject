'use client'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('http://localhost:5000/api/etudiants/login', {
        email: data.email,
        motdepasse: data.motdepasse
      })

      if (response.data.success) {
        toast.success('Connexion réussie !')
        

        localStorage.setItem('etudiant', JSON.stringify(response.data.etudiant));         

      setTimeout(() => router.push('/profile'), 1500)
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error("Erreur lors de la connexion")
        console.error("Login error:", err)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Connexion Étudiant</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            {...register("email", { required: true })} 
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="motdepasse">Mot de passe</Label>
          <Input 
            id="motdepasse" 
            type="password" 
            {...register("motdepasse", { required: true })} 
            disabled={isSubmitting}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </div>
  )
}