import { create } from 'zustand';

interface PaginationState {
    skip: number;
    limit: number;
    setSkip: (skip: number) => void;
    setLimit: (limit: number) => void;
    reset: () => void;
}

const DEFAULT_LIMIT = 10;

export const usePaginationStore = create<PaginationState>((set) => ({
    skip: 0,
    limit: DEFAULT_LIMIT,
    setSkip: (skip) => set({ skip }),
    setLimit: (limit) => set({ limit }),
    reset: () => set({ skip: 0, limit: DEFAULT_LIMIT }),
}));
