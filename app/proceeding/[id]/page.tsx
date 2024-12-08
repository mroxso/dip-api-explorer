import { ProceedingDetail } from '@/components/ProceedingDetail'

export default function ProceedingPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Proceeding Details</h1> {/* Updated heading style */}
      <ProceedingDetail id={params.id} />
    </div>
  )
}

