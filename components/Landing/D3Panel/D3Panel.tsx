"use client";
import * as THREE from "three";
import React, { JSX } from "react";
import { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

export function D3Panel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/D3Panel/scene.gltf"
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials["Material.002"]}
        // rotation={[Math.PI/4, Math.PI / 2.5, 0]}
        rotation={[0.1,1, 0]}
              position={[0, -0.7, 0]}
              scale={1.4}
      />
    </group>
  );
}

useGLTF.preload("/models/D3Panel/scene.gltf");

export default D3Panel;
