import { BackSide, FrontSide } from "three";
import { IPosition } from "../../models";
import { E_Position } from "../../enums";
import { ConvertUtils } from "../../utils";

export interface IPlyBoard {
  position: IPosition;
  size: IPosition;
  type: E_Position;
  backColor?: string;
  frontColor?: string;
  showWireFrame?: boolean;
}

export const PlyBoard: React.FC<IPlyBoard> = ({ position, size, type, backColor = '#ccc', frontColor = 'red', showWireFrame = false }) => {
  return <mesh position={[position.x, position.y, position.z]} >
    <boxGeometry args={[ConvertUtils().toMeterFromInch(size.x), ConvertUtils().toMeterFromInch(size.y), ConvertUtils().toMeterFromInch(size.z)]} />

    {/* Back Side */}
    <meshStandardMaterial attach={'material-0'} color={[E_Position.BACK].includes(type) ? frontColor : backColor}  {...(showWireFrame ? { wireframe: true } : {})} />

    {/* Front Side */}
    <meshStandardMaterial attach={'material-1'} color={[E_Position.FRONT].includes(type) ? frontColor : backColor} opacity={0.8} side={FrontSide} shadowSide={BackSide} clipShadows {...(showWireFrame ? { wireframe: true } : {})} />

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