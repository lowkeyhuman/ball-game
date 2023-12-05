import Level from "../level/Level"
import Lights from "../lights/Lights"
import { Physics } from "@react-three/rapier"
import Player from "../player/Player"
import useGame from "../../stores/useGame"

const Experience = () => {
  const blocksCount = useGame(state => state.blocksCount)
  const blocksSeed = useGame(state => state.blocksSeed)

  return (
    <>
      <color args={['#bdedfc']} attach={'background'} />

      <Physics>
        <Level count={blocksCount} seed={blocksSeed} />
        <Lights />
        <Player /> 
      </Physics>
    </>
  )
}

export default Experience