import type { NextPage } from 'next'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Stats, useTexture, useGLTF } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Lights from '../components/Lights'
import Ground from '../components/Ground'
import { TreeModel } from '../components/Tree'

const Tree = () => {
  const model = useLoader(GLTFLoader, "./models/mytree2.glb");

  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  //console.log(model);

  return <primitive object={model.scene} />
};


const TexturedSpheres = () => {
  const map = useTexture("./textures/metal_plate_diff_1k.png");
  const normalMap = useTexture("./textures/metal_plate_nor_gl_1k.png");
  const roughnessMap = useTexture("./textures/metal_plate_rough_1k.png");


  return (
    <>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 2, 0]} castShadow>
        <sphereGeometry />
        <meshStandardMaterial map={map}
          normalMap={normalMap}
          roughnessMap={roughnessMap} />
      </mesh>
    </>
  );
};

const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <OrbitControls />
        <TexturedSpheres />
        <Tree />
        <TreeModel position={[4, 1, -4]} />
        <TreeModel position={[-4, 1, 4]} />
        <TreeModel position={[8, 1, -16]} />
        <TreeModel position={[-16, 1, -16]} />
        <Lights />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home
