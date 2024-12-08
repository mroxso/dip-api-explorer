'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { fetchFromAPI } from '@/utils/api'

interface Proceeding {
  vorgangstyp: string
  wahlperiode: number
  beratungsstand: string
}

interface ChartData {
  name: string
  value: number
}

export function StatisticsPage() {
  const [proceedings, setProceedings] = useState<Proceeding[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProceedings()
  }, [])

  const fetchProceedings = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFromAPI('/vorgang')
      setProceedings(response.documents)
    } catch (err) {
      setError('Failed to fetch proceedings. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const countByProperty = (property: keyof Proceeding) => {
    const counts: Record<string, number> = {}
    proceedings.forEach((proc) => {
      const value = proc[property]
      counts[value] = (counts[value] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }

  const proceedingsByType: ChartData[] = countByProperty('vorgangstyp')
  const proceedingsByTerm: ChartData[] = countByProperty('wahlperiode')
  const proceedingsByStatus: ChartData[] = countByProperty('beratungsstand')

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Proceedings by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={proceedingsByType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proceedings by Electoral Term</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={proceedingsByTerm}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proceedings by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={proceedingsByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Button onClick={fetchProceedings}>Refresh Data</Button>
    </div>
  )
}

