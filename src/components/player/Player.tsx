import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier"
import { useEffect, useRef } from "react"

const Player = () => {
  const marbleRef = useRef<RapierRigidBody>(null)
  const [subscribeKeys, getKeys] = useKeyboardControls()
  const { rapier, world } = useRapier()

  const jump = () => {
    const marble = marbleRef.current
    if (marble == null) return

    const origin = marble.translation()
    origin.y -= 0.31
    const direction = {x: 0, y: -1, z: 0}
    const ray = new rapier.Ray(origin, direction)
    const hit = world.castRay(ray, 1, true)

    if (hit == null || hit == undefined) return;

    if (hit.toi < 0.15) {
      marble.applyImpulse({x: 0, y: 0.5, z: 0}, true)
    }
  }

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump, 
      (value) => {
        if (value) {
          jump()
        }
      }
    )

    return () => {
      unsubscribeJump()
    }
  }, [])

  useFrame((_, delta) => {
    const marble = marbleRef.current
    if (marble == null) return
    
    const keys = getKeys()

    const impulse = {x: 0, y: 0, z: 0}
    const torque = {x: 0, y:  0, z: 0}

    const impulseStrength = 0.6 * delta
    const torqueStrength = 0.2 * delta

    if (keys.forward) {
      impulse.z -= impulseStrength
      torque.x -= torqueStrength
    }

    if (keys.backward) {
      impulse.z += impulseStrength
      torque.x += torqueStrength
    }

    if (keys.leftward) {
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }

    if (keys.rightward) {
      impulse.x += impulseStrength
      torque.z -= torqueStrength
    }

    marble.applyImpulse(impulse, true)
    marble.applyTorqueImpulse(torque, true)
  })

  return (
    <>
      <RigidBody 
        ref={marbleRef} 
        canSleep={false} 
        colliders='ball' 
        restitution={0.2} 
        friction={1} 
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 1, 0]}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color='mediumpurple' />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Player