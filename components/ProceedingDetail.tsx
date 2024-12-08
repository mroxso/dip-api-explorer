'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from 'lucide-react'
import { fetchFromAPI } from '@/utils/api'

interface Proceeding {
  id: string;
  titel: string;
  vorgangstyp: string;
  wahlperiode: number;
  datum: string;
  abstract?: string;
  sachgebiet?: string[];
  deskriptor?: Array<{ name: string }>;
}

export function ProceedingDetail({ id }: { id: string }) {
  const router = useRouter()
  const [proceeding, setProceeding] = useState<Proceeding | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchProceeding(id)
    }
  }, [id])

  const fetchProceeding = async (proceedingId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFromAPI(`/vorgang/${proceedingId}`)
      setProceeding(response)
    } catch (err) {
      setError('Failed to fetch proceeding details. Please try again later.')
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

  if (!proceeding) {
    return <p className="text-gray-500">No proceeding found.</p>
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <CardTitle className="text-2xl font-bold">{proceeding.titel}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Type</h3>
          <p>{proceeding.vorgangstyp}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Electoral Term</h3>
          <p>{proceeding.wahlperiode}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Date</h3>
          <p>{proceeding.datum}</p>
        </div>
        {proceeding.abstract && (
          <div>
            <h3 className="font-semibold text-lg">Abstract</h3>
            <p>{proceeding.abstract}</p>
          </div>
        )}
        {proceeding.sachgebiet && proceeding.sachgebiet.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Subject Areas</h3>
            <ul className="list-disc list-inside">
              {proceeding.sachgebiet.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </div>
        )}
        {proceeding.deskriptor && proceeding.deskriptor.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Descriptors</h3>
            <ul className="list-disc list-inside">
              {proceeding.deskriptor.map((descriptor, index) => (
                <li key={index}>{descriptor.name}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

