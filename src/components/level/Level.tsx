import { useGLTF } from "@react-three/drei"
import { ObjectMap, useFrame } from "@react-three/fiber"
import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({color: 'limegreen'})
const floor2Material = new THREE.MeshStandardMaterial({color: 'greenyellow'})
const obstacleMaterial = new THREE.MeshStandardMaterial({color: 'orangered'})
const wallMaterial = new THREE.MeshStandardMaterial({color: 'slategrey'})

interface BlockProps {
  position?: [number, number, number]
}

function BlockStart({position = [0, 0, 0]}: BlockProps) {
  return (
    <group position={position}>
      <mesh 
        geometry={boxGeometry} material={floor1Material}
        position={[0, -0.1, 0]} scale={[4, 0.2, 4]} 
        receiveShadow />
    </group>
  )
}

type GLTFBurgerResult = GLTF & ObjectMap & {
  nodes: {
    scene: THREE.Group
  }
}

function BlockEnd({position = [0, 0, 0]}: BlockProps) {
  const burger = useGLTF('./models/hamburger.glb') as GLTFBurgerResult;

  burger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  })

  return (
    <group position={position}>
      <mesh 
        geometry={boxGeometry} material={floor1Material}
        position={[0, 0, 0]} scale={[4, 0.2, 4]} 
        receiveShadow />

      <RigidBody type='fixed' colliders='hull' position={[0, 0.25, 0]} restitution={ 0.2 } friction={ 0 }>
        <primitive object={burger.scene} scale={ 0.2 } />
      </RigidBody>
    </group>
  )
}

function BlockSpinner({position = [0, 0, 0]}: BlockProps) {
  const obstacleRef = useRef<RapierRigidBody>(null);
  const [ speed ] = useState(() => (Math.random() + 0.3) * (Math.random() < 0.5 ? -1 : 1));

  useFrame((state) => {
    const obstacle = obstacleRef.current;
    if (obstacle == null) return;

    const time = state.clock.getElapsedTime()
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.setNextKinematicRotation(rotation);
  })

  return (
    <group position={position}>
      <mesh 
        geometry={boxGeometry} material={floor2Material}
        position={[0, -0.1, 0]} scale={[4, 0.2, 4]} 
        receiveShadow />

      <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh 
          geometry={boxGeometry} material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow receiveShadow
          />
      </RigidBody>

    </group>
  )
}

function BlockLimbo({position = [0, 0, 0]}: BlockProps) {
  const obstacleRef = useRef<RapierRigidBody>(null);
  const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const obstacle = obstacleRef.current;
    if (obstacle == null) return;

    const time = state.clock.getElapsedTime()
    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.setNextKinematicTranslation({x: position[0], y: position[1] + y, z: position[2]});
  })

  return (
    <group position={position}>
      <mesh 
        geometry={boxGeometry} material={floor2Material}
        position={[0, -0.1, 0]} scale={[4, 0.2, 4]} 
        receiveShadow />

      <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh 
          geometry={boxGeometry} material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow receiveShadow
          />
      </RigidBody>

    </group>
  )
}

function BlockAxe({position = [0, 0, 0]}: BlockProps) {
  const obstacleRef = useRef<RapierRigidBody>(null);
  const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const obstacle = obstacleRef.current;
    if (obstacle == null) return;

    const time = state.clock.getElapsedTime()
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.setNextKinematicTranslation({x: position[0] + x, y: position[1] + 1.5/2, z: position[2]});
  })

  return (
    <group position={position}>
      <mesh 
        geometry={boxGeometry} material={floor2Material}
        position={[0, -0.1, 0]} scale={[4, 0.2, 4]} 
        receiveShadow />

      <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh 
          geometry={boxGeometry} material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow receiveShadow
          />
      </RigidBody>

    </group>
  )
}

interface BoundsProps {
  length: number
}

function Bounds({length = 1}: BoundsProps) {
  return (
    <>
      <RigidBody type='fixed' restitution={0.2} friction={0}>
        <mesh 
          position={[2.15, 0.75, -(length*2) + 2]}
          geometry={boxGeometry} material={wallMaterial}
          scale={[0.3, 1.5, 4*length]}
          castShadow
        />
        <mesh 
          position={[-2.15, 0.75, -(length*2) + 2]}
          geometry={boxGeometry} material={wallMaterial}
          scale={[0.3, 1.5, 4*length]}
          receiveShadow
        />
        <mesh 
          position={[0, 0.75, -(length*4) + 2]}
          geometry={boxGeometry} material={wallMaterial}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />
        <CuboidCollider 
          args={[2, 0.1, 2*length]} 
          position={[0, -0.1, -(length*2) + 2]}
          restitution={0.2} friction={1}
        />
      </RigidBody>
    </>
  )
}

interface Props {
  count?: number,
  types?: (({ position }: BlockProps) => JSX.Element)[],
  seed?: number
}

const Level = ({count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo], seed = 0}: Props) => {
  const blocks = useMemo(() => {
    const blocks: (({ position }: BlockProps) => JSX.Element)[] = []

    for (let i=0; i<count; i++) {
      const type = types[ Math.floor( Math.random() * types.length ) ]
      blocks.push(type)
    }

    return blocks
  }, [count, types, seed])

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      { blocks.map((Block, index) => <Block key={ index } position={[0, 0, -4 * (index + 1)]} />) }

      <BlockEnd position={[0, 0, -4 * (count + 1)]} />

      <Bounds length={count+2}/>
    </>
  )
}

export default Level