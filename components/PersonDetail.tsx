'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from 'lucide-react'
import { fetchFromAPI, Person } from '@/utils/api'

export function PersonDetail({ id }: { id: string }) {
  const router = useRouter()
  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchPerson(id)
    }
  }, [id])

  const fetchPerson = async (personId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFromAPI(`/person/${personId}`)
      setPerson(response)
    } catch (err) {
      setError('Failed to fetch person details. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!person) {
    return <p className="text-gray-500">No person found.</p>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <CardTitle className="text-2xl font-bold">{person.titel}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg">Basic Information</h3>
          <p><strong>ID:</strong> {person.id}</p>
          <p><strong>Name:</strong> {person.vorname} {person.namenszusatz} {person.nachname}</p>
          <p><strong>Type:</strong> {person.typ}</p>
          <p><strong>Electoral Term:</strong> {person.wahlperiode}</p>
          <p><strong>Base Date:</strong> {person.basisdatum}</p>
          <p><strong>Last Date:</strong> {person.datum}</p>
          <p><strong>Last Updated:</strong> {new Date(person.aktualisiert).toLocaleString()}</p>
        </div>

        {person.person_roles && person.person_roles.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Roles</h3>
            {person.person_roles.map((role, index) => (
              <div key={index} className="mb-4 p-4 rounded-lg">
                <p><strong>Function:</strong> {role.funktion}</p>
                {role.funktionszusatz && <p><strong>Additional Function:</strong> {role.funktionszusatz}</p>}
                {role.fraktion && <p><strong>Faction:</strong> {role.fraktion}</p>}
                {/* only if defined */}
                {role.wahlperiode_nummer && <p><strong>Electoral Terms:</strong> {role.wahlperiode_nummer.join(', ')}</p>}
                {/* <p><strong>Electoral Terms:</strong> {role.wahlperiode_nummer.join(', ')}</p> */}
                {role.wahlkreiszusatz && <p><strong>Constituency:</strong> {role.wahlkreiszusatz}</p>}
                {role.ressort_titel && <p><strong>Department:</strong> {role.ressort_titel}</p>}
                {role.bundesland && <p><strong>Federal State:</strong> {role.bundesland}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

