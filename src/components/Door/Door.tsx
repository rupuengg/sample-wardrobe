import { Mesh as _Mesh, BoxGeometry as _BoxGeometry, MeshStandardMaterial as _MeshStandardMaterial } from "three";
import { extend } from '@react-three/fiber';
import { IBoard } from "components/PlyBoard";
import { FrontSide } from "three";
import { BackSide } from "three";

extend({ Mesh: _Mesh, BoxGeometry: _BoxGeometry, MeshStandardMaterial: _MeshStandardMaterial, });

export const Door: React.FC<IBoard> = ({ position, size, type, backColor = '#ccc', frontColor = 'red', showWireFrame = false }) => {
  console.log('Door', type, position, size);
  return <mesh position={[position.x, position.y, position.z]}>
    <boxGeometry args={[size.width, size.height, size.depth]} />

    {/* Right Section */}
    <meshStandardMaterial attach={'material-0'} color={frontColor} {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Left Section */}
    <meshStandardMaterial attach={'material-1'} color={frontColor} {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Top Section */}
    <meshStandardMaterial attach={'material-2'} color={frontColor} {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Bottom Section */}
    <meshStandardMaterial attach={'material-3'} color={frontColor} {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Front Section */}
    <meshStandardMaterial attach={'material-4'} color={frontColor} transparent opacity={0.7} side={FrontSide} shadowSide={BackSide} clipShadows {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Back Section */}
    <meshStandardMaterial attach={'material-5'} color={backColor} {...(showWireFrame ? { wireframe: true } : {})} />
  </mesh>
}