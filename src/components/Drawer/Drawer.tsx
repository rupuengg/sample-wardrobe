import { useRef } from "react";
import { BoxGeometry as _BoxGeometry, Mesh as _Mesh, MeshStandardMaterial as _MeshStandardMaterial } from "three";
import { extend, useFrame } from '@react-three/fiber';
import { IBoard, rotate } from "components";
import { E_Position } from "enums";

extend({ Mesh: _Mesh, BoxGeometry: _BoxGeometry, MeshStandardMaterial: _MeshStandardMaterial, });

export const Drawer: React.FC<IBoard> = ({ position, size, type, frontColor = 'RED', showWireFrame = false }) => {
  const hangerRoadRef = useRef<any>(null);

  useFrame(() => {
    if (hangerRoadRef.current) {
      if (type === E_Position.DRAWER) {
        hangerRoadRef.current.rotation.x = rotate(-90);
        hangerRoadRef.current.rotation.z = rotate(-90);
      }
    }
  });

  return <mesh position={[position.x, position.y, position.z]} ref={hangerRoadRef}>
    <boxGeometry args={[size.width, size.height, size.depth]} />

    <meshStandardMaterial color={frontColor}  {...(showWireFrame ? { wireframe: true } : {})} />
  </mesh>
}