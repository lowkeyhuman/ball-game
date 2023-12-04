import { OrbitControls } from "@react-three/drei"

const Experience = () => {
  return (
    <>
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>

      <OrbitControls makeDefault/>
    </>
  )
}

export default Experience