import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useHelper } from "@react-three/drei"
import { BoxHelper } from "three"

type Props = {
    isTesting: boolean
}


const AnimatedBox: React.FC<Props> = ({ isTesting }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    {
        isTesting ? useHelper(meshRef, BoxHelper, "blue") : null;
    }
    useFrame(() => {
        //console.log('hi');
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.05;
        }
    });

    return (
        <mesh ref={meshRef} scale={[0.5, 0.5, 0.5]}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
    );
};

export default AnimatedBox;