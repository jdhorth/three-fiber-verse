import type { NextPage } from 'next'
import { Canvas, useThree } from '@react-three/fiber'
import AnimatedBox from '../components/AnimatedBox'
import { OrbitControls } from "@react-three/drei"
import { useEffect } from 'react'

// const CameraOrbitController = () => {
//   const { camera, gl } = useThree();

//   useEffect(() => {
//     const controls = new OrbitControls(camera, gl.domElement);
//     return () => {
//       controls.dispose();
//     }
//   }, [camera, gl]);
//   return null;
// }


const Home: NextPage = () => {
  return (
    <div className="container" >
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <AnimatedBox />
      </Canvas>
    </div>
  );
};

export default Home
