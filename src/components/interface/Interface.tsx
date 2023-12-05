import { useKeyboardControls } from '@react-three/drei'
import './Interface.css'
import classNames from 'classnames'
import useGame from '../../stores/useGame'

const Interface = () => {
  const forward = useKeyboardControls(state => state.forward)
  const backward = useKeyboardControls(state => state.backward)
  const leftward = useKeyboardControls(state => state.leftward)
  const rightward = useKeyboardControls(state => state.rightward)
  const jump = useKeyboardControls(state => state.jump)

  const restart = useGame(state => state.restart)
  const phase = useGame(state => state.phase)

  return (
    <div className='interface'>

      <div className="time">0.00</div>

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