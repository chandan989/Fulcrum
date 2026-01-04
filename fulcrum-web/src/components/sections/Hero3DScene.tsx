import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles({ count = 150 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const position = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 25;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 10;
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        // Rotate slightly
        mesh.current.rotation.y += 0.0005;
        mesh.current.rotation.z += 0.0005;

        // Pulse effect
        const t = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            dummy.position.set(
                position[i * 3],
                position[i * 3 + 1] + Math.sin(t + position[i * 3]) * 0.2,
                position[i * 3 + 2]
            );
            const scale = 0.05 + Math.sin(t * 1.5 + i) * 0.02;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <icosahedronGeometry args={[0.15, 0]} />
            {/* Primary Orange for particles */}
            <meshBasicMaterial color="#ff4500" transparent opacity={0.6} />
        </instancedMesh>
    );
}

function ConnectionLines() {
    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh scale={3}>
                    <icosahedronGeometry args={[1, 1]} />
                    {/* Secondary Blue, very subtle wireframe */}
                    <meshBasicMaterial color="#0066cc" wireframe transparent opacity={0.15} />
                </mesh>
            </Float>
            <Float speed={3} rotationIntensity={1} floatIntensity={0.2}>
                <mesh scale={5} rotation={[0.5, 0.5, 0]}>
                    <icosahedronGeometry args={[1, 0]} />
                    {/* Darker wireframe for structure, muted */}
                    <meshBasicMaterial color="#333333" wireframe transparent opacity={0.08} />
                </mesh>
            </Float>
        </group>
    )
}

export function Hero3DScene() {
    return (
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                {/* Transparent background to let CSS background show through */}
                <color attach="background" args={["transparent"]} />

                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff4500" />

                <Particles />
                <ConnectionLines />

                {/* Fog to fade out deep elements into the white background */}
                <fog attach="fog" args={['#ffffff', 5, 20]} />
            </Canvas>
        </div>
    );
}
