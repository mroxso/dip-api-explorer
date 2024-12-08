import { PersonList } from '@/components/PersonList'

export default function PersonsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Bundestag Persons</h1>
      <PersonList />
    </div>
  )
}

