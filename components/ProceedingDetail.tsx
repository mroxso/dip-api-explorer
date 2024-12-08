'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from 'lucide-react'
import { fetchFromAPI } from '@/utils/api'

interface Vorgang {
  id: string;
  typ: string;
  beratungsstand: string;
  vorgangstyp: string;
  wahlperiode: number;
  initiative: string[];
  datum: string;
  aktualisiert: string;
  titel: string;
  abstract: string;
  sachgebiet: string[];
  deskriptor: Array<{ name: string; typ: string; fundstelle: boolean }>;
  gesta: string;
  zustimmungsbeduerftigkeit: string[];
  kom: string;
  ratsdok: string;
  verkuendung: Array<{
    jahrgang: string;
    seite: string;
    ausfertigungsdatum: string;
    verkuendungsdatum: string;
    einleitungstext: string;
    fundstelle: string;
  }>;
  inkrafttreten: Array<{
    datum: string;
    erlaeuterung: string;
  }>;
  archiv: string;
  mitteilung: string;
  vorgang_verlinkung: Array<{
    id: string;
    verweisung: string;
    titel: string;
    wahlperiode: number;
    gesta: string;
  }>;
  sek: string;
}

export function ProceedingDetail({ id }: { id: string }) {
  const router = useRouter()
  const [proceeding, setProceeding] = useState<Vorgang | null>(null)
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <CardTitle className="text-2xl font-bold">{proceeding.titel}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg">Basic Information</h3>
          <p><strong>ID:</strong> {proceeding.id}</p>
          <p><strong>Type:</strong> {proceeding.typ}</p>
          <p><strong>Proceeding Type:</strong> {proceeding.vorgangstyp}</p>
          <p><strong>Electoral Term:</strong> {proceeding.wahlperiode}</p>
          <p><strong>Date:</strong> {proceeding.datum}</p>
          <p><strong>Last Updated:</strong> {proceeding.aktualisiert}</p>
          <p><strong>Status:</strong> {proceeding.beratungsstand}</p>
        </div>

        {proceeding.abstract && (
          <div>
            <h3 className="font-semibold text-lg">Abstract</h3>
            <p>{proceeding.abstract}</p>
          </div>
        )}

        {proceeding.initiative && proceeding.initiative.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Initiative</h3>
            <ul className="list-disc list-inside">
              {proceeding.initiative.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
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
                <li key={index}>
                  {descriptor.name} ({descriptor.typ})
                  {descriptor.fundstelle && " (Fundstelle)"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {proceeding.gesta && (
          <div>
            <h3 className="font-semibold text-lg">GESTA</h3>
            <p>{proceeding.gesta}</p>
          </div>
        )}

        {proceeding.zustimmungsbeduerftigkeit && proceeding.zustimmungsbeduerftigkeit.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Consent Requirements</h3>
            <ul className="list-disc list-inside">
              {proceeding.zustimmungsbeduerftigkeit.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {proceeding.kom && (
          <div>
            <h3 className="font-semibold text-lg">KOM-Nr.</h3>
            <p>{proceeding.kom}</p>
          </div>
        )}

        {proceeding.ratsdok && (
          <div>
            <h3 className="font-semibold text-lg">Ratsdok-Nr.</h3>
            <p>{proceeding.ratsdok}</p>
          </div>
        )}

        {proceeding.verkuendung && proceeding.verkuendung.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Promulgation</h3>
            {proceeding.verkuendung.map((item, index) => (
              <div key={index} className="mb-2">
                <p><strong>Year:</strong> {item.jahrgang}</p>
                <p><strong>Page:</strong> {item.seite}</p>
                <p><strong>Date of Issue:</strong> {item.ausfertigungsdatum}</p>
                <p><strong>Date of Promulgation:</strong> {item.verkuendungsdatum}</p>
                <p><strong>Introductory Text:</strong> {item.einleitungstext}</p>
                <p><strong>Source:</strong> {item.fundstelle}</p>
              </div>
            ))}
          </div>
        )}

        {proceeding.inkrafttreten && proceeding.inkrafttreten.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Entry into Force</h3>
            {proceeding.inkrafttreten.map((item, index) => (
              <div key={index} className="mb-2">
                <p><strong>Date:</strong> {item.datum}</p>
                <p><strong>Explanation:</strong> {item.erlaeuterung}</p>
              </div>
            ))}
          </div>
        )}

        {proceeding.archiv && (
          <div>
            <h3 className="font-semibold text-lg">Archive Signature</h3>
            <p>{proceeding.archiv}</p>
          </div>
        )}

        {proceeding.mitteilung && (
          <div>
            <h3 className="font-semibold text-lg">Notice</h3>
            <p>{proceeding.mitteilung}</p>
          </div>
        )}

        {proceeding.vorgang_verlinkung && proceeding.vorgang_verlinkung.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg">Related Proceedings</h3>
            {proceeding.vorgang_verlinkung.map((item, index) => (
              <div key={index} className="mb-2">
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Reference:</strong> {item.verweisung}</p>
                <p><strong>Title:</strong> {item.titel}</p>
                <p><strong>Electoral Term:</strong> {item.wahlperiode}</p>
                {item.gesta && <p><strong>GESTA:</strong> {item.gesta}</p>}
              </div>
            ))}
          </div>
        )}

        {proceeding.sek && (
          <div>
            <h3 className="font-semibold text-lg">SEK-Nr.</h3>
            <p>{proceeding.sek}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

