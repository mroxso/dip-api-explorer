import { ProceedingsList } from '@/components/ProceedingsList'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Bundestag Proceedings</h1>
      <ProceedingsList />
    </div>
  )
}

