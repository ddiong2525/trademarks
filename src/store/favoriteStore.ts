import { create } from 'zustand'

interface FavoriteStore {
  favorites: string[]
  toggleFavorite: (id: string) => void
  setFavorites: (ids: string[]) => void
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: [],
  toggleFavorite: (id) =>
    set((state) => {
      const exists = state.favorites.includes(id)
      const updated = exists
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id]
      localStorage.setItem('favorites', JSON.stringify(updated))
      return { favorites: updated }
    }),
  setFavorites: (ids) => set({ favorites: ids }),
}))