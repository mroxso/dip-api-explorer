import { ActivityList } from '@/components/ActivityList'

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Bundestag Activities</h1>
      <ActivityList />
    </div>
  )
}

