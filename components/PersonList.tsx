'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchFromAPI, Person } from '@/utils/api'

export function PersonList() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPersons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFromAPI('/person');
      setPersons(response.documents);
    } catch (err) {
      setError('Failed to fetch persons. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadLatest = () => {
    fetchPersons();
  };

  useEffect(() => {
    handleLoadLatest();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleLoadLatest} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {persons.map((person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href={`/person/${person.id}`} className="hover:underline">
                  {person.titel}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm"><strong>Name:</strong> {person.vorname} {person.namenszusatz} {person.nachname}</p>
                <p className="text-sm"><strong>Electoral term:</strong> {person.wahlperiode}</p>
                <p className="text-sm"><strong>Last updated:</strong> {new Date(person.aktualisiert).toLocaleDateString()}</p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href={`/person/${person.id}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {persons.length === 0 && !loading && (
        <p className="text-center text-gray-500">No persons found.</p>
      )}
    </div>
  )
}

