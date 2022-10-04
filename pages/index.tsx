import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, useAnimations, useGLTF, useTexture } from "@react-three/drei"
import Lights from '../components/Lights'
import Ground from '../components/Ground'
import Trees from '../components/Trees'
import { useEffect } from 'react'

const MyPlayer = () => {
  const model = useGLTF("./models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);

  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  console.log(model);

  useEffect(() => {
    actions?.run?.play();
  }, []);

  return <primitive object={model.scene} />
}


const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows camera={{ position: [-8, 12, -26], fov: 75, near: 0.1, far: 1000 }}>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <OrbitControls />
        <Trees boundary={200} count={40} />
        <Lights />
        <MyPlayer />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home
