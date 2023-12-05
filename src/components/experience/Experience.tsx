import Level from "../level/Level"
import Lights from "../lights/Lights"
import { Physics } from "@react-three/rapier"
import Player from "../player/Player"
import useGame from "../../stores/useGame"

const Experience = () => {
  const blocksCount = useGame(state => state.blocksCount)

  return (
    <>
      <Physics>
        <Level count={blocksCount} />
        <Lights />
        <Player /> 
      </Physics>
    </>
  )
}

export default Experience