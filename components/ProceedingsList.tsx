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
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Input
          type="text"
          placeholder="Search proceedings"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex space-x-2">
          <Button onClick={handleSearch} disabled={loading} className="flex-grow sm:flex-grow-0">
            {loading ? 'Loading...' : 'Search'}
          </Button>
          <Button onClick={handleLoadLatest} disabled={loading} variant="outline" className="flex-grow sm:flex-grow-0">
            Load Latest
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="space-y-2">
                <p className="text-sm"><strong>Type:</strong> {proceeding.vorgangstyp}</p>
                <p className="text-sm"><strong>Electoral term:</strong> {proceeding.wahlperiode}</p>
                <p className="text-sm"><strong>Date:</strong> {proceeding.datum}</p>
              </div>
              <Button asChild className="w-full mt-4">
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

