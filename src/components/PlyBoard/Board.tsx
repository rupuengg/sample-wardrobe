import { useRef } from "react";
import { Mesh as _Mesh, BoxGeometry as _BoxGeometry, MeshStandardMaterial as _MeshStandardMaterial } from "three";
import { extend, useFrame } from '@react-three/fiber';
import { IPosition, ISize } from "models";
import { E_Position } from "enums";

export function rotate(deg: number) {
  return 2 * Math.PI * (deg / 360);
}

extend({ Mesh: _Mesh, BoxGeometry: _BoxGeometry, MeshStandardMaterial: _MeshStandardMaterial, });

export interface IBoard {
  position: IPosition;
  size: ISize;
  type: E_Position;
  backColor?: string;
  frontColor?: string;
  showWireFrame?: boolean;
}

export const Board: React.FC<IBoard> = ({ position, size, type, backColor = '#ccc', frontColor = 'red', showWireFrame = false }) => {
  const hangerRoadRef = useRef<any>(null);

  useFrame(() => {
    if (hangerRoadRef.current) {
      if (type === E_Position.LEFT) {
        hangerRoadRef.current.rotation.y = rotate(90);
      } else if (type === E_Position.RIGHT) {
        hangerRoadRef.current.rotation.y = rotate(90);
      } else if (type === E_Position.TOP || type === E_Position.BOTTOM) {
        hangerRoadRef.current.rotation.x = rotate(-90);
        hangerRoadRef.current.rotation.z = rotate(-90);
      }
    }
  });

  console.log('Board', type, position, size);
  return <mesh position={[position.x, position.y, position.z]} ref={hangerRoadRef}>
    <boxGeometry args={[size.width, size.height, size.depth]} />

    {/* Right Section */}
    <meshStandardMaterial attach={'material-0'} color={[E_Position.BACK, E_Position.LEFT, E_Position.RIGHT, E_Position.TOP, E_Position.BOTTOM].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Left Section */}
    <meshStandardMaterial attach={'material-1'} color={[E_Position.BACK, E_Position.LEFT, E_Position.RIGHT, E_Position.TOP, E_Position.BOTTOM].includes(type) ? frontColor : backColor} {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Top Section */}
    <meshStandardMaterial attach={'material-2'} color={[E_Position.BACK, E_Position.LEFT, E_Position.RIGHT, E_Position.TOP, E_Position.BOTTOM].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Bottom Section */}
    <meshStandardMaterial attach={'material-3'} color={[E_Position.BACK, E_Position.LEFT, E_Position.RIGHT, E_Position.TOP, E_Position.BOTTOM].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    <meshStandardMaterial attach={'material-4'} color={[E_Position.FRONT, E_Position.RIGHT, E_Position.TOP].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    <meshStandardMaterial attach={'material-5'} color={[E_Position.BACK, E_Position.LEFT, E_Position.BOTTOM].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />
  </mesh>
}