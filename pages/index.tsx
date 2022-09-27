import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, Torus } from "@react-three/drei"



const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container" >
      <Canvas>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
        <mesh scale={[0.5, 0.5, 0.5]}>
          <coneGeometry />
          <meshStandardMaterial color={'blue'} wireframe />
        </mesh>
        <Torus />
      </Canvas>
    </div>
  );
};

export default Home
