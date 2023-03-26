import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useInput } from "../hooks/useInput";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({ forward, backward, left, right }) => {
    var directionOffset = 0; // w

    if (forward) {
        if (left) {
            directionOffset = Math.PI / 4; //w+a
        } else if (right) {
            directionOffset = -Math.PI / 4; //w+d
        }
    } else if (backward) {
        if (left) {
            directionOffset = Math.PI / 4 + Math.PI / 2; //s+a
        } else if (right) {
            directionOffset = -Math.PI / 4 - Math.PI / 2; //s+d
        } else {
            directionOffset = Math.PI; //s
        }
    } else if (left) {
        directionOffset = Math.PI / 2; //a
    } else if (right) {
        directionOffset = -Math.PI / 2; //d
    }

    return directionOffset;
}

const Player = () => {
    const { forward, backward, left, right, jump, shift } = useInput();
    const model = useGLTF("./models/player.glb");
    const { actions } = useAnimations(model.animations, model.scene);

    model.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
        }
    });

    //console.log(model);

    const currentAction = useRef("");
    const controlsRef = useRef<typeof OrbitControls>();
    const camera = useThree((state) => state.camera);

    const updateCameraTarget = (moveX: number, moveZ: number) => {
        // move camera
        camera.position.x += moveX;
        camera.position.z += moveZ;

        // update camera target
        cameraTarget.x = model.scene.position.x;
        cameraTarget.y = model.scene.position.y + 2;
        cameraTarget.z = model.scene.position.z;
        if (controlsRef.current) controlsRef.current.target = cameraTarget;
    };

    useEffect(() => {
        let action = "";

        if (forward || backward || left || right) {
            action = "run";
            if (shift) {
                action = "jump";
            }
        } else if (jump) {
            action = "jump";
        } else {
            action = "idle";
        }

        if (currentAction.current != action) {
            const nextActionToPlay = actions[action];
            const current = actions[currentAction.current];
            current?.fadeOut(0.2);
            nextActionToPlay?.reset().fadeIn(0.2).play();
            currentAction.current = action;
        }

        //actions?.run?.play();
        // console.log("forward: ", forward);
        // console.log("backward: ", backward);
        // console.log("left: ", left);
        // console.log("right: ", right);
        // console.log("jump: ", jump);
        // console.log("shift: ", shift);
    }, [forward, backward, left, right, jump, shift]);

    useFrame((state, delta) => {
        if (
            currentAction.current == "run" ||
            currentAction.current == "jump"
        ) {
            // calculate towards camera direction
            let angleYCameraDirection = Math.atan2(
                camera.position.x - model.scene.position.x,
                camera.position.z - model.scene.position.z
            );

            // diagonal movement angle offset
            let newDirectionOffset = directionOffset({
                forward,
                backward,
                left,
                right,
            });

            // rotate model
            rotateQuaternion.setFromAxisAngle(
                rotateAngle,
                angleYCameraDirection + newDirectionOffset
            );
            model.scene.quaternion.rotateTowards(rotateQuaternion, 0.2);

            // calculate direction
            camera.getWorldDirection(walkDirection);
            walkDirection.y = 0;
            walkDirection.normalize();
            walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

            // run / walk velocity
            const velocity = currentAction.current == "run" ? 10 : 5;

            // move model & camera
            const moveX = walkDirection.x * velocity * delta;
            const moveZ = walkDirection.z * velocity * delta;
            model.scene.position.x += moveX;
            model.scene.position.z += moveZ;
            updateCameraTarget(moveX, moveZ);
        }
    });

    return (
        <>
            <OrbitControls ref={controlsRef} />
            <primitive object={model.scene} />
        </>

    )
};

export default Player;