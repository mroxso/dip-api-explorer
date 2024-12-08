import { ActivityDetail } from '@/components/ActivityDetail'

export default function ActivityPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Activity Details</h1>
      <ActivityDetail id={params.id} />
    </div>
  )
}

