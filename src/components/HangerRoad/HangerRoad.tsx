import { useRef } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { E_Position } from "enums";
import { IBoard, rotate } from "components/PlyBoard";

extend({ Mesh: THREE.Mesh, CylinderGeometry: THREE.CylinderGeometry, MeshStandardMaterial: THREE.MeshStandardMaterial, });

export const HangerRoad: React.FC<IBoard> = ({ position, size, type, frontColor = 'black', showWireFrame = false }) => {
  const hangerRoadRef = useRef<any>(null);

  useFrame(() => {
    if (hangerRoadRef.current) {
      if (type === E_Position.HANGER_ROAD) {
        hangerRoadRef.current.rotation.x = rotate(-90);
        hangerRoadRef.current.rotation.z = rotate(-90);
      }
    }
  });

  return <mesh position={[position.x, position.y, position.z]} ref={hangerRoadRef}>
    <cylinderGeometry args={[size.width, size.height, size.depth]} />

    {/* Back Side */}
    <meshStandardMaterial color={frontColor}  {...(showWireFrame ? { wireframe: true } : {})} />
  </mesh>
}