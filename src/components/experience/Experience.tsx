import Level from "../level/Level"
import Lights from "../lights/Lights"
import { Physics } from "@react-three/rapier"
import Player from "../player/Player"

const Experience = () => {
  return (
    <>
      <Physics>
        <Level />
        <Lights />
        <Player /> 
      </Physics>
    </>
  )
}

export default Experience