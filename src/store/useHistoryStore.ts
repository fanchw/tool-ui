import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HistoryItem } from '@/types';

interface HistoryStore {
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  removeHistory: (id: string) => void;
  getHistoryByTool: (toolId: string) => HistoryItem[];
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      addHistory: (item) => {
        const newItem: HistoryItem = {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
        };
        set((state) => ({
          history: [newItem, ...state.history].slice(0, 100), // 最多保存 100 条
        }));
      },
      clearHistory: () => set({ history: [] }),
      removeHistory: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      getHistoryByTool: (toolId) => {
        return get().history.filter((item) => item.toolId === toolId);
      },
    }),
    {
      name: 'history-storage',
    }
  )
);