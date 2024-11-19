import { Mesh as _Mesh, BoxGeometry as _BoxGeometry, MeshStandardMaterial as _MeshStandardMaterial, BackSide, FrontSide } from "three";
import { extend } from '@react-three/fiber';
import { IPosition } from "models";
import { E_Position } from "enums";
import { ConvertUtils } from "utils";

extend({
  Mesh: _Mesh,
  BoxGeometry: _BoxGeometry,
  MeshStandardMaterial: _MeshStandardMaterial,
});

export interface IDrawer {
  position: IPosition;
  size: IPosition;
  type: E_Position;
  backColor?: string;
  frontColor?: string;
  showWireFrame?: boolean;
}

export const Drawer: React.FC<IDrawer> = ({ position, size, type, backColor = '#ccc', frontColor = 'red', showWireFrame = false }) => {
  return <mesh position={[position.x, position.y, position.z]} >
    <boxGeometry args={[ConvertUtils().toMeterFromInch(size.x), ConvertUtils().toMeterFromInch(size.y), ConvertUtils().toMeterFromInch(size.z)]} />

    {/* Back Side */}
    <meshStandardMaterial attach={'material-0'} color={[E_Position.BACK].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Front Side */}
    <meshStandardMaterial attach={'material-1'} color={[E_Position.FRONT].includes(type) ? frontColor : backColor} transparent opacity={0.7} side={FrontSide} shadowSide={BackSide} clipShadows {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Left Side */}
    <meshStandardMaterial attach={'material-2'} color={[E_Position.TOP, E_Position.LEFT, E_Position.RIGHT, E_Position.BACK, E_Position.FRONT].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Right Side */}
    <meshStandardMaterial attach={'material-3'} color={[E_Position.BOTTOM, E_Position.LEFT, E_Position.RIGHT, E_Position.BACK, E_Position.FRONT].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Top Side */}
    <meshStandardMaterial attach={'material-4'} color={[E_Position.RIGHT, E_Position.BACK, E_Position.FRONT].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Bottom Side */}
    <meshStandardMaterial attach={'material-5'} color={[E_Position.LEFT, E_Position.BACK, E_Position.FRONT].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />
  </mesh>
}