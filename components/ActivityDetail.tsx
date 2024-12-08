'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from 'lucide-react'
import { fetchFromAPI, Activity } from '@/utils/api'
import Link from 'next/link'

export function ActivityDetail({ id }: { id: string }) {
  const router = useRouter()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchActivity(id)
    }
  }, [id])

  const fetchActivity = async (activityId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFromAPI(`/aktivitaet/${activityId}`)
      setActivity(response)
    } catch (err) {
      setError('Failed to fetch activity details. Please try again later.')
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

  if (!activity) {
    return <p className="text-gray-500">No activity found.</p>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <CardTitle className="text-2xl font-bold">{activity.titel}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg">Basic Information</h3>
          <p><strong>ID:</strong> {activity.id}</p>
          <p><strong>Type:</strong> {activity.aktivitaetsart}</p>
          <p><strong>Document Type:</strong> {activity.dokumentart}</p>
          <p><strong>Electoral Term:</strong> {activity.wahlperiode}</p>
          <p><strong>Date:</strong> {activity.datum}</p>
          <p><strong>Last Updated:</strong> {activity.aktualisiert}</p>
        </div>

        {activity.abstract && (
          <div>
            <h3 className="font-semibold text-lg">Abstract</h3>
            <p>{activity.abstract}</p>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-lg">Document Source</h3>
          <p><strong>Document Number:</strong> {activity.fundstelle.dokumentnummer}</p>
          <p><strong>Publisher:</strong> {activity.fundstelle.herausgeber}</p>
          <p><strong>Page:</strong> {activity.fundstelle.seite || 'N/A'}</p>
          <Button asChild className="mt-2">
            <a href={activity.fundstelle.pdf_url} target="_blank" rel="noopener noreferrer">View Document</a>
          </Button>
        </div>

        {activity.deskriptor && activity.deskriptor.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Descriptors</h3>
            <ul className="list-disc list-inside">
              {activity.deskriptor.map((descriptor, index) => (
                <li key={index}>{descriptor.name} ({descriptor.typ})</li>
              ))}
            </ul>
          </div>
        )}

        {activity.vorgangsbezug && activity.vorgangsbezug.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Related Proceedings</h3>
            <ul className="list-disc list-inside">
              {activity.vorgangsbezug.map((bezug, index) => (
                <li key={index}>
                  <Link href={`/proceeding/${bezug.id}`} className="hover:underline">
                    {bezug.titel} ({bezug.vorgangstyp})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

