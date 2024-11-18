import { ComponentRef, Suspense, useCallback, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PlyBoard } from "../PlyBoard";
import { ISize } from "../../models";
import { BoardThickness } from "../../constants";
import { CalculationUtils, ConvertUtils } from "../../utils";
import { E_Position } from "../../enums";

export interface IWardrobe {
  size: ISize;
  innerColor: string;
  wardrobeColor: string;
  hangerRoadSize: ISize;
}

export const Wardrobe: React.FC<IWardrobe> = ({ size, hangerRoadSize, innerColor, wardrobeColor }) => {
  const dLightRef: any = useRef(null);
  const orbitRef = useRef<ComponentRef<typeof OrbitControls> | null>(null);
  const { camera } = useThree();

  useFrame((state, delta) => {
    if (dLightRef.current) {
      dLightRef.current.position.set(camera.position.x + delta, camera.position.y + delta, camera.position.z + delta);
    }
  });

  const topHieght = useCallback((boardThickness: number) => {
    return ((ConvertUtils().toMeterFromInch(84) / 2) - (ConvertUtils().toMeterFromInch(boardThickness) / 2));
  }, []);

  console.log('size', size, hangerRoadSize, size.width / 2);
  return <>
    <ambientLight intensity={0.5} />
    <OrbitControls ref={orbitRef} target={[0, 0, 0]} autoRotate={false} />
    <directionalLight position={[0, 0, 2]} intensity={Math.PI} ref={dLightRef} />
    <axesHelper />

    <Suspense>
      {/* Back Side */}
      <PlyBoard type={E_Position.BACK} position={{ x: 0, y: 0, z: 0 }} size={{ x: BoardThickness.SIX_MM, y: size.height, z: size.width }} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Left Side */}
      <PlyBoard type={E_Position.LEFT} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: 0, z: CalculationUtils(size).depth(BoardThickness.EIGHTEEN_MM) }} size={{ x: size.depth, y: size.height, z: BoardThickness.EIGHTEEN_MM }} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Right Side */}
      <PlyBoard type={E_Position.RIGHT} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: 0, z: -CalculationUtils(size).depth(BoardThickness.EIGHTEEN_MM) }} size={{ x: size.depth, y: size.height, z: BoardThickness.EIGHTEEN_MM }} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Top Side */}
      <PlyBoard type={E_Position.TOP} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: CalculationUtils(size).top(BoardThickness.EIGHTEEN_MM), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Bottom Side */}
      <PlyBoard type={E_Position.BOTTOM} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: CalculationUtils(size).bottom(BoardThickness.EIGHTEEN_MM), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Above Partition if height is greater then 7 feet */}
      {Number(size.height) > 84 && <PlyBoard type={E_Position.BOTTOM} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: CalculationUtils(size).top(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(Number(size.height) - 84), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} frontColor={wardrobeColor} backColor={innerColor} />}

      {/* Hanger Road Partition From Top */}
      <PlyBoard type={E_Position.INNER} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: topHieght(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(hangerRoadSize.height), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Drawer From Hander Box */}
      <PlyBoard type={E_Position.INNER} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: topHieght(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(hangerRoadSize.height + 10), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Second Drawer From Hander Box */}
      <PlyBoard type={E_Position.INNER} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: topHieght(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(hangerRoadSize.height + 20), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} frontColor={wardrobeColor} backColor={innerColor} />
    </Suspense>
  </>;
}