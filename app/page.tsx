'use client'

import { useState, useCallback } from 'react'
import { ProceedingsList } from '@/components/ProceedingsList'

export default function Home() {
  const [viewTitle, setViewTitle] = useState('Latest Proceedings');

  const handleViewChange = useCallback((title: string) => {
    setViewTitle(title);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Deutscher Bundestag - DIP API Explorer</h1>
      <h2 className="text-xl font-semibold mb-6">{viewTitle}</h2>
      <ProceedingsList onViewChange={handleViewChange} />
    </div>
  )
}

