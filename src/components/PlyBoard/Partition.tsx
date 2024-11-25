import { useRef } from "react";
import { Mesh as _Mesh, BoxGeometry as _BoxGeometry, MeshStandardMaterial as _MeshStandardMaterial } from "three";
import { extend, useFrame } from '@react-three/fiber';
import { E_Position } from "enums";
import { IBoard, rotate } from "./Board";

extend({ Mesh: _Mesh, BoxGeometry: _BoxGeometry, MeshStandardMaterial: _MeshStandardMaterial, });

export const Partition: React.FC<IBoard> = ({ position, size, type, backColor = '#CCCCCC', frontColor = 'RED', showWireFrame = false }) => {
  const hangerRoadRef = useRef<any>(null);

  useFrame(() => {
    if (hangerRoadRef.current) {
      if (type === E_Position.HORIZONTAL_PARTITION) {
        hangerRoadRef.current.rotation.x = rotate(-90);
        hangerRoadRef.current.rotation.z = rotate(-90);
      } else if (type === E_Position.VERTICAL_PARTITION) {
        hangerRoadRef.current.rotation.y = rotate(-90);
      }
    }
  });

  return <mesh key={position.x} position={[position.x, position.y, position.z]} ref={hangerRoadRef}>
    <boxGeometry args={[size.width, size.height, size.depth]} />

    <meshStandardMaterial color={backColor}  {...(showWireFrame ? { wireframe: true } : {})} />
  </mesh>
}