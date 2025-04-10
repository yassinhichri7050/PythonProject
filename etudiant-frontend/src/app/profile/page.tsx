'use client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function ProfilePage() {
  const [etudiant, setEtudiant] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = localStorage.getItem('etudiant')
        if (!localData) {
          toast.error("Veuillez vous connecter")
          return router.push('/login')
        }

        const { _id } = JSON.parse(localData)
        const response = await axios.get(`http://localhost:5000/api/etudiants/${_id}`)
        setEtudiant(response.data)
      } catch (err) {
        toast.error("Erreur de chargement du profil")
        router.push('/login')
      }
    }

    fetchData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('etudiant')
    toast.success("Déconnecté avec succès")
    router.push('/login')
  }

  if (!etudiant) return <div className="max-w-xl mx-auto mt-10 p-4">Chargement...</div>

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Profil de l'Étudiant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><strong>Nom:</strong> {etudiant.nom}</div>
          <div><strong>Email:</strong> {etudiant.email}</div>
          <div>
            <strong>Département:</strong> 
            {etudiant.departement?.nom || "Non spécifié"}
          </div>
          <div>
            <strong>Formations:</strong>
            <ul className="list-disc list-inside ml-4">
              {etudiant.formations?.map((formation: any) => (
                <li key={formation._id}>{formation.titre || formation.nom}</li>
              ))}
            </ul>
          </div>
          <Button variant="destructive" onClick={handleLogout}>
            Se déconnecter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}