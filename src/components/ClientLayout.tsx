'use client'

import { useEffect } from 'react'
import { useFavoriteStore } from '@/store/favoriteStore'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const setFavorites = useFavoriteStore((state) => state.setFavorites)

  useEffect(() => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [setFavorites])

  return <>{children}</>
}