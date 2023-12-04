import { OrbitControls } from "@react-three/drei"
import Level from "../level/Level"
import Lights from "../lights/Lights"
import { Physics } from "@react-three/rapier"
import Player from "../player/Player"

const Experience = () => {
  return (
    <>
      <Physics debug>
        <Level />
        <Lights />
        <Player /> 
      </Physics>

      <OrbitControls makeDefault/>
    </>
  )
}

export default Experience