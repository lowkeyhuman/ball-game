import { useKeyboardControls } from '@react-three/drei'
import './Interface.css'
import classNames from 'classnames'
import useGame from '../../stores/useGame'
import { useEffect, useRef } from 'react'
import { addEffect } from '@react-three/fiber'

const Interface = () => {
  const forward = useKeyboardControls(state => state.forward)
  const backward = useKeyboardControls(state => state.backward)
  const leftward = useKeyboardControls(state => state.leftward)
  const rightward = useKeyboardControls(state => state.rightward)
  const jump = useKeyboardControls(state => state.jump)

  const restart = useGame(state => state.restart)
  const phase = useGame(state => state.phase)

  const timeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const time = timeRef.current
    if (time == null) return

    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState()
      
      let elapsedTime = 0
      if (state.phase == 'playing') {
        elapsedTime = Date.now() - state.startTime
      }

      if (state.phase == 'ended') {
        elapsedTime = state.endTime - state.startTime
      }

      elapsedTime /= 1000

      time.textContent = elapsedTime.toFixed(2)
    })

    return () => {
      unsubscribeEffect()
    }
  }, [])

  return (
    <div className='interface'>

      <div ref={timeRef} className="time">0.00</div>

      {phase == 'ended' && <div className="restart" onClick={restart}>Restart</div>}

      <div className="controls">
        <div className="raw">
          <div className={classNames('key', forward && 'active')}></div>
        </div>
        <div className="raw">
          <div className={classNames('key', leftward && 'active')}></div>
          <div className={classNames('key', backward && 'active')}></div>
          <div className={classNames('key', rightward && 'active')}></div>
        </div>
        <div className="raw">
          <div className={classNames('key', 'large', jump && 'active')}></div>
        </div>
      </div>

    </div>
  )
}

export default Interface