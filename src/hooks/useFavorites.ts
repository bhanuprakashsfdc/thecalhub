import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'calc_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load favorites from localStorage');
    }
  }, []);

  const toggleFavorite = useCallback((calculatorId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(calculatorId)
        ? prev.filter(id => id !== calculatorId)
        : [...prev, calculatorId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save favorites to localStorage');
      }
      return updated;
    });
  }, []);

  const isFavorite = useCallback((calculatorId: string) => {
    return favorites.includes(calculatorId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
}