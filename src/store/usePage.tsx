import { create } from 'zustand'

type Store = {
  page: number,
  setPage: (page: number) => void,
}

export const usePage = create<Store>()((set) => ({
    page: 0,
    setPage: (page) => set(() => ({ page })),
}))
