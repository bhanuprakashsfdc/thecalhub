import { useState, useEffect, useCallback } from 'react';

export interface HistoryEntry {
  id: string;
  calculator: string;
  inputs: Record<string, string | number>;
  result: string | number;
  timestamp: number;
}

const STORAGE_KEY = 'calc_history';
const MAX_ENTRIES = 50;

export function useCalculatorHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load history from localStorage');
    }
  }, []);

  const addToHistory = useCallback((entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    setHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save history to localStorage');
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(entry => entry.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to update history in localStorage');
      }
      return updated;
    });
  }, []);

  return { history, addToHistory, clearHistory, removeEntry };
}