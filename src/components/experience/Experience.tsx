import { OrbitControls } from "@react-three/drei"
import Level from "../level/Level"
import Lights from "../lights/Lights"

const Experience = () => {
  return (
    <>
      <Level />
      <Lights />

      <OrbitControls makeDefault/>
    </>
  )
}

export default Experience