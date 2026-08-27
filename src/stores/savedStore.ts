import { create } from 'zustand';
import { Glasses } from '../types';

interface SavedStore {
  savedItems: Glasses[];
  addItem: (item: Glasses) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

export const useSavedStore = create<SavedStore>((set) => ({
  savedItems: [],

  addItem: (item) =>
    set((state) => {
      const alreadySaved = state.savedItems.some(
        (savedItem) => savedItem.id === item.id,
      );

      if (alreadySaved) {
        return state;
      }

      return {
        savedItems: [...state.savedItems, item],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      savedItems: state.savedItems.filter((item) => item.id !== id),
    })),

  clearItems: () =>
    set({
      savedItems: [],
    }),
}));