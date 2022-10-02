import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Trees = () => {
    const model = useLoader(GLTFLoader, "./models/mytree2.glb");

    model.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
        }
    });

    //console.log(model);

    return (
        <group position={[0, 1, 0]}>
            <primitive object={model.scene.clone()} />
        </group>
    )
};

export default Trees;