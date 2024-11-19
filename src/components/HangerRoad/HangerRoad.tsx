import { useRef } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { IPosition } from "models";
import { E_Position } from "enums";

extend({
  Mesh: THREE.Mesh,
  BoxGeometry: THREE.BoxGeometry,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
});

export interface IHangerRoad {
  position: IPosition;
  size: IPosition;
  type: E_Position;
  backColor?: string;
  frontColor?: string;
  showWireFrame?: boolean;
}

export const HangerRoad: React.FC<IHangerRoad> = ({ position, size, type, backColor = '#fff', frontColor = 'black', showWireFrame = false }) => {
  const hangerRoadRef = useRef<any>(null);

  useFrame(() => {
    if (hangerRoadRef.current) {
      hangerRoadRef.current.rotation.x = 1.57;
    }
  });

  return <mesh position={[position.x, position.y, position.z]} ref={hangerRoadRef} >
    <cylinderGeometry args={[size.x, size.y, size.z, 6]} />

    {/* Back Side */}
    <meshStandardMaterial attach={'material-0'} color={[E_Position.BACK].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />
  </mesh>
}