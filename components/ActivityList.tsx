'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchFromAPI, Activity } from '@/utils/api'

export function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewTitle, setViewTitle] = useState('Latest Activities');

  const fetchActivities = async (params: Record<string, string> = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFromAPI('/aktivitaet', params);
      setActivities(response.documents);
    } catch (err) {
      setError('Failed to fetch activities. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchActivities({ 'f.titel': searchTerm });
    setViewTitle(`Search Results: "${searchTerm}"`);
  };

  const handleLoadLatest = () => {
    setSearchTerm('');
    fetchActivities();
    setViewTitle('Latest Activities');
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
          placeholder="Search activities"
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
        {activities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href={`/activity/${activity.id}`} className="hover:underline">
                  {activity.titel}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm"><strong>Type:</strong> {activity.aktivitaetsart}</p>
                <p className="text-sm"><strong>Document Type:</strong> {activity.dokumentart}</p>
                <p className="text-sm"><strong>Date:</strong> {activity.datum}</p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href={`/activity/${activity.id}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {activities.length === 0 && !loading && (
        <p className="text-center text-gray-500">No activities found.</p>
      )}
    </div>
  )
}

