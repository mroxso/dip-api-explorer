import Link from 'next/link'
import { ProceedingsList } from '@/components/ProceedingsList'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deutscher Bundestag - DIP API Explorer</h1>
        <Button asChild>
          <Link href="/statistics">View Statistics</Link>
        </Button>
      </div>
      <ProceedingsList />
    </div>
  )
}

