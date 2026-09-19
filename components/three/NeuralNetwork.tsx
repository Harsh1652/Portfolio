"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Nodes({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const { viewport } = useThree();

  const nodes = useMemo(() => {
    const count = 40;
    return Array.from({ length: count }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.001
      ),
      id: i,
    }));
  }, []);

  const geometry = useMemo(() => new THREE.SphereGeometry(0.04, 8, 8), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: "#818cf8" }), []);

  // Line buffer is allocated once (worst case: every pair connected) and refilled in place each frame
  const maxSegments = (nodes.length * (nodes.length - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxSegments * 6), [maxSegments]);
  const lineGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    g.setDrawRange(0, 0);
    return g;
  }, [linePositions]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mouseInfluence = useMemo(() => new THREE.Vector3(), []);
  const repel = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mouseInfluence.set(mousePos.current.x * viewport.width * 0.3, mousePos.current.y * viewport.height * 0.3, 0);

    nodes.forEach((node, i) => {
      node.position.add(node.velocity);

      if (Math.abs(node.position.x) > 3) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 3) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 1.5) node.velocity.z *= -1;

      const dist = node.position.distanceTo(mouseInfluence);
      if (dist < 1.5) {
        repel.copy(node.position).sub(mouseInfluence).normalize().multiplyScalar(0.002);
        node.velocity.add(repel);
      }

      dummy.position.copy(node.position);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;

    const thresholdSq = 1.8 * 1.8;
    let n = 0;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i].position;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j].position;
        if (a.distanceToSquared(b) < thresholdSq) {
          linePositions[n++] = a.x; linePositions[n++] = a.y; linePositions[n++] = a.z;
          linePositions[n++] = b.x; linePositions[n++] = b.y; linePositions[n++] = b.z;
        }
      }
    }
    lineGeometry.setDrawRange(0, n / 3);
    lineGeometry.attributes.position.needsUpdate = true;

    if (linesRef.current?.material instanceof THREE.LineBasicMaterial) {
      linesRef.current.material.opacity = 0.15 + Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[geometry, material, nodes.length]}>
        <meshBasicMaterial color="#818cf8" />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry} frustumCulled={false}>
        <lineBasicMaterial color="#818cf8" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

function CentralOrb({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    meshRef.current.position.x = mousePos.current.x * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial
        color="#818cf8"
        emissive="#4338ca"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ring1Ref.current.rotation.x = t * 0.2;
    ring1Ref.current.rotation.y = t * 0.15;
    ring2Ref.current.rotation.x = -t * 0.15;
    ring2Ref.current.rotation.z = t * 0.25;
  });

  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.005, 8, 60]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.004, 8, 80]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

export default function NeuralNetwork() {
  const mousePos = useRef({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);

  // Only render while the scene is on screen and the tab is visible
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setRunning(onScreen && !document.hidden);
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; update(); });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="w-full h-full">
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
      frameloop={running ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#818cf8" />
      <pointLight position={[-3, -3, 3]} intensity={1} color="#a78bfa" />
      <Nodes mousePos={mousePos} />
      <CentralOrb mousePos={mousePos} />
      <FloatingRings />
    </Canvas>
    </div>
  );
}
