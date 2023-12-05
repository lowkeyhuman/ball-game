import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface GameStore {
  blocksCount: number,
  phase: 'ready' | 'playing' | 'ended',
  start: () => void,
  restart: () => void,
  end: () => void,
}

export default create(subscribeWithSelector<GameStore>((set) => {
  const gameStore: GameStore = {
    blocksCount: 3,
    phase: 'ready',
    start: () => {
      set((state) => {
        if (state.phase == 'ready')
          return {phase: 'playing'}

        return {}
      })
    },
    restart: () => {
      set((state) => {
        if (state.phase == 'playing' || state.phase == 'ended')
          return {phase: 'ready'}

        return {}
      })
    },
    end: () => {
      set((state) => {
        if (state.phase == 'playing')
          return {phase: 'ended'}

        return {}
      })
    },
  }
  return gameStore;
}))