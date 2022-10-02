import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, useTexture } from "@react-three/drei"
import Lights from '../components/Lights'
import Ground from '../components/Ground'
import Trees from '../components/Trees'


const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <OrbitControls />
        <Trees boundary={200} count={40} />
        <Lights />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home
