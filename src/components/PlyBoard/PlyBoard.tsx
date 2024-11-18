import { BackSide, FrontSide } from "three";
import { IPosition } from "../../models";
import { E_Position } from "../../enums";

export interface IPlyBoard {
  position: IPosition;
  size: IPosition;
  type: E_Position;
  backColor?: string;
  frontColor?: string;
}

export const PlyBoard: React.FC<IPlyBoard> = ({ position, size, type, backColor = '#ccc', frontColor = 'red' }) => {
  return <mesh position={[position.x, position.y, position.z]} >
    <boxGeometry args={[size.x, size.y, size.z]} />

    {/* Back Side */}
    <meshStandardMaterial attach={'material-0'} color={[E_Position.BACK].includes(type) ? frontColor : backColor} />

    {/* Front Side */}
    <meshStandardMaterial attach={'material-1'} color={backColor} transparent={true} opacity={0.8} side={FrontSide} shadowSide={BackSide} clipShadows />

    {/* Left Side */}
    <meshStandardMaterial attach={'material-2'} color={[E_Position.TOP, E_Position.LEFT, E_Position.RIGHT, E_Position.BACK].includes(type) ? frontColor : backColor} />

    {/* Right Side */}
    <meshStandardMaterial attach={'material-3'} color={[E_Position.BOTTOM, E_Position.LEFT, E_Position.RIGHT, E_Position.BACK].includes(type) ? frontColor : backColor} />

    {/* Top Side */}
    <meshStandardMaterial attach={'material-4'} color={[E_Position.RIGHT, E_Position.BACK].includes(type) ? frontColor : backColor} />

    {/* Bottom Side */}
    <meshStandardMaterial attach={'material-5'} color={[E_Position.LEFT, E_Position.BACK].includes(type) ? frontColor : backColor} />
  </mesh>
}