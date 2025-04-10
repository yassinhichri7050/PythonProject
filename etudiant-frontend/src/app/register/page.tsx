'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import { toast } from 'sonner' 
import { useRouter } from 'next/navigation'; 


export default function RegisterPage() {
  const { register, handleSubmit, setValue } = useForm()
  const [departements, setDepartements] = useState([])
  const [formations, setFormations] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router= useRouter()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDep = await axios.get('http://localhost:5000/api/departements')
        setDepartements(resDep.data)

        const resForm = await axios.get('http://localhost:5000/api/formations')
        setFormations(resForm.data)
      } catch (error) {
        toast.error("Impossible de charger les données.")
      }
    }

    fetchData()
  }, [])

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await axios.post('http://localhost:5000/api/etudiants/register', data)
      toast.success("Étudiant inscrit avec succès !")
      setTimeout(() => router.push('/login'), 500)   
     } catch (err) {
      toast.error("Échec de l'inscription.")
    }finally{
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Inscription Étudiant</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" {...register("nom")} />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" {...register("email")} />
        </div>

        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input type="password" id="password" {...register("motdepasse")} />
        </div>

        <div>
          <Label htmlFor="departement">Département</Label>
          <Select onValueChange={(value) => setValue("departement", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir un département" />
            </SelectTrigger>
            <SelectContent>
              {departements.map((dep: any) => (
                <SelectItem key={dep._id} value={dep._id}>{dep.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="formations">Formations</Label>
          <Select onValueChange={(value) => setValue("formationsInscrites", [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir une formation" />
            </SelectTrigger>
            <SelectContent>
              {formations.map((formation: any) => (
                <SelectItem key={formation._id} value={formation._id}>{formation.titre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
        </Button>      
      </form>
    </div>
  )
}
