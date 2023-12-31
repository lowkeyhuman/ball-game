import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { DirectionalLight } from "three"

const Lights = () => {
  const lightRef = useRef<DirectionalLight>(null)

  useFrame((state) => {
    const light = lightRef.current
    if (light == null) return

    light.position.z = state.camera.position.z + 1
    light.target.position.z = state.camera.position.z
    light.target.updateMatrixWorld()
  })

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        position={ [ 4, 4, 1 ] }
        intensity={ 4.5 }
        shadow-mapSize={ [ 1024, 1024 ] }
        shadow-camera-near={ 1 }
        shadow-camera-far={ 10 }
        shadow-camera-top={ 10 }
        shadow-camera-right={ 10 }
        shadow-camera-bottom={ - 10 }
        shadow-camera-left={ - 10 }
      />

      <ambientLight intensity={ 1.5 } />
    </>
  )
}

export default Lights