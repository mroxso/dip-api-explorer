import { ProceedingDetail } from '@/components/ProceedingDetail'

export default function ProceedingPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Proceeding Details</h1>
      <ProceedingDetail id={params.id} />
    </div>
  )
}

