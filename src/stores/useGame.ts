import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface GameStore {
  blocksCount: number,
  startTime: number,
  endTime: number,
  phase: 'ready' | 'playing' | 'ended',
  start: () => void,
  restart: () => void,
  end: () => void,
}

export default create(subscribeWithSelector<GameStore>((set) => {
  const gameStore: GameStore = {
    blocksCount: 3,
    startTime: 0,
    endTime: 0,
    phase: 'ready',
    start: () => {
      set((state) => {
        if (state.phase == 'ready')
          return {phase: 'playing', startTime: Date.now()}

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
          return {phase: 'ended', endTime: Date.now()}

        return {}
      })
    },
  }
  return gameStore;
}))