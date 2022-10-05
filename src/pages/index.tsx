import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from "@react-three/drei"
import Lights from '../components/Lights'
import Ground from '../components/Ground'
import Trees from '../components/Trees'
import Player from '../components/Player'



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
        <Player />
        <Ground />
      </Canvas>
    </div>
  );
};

export default Home
