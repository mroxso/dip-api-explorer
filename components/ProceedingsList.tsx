'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchFromAPI } from '@/utils/api'

interface Proceeding {
  id: string;
  titel: string;
  vorgangstyp: string;
  wahlperiode: number;
  datum: string;
}

export function ProceedingsList() {
  const [proceedings, setProceedings] = useState<Proceeding[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewTitle, setViewTitle] = useState('Latest Proceedings');

  const fetchProceedings = async (params: Record<string, string> = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFromAPI('/vorgang', params);
      setProceedings(response.documents);
    } catch (err) {
      setError('Failed to fetch proceedings. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProceedings({ 'f.titel': searchTerm });
    setViewTitle(`Search Results: "${searchTerm}"`);
  };

  const handleLoadLatest = () => {
    setSearchTerm('');
    fetchProceedings();
    setViewTitle('Latest Proceedings');
  };

  useEffect(() => {
    handleLoadLatest();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{viewTitle}</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search proceedings"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </Button>
        <Button onClick={handleLoadLatest} disabled={loading} variant="outline">
          Load Latest
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {proceedings.map((proceeding) => (
          <Card key={proceeding.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href={`/proceeding/${proceeding.id}`} className="hover:underline">
                  {proceeding.titel}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Type:</strong> {proceeding.vorgangstyp}</p>
              <p><strong>Electoral term:</strong> {proceeding.wahlperiode}</p>
              <p><strong>Date:</strong> {proceeding.datum}</p>
              <Button asChild className="mt-4">
                <Link href={`/proceeding/${proceeding.id}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {proceedings.length === 0 && !loading && (
        <p className="text-center text-gray-500">No proceedings found.</p>
      )}
    </div>
  )
}

