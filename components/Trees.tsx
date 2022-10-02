import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type treeType = {
    position: { x: number; z: number };
    box: number;
}

type props = {
    boundary: number;
    count: number;
}

const Trees: React.FC<props> = ({ boundary, count }) => {
    const model = useLoader(GLTFLoader, "./models/mytree2.glb");
    const [trees, setTrees] = useState<treeType[]>([]);

    model.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
        }
    });

    const updatePosition = (treeArray: treeType[], boundary: number) => {
        treeArray.forEach((tree, index) => {
            tree.position.x = Math.random() * 50;
            tree.position.y = Math.random() * 50;
        });
        setTrees(treeArray);
    };

    useEffect(() => {
        const tempTrees: treeType[] = [];
        for (let i = 0; i < count; i++) {
            tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
        }
        console.log(tempTrees);
        updatePosition(tempTrees, boundary);
    }, [boundary, count]);



    //console.log(model);

    return (
        <group position={[0, 1, 0]}>
            {trees.map((tree, index) => {
                return (
                    <object3D key={index} position={[tree.position.x, 0.5, tree.position.y]}>
                        <primitive object={model.scene.clone()} />
                    </object3D>
                );
            })}
        </group>
    )
};

export default Trees;