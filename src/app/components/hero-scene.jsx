"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

const PARTICLE_COUNT = 900;

function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
}

function ParticleField({ isDark, reduced }) {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points || reduced) return;
    points.rotation.y += delta * 0.03;
    points.rotation.x = THREE.MathUtils.lerp(
      points.rotation.x,
      state.pointer.y * 0.12,
      0.04
    );
    points.rotation.z = THREE.MathUtils.lerp(
      points.rotation.z,
      state.pointer.x * 0.08,
      0.04
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        transparent
        opacity={isDark ? 0.55 : 0.4}
        color={isDark ? "#34d399" : "#059669"}
        depthWrite={false}
      />
    </points>
  );
}

function Wireframe({ isDark, reduced }) {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh || reduced) return;
    mesh.rotation.x += delta * 0.06;
    mesh.rotation.y += delta * 0.09;
  });

  return (
    <mesh ref={meshRef} position={[5.5, 0.5, -3]}>
      <icosahedronGeometry args={[2.6, 1]} />
      <meshBasicMaterial
        wireframe
        transparent
        opacity={isDark ? 0.14 : 0.12}
        color={isDark ? "#a3a3a3" : "#334155"}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const { resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <ParticleField isDark={isDark} reduced={reduced} />
        <Wireframe isDark={isDark} reduced={reduced} />
      </Canvas>
    </div>
  );
}
