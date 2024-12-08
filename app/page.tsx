import { ProceedingsList } from '@/components/ProceedingsList'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Deutscher Bundestag - DIP API Explorer</h1>
      <ProceedingsList />
    </div>
  )
}

