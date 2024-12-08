import { PersonDetail } from '@/components/PersonDetail'

export default function PersonPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Person Details</h1>
      <PersonDetail id={params.id} />
    </div>
  )
}

