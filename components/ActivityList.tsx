'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchFromAPI, Activity } from '@/utils/api'
import NodeCache from 'node-cache'

// Initialize the cache
const cache = new NodeCache({ stdTTL: 300 });

export function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFromAPI('/aktivitaet');
      setActivities(response.documents);
    } catch (err) {
      setError('Failed to fetch activities. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadLatest = () => {
    fetchActivities();
  };

  const handleClearCache = () => {
    cache.flushAll();
    handleLoadLatest();
  };

  useEffect(() => {
    handleLoadLatest();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Latest Activities</h2>
        <div className="space-x-2">
          <Button onClick={handleLoadLatest} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
          <Button onClick={handleClearCache} disabled={loading} variant="secondary">
            Clear Cache
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

