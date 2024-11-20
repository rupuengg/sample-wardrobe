import { ComponentRef, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PlyBoard } from "components/PlyBoard";
import { defaultDrawerSize, IPosition, ISize } from "models";
import { BoardThickness } from "constants/BoardSize";
import { E_Position } from "enums";
import { CalculationUtils, ConvertUtils } from "utils";
import { Drawer } from "components/Drawer";

export interface IWardrobe {
  size: ISize;
  innerColor: string;
  wardrobeColor: string;
  hangerRoadSize: ISize;
  showWireFrame?: boolean;
  showDoors?: boolean;
}

export const Wardrobe: React.FC<IWardrobe> = ({ size, hangerRoadSize, innerColor, wardrobeColor, showWireFrame = false, showDoors = false }) => {
  const [startPosition, setStartPosition] = useState<IPosition>({ x: 0, y: 0, z: 0 });
  const dLightRef: any = useRef(null);
  const orbitRef = useRef<ComponentRef<typeof OrbitControls> | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (size.width && size.height && size.depth) {
      setStartPosition(prevState => ({
        ...prevState,
        x: prevState.x - (ConvertUtils().toMeterFromInch(size.width) / 2),
        y: prevState.y - (ConvertUtils().toMeterFromInch(size.height) / 2),
        z: prevState.z - (ConvertUtils().toMeterFromInch(size.depth) / 2),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (dLightRef.current) {
      dLightRef.current.position.set(camera.position.x + delta, camera.position.y + delta, camera.position.z + delta);
    }
  });

  const topHieght = useCallback((boardThickness: number) => {
    return ((ConvertUtils().toMeterFromInch(84) / 2) - (ConvertUtils().toMeterFromInch(boardThickness) / 2));
  }, []);

  console.log('startPosition', startPosition, ConvertUtils().positionToInchFromMeter(startPosition));
  // console.log('size', size, hangerRoadSize, size.width / 2);
  // console.log(E_Position.BACK, { x: 0, y: 0, z: 0 }, { x: BoardThickness.SIX_MM, y: size.height, z: size.width });
  return <>
    <ambientLight intensity={0.5} />
    <OrbitControls ref={orbitRef} target={[0, 0, 0]} autoRotate={false} />
    <directionalLight position={[0, 0, 2]} intensity={Math.PI} ref={dLightRef} />
    <axesHelper />
    {/* <gridHelper /> */}

    <Suspense>
      {/* Back Side */}
      <PlyBoard type={E_Position.BACK} position={{ x: 0, y: 0, z: 0 }} size={{ x: BoardThickness.SIX_MM, y: size.height, z: size.width }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Left Side */}
      <PlyBoard type={E_Position.LEFT} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: 0, z: CalculationUtils(size).depth(BoardThickness.EIGHTEEN_MM) }} size={{ x: size.depth, y: size.height, z: BoardThickness.EIGHTEEN_MM }} frontColor={wardrobeColor} showWireFrame={showWireFrame} backColor={innerColor} />

      {/* Right Side */}
      <PlyBoard type={E_Position.RIGHT} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: 0, z: -CalculationUtils(size).depth(BoardThickness.EIGHTEEN_MM) }} size={{ x: size.depth, y: size.height, z: BoardThickness.EIGHTEEN_MM }} frontColor={wardrobeColor} showWireFrame={showWireFrame} backColor={innerColor} />

      {/* Top Side */}
      <PlyBoard type={E_Position.TOP} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: CalculationUtils(size).top(BoardThickness.EIGHTEEN_MM), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Bottom Side */}
      <PlyBoard type={E_Position.BOTTOM} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: CalculationUtils(size).bottom(BoardThickness.EIGHTEEN_MM), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Above Partition if height is greater then 7 feet */}
      {Number(size.height) > 84 && <PlyBoard type={E_Position.INNER} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: CalculationUtils(size).top(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(Number(size.height) - 84), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />}

      {/* Hanger Road Partition From Top */}
      <PlyBoard type={E_Position.INNER} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: topHieght(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(hangerRoadSize.height), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Drawer From Hander Box */}
      <PlyBoard type={E_Position.INNER} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: topHieght(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(hangerRoadSize.height + 10), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Second Drawer From Hander Box */}
      <PlyBoard type={E_Position.INNER} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: topHieght(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(hangerRoadSize.height + 20), z: 0 }} size={{ x: size.depth, y: BoardThickness.EIGHTEEN_MM, z: (size.width - (2 * BoardThickness.EIGHTEEN_MM)) }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />

      {/* Door Side */}
      {
        showDoors && <>
          <PlyBoard type={E_Position.FRONT} position={{ x: -ConvertUtils().toMeterFromInch(24) - 0.01, y: 0, z: -ConvertUtils().toMeterFromInch(size.width / 4) }} size={{ x: BoardThickness.EIGHTEEN_MM, y: size.height, z: (size.width / 2) - ConvertUtils().toMeterFromMM(6) }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />
          <PlyBoard type={E_Position.FRONT} position={{ x: -ConvertUtils().toMeterFromInch(24) - 0.01, y: 0, z: +ConvertUtils().toMeterFromInch(size.width / 4) }} size={{ x: BoardThickness.EIGHTEEN_MM, y: size.height, z: (size.width / 2) - ConvertUtils().toMeterFromMM(6) }} showWireFrame={showWireFrame} frontColor={wardrobeColor} backColor={innerColor} />
        </>
      }

      {/* Hanger Road */}
      {/* <HangerRoad type={E_Position.BACK} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: CalculationUtils(size).top(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(Number(size.height) - 84) - ConvertUtils().toMeterFromInch(3), z: 0 }} size={{ x: ConvertUtils().toMeterFromMM(10), y: ConvertUtils().toMeterFromMM(10), z: (ConvertUtils().toMeterFromInch(size.width) - (2 * ConvertUtils().toMeterFromInch(BoardThickness.EIGHTEEN_MM))) }} showWireFrame={showWireFrame} frontColor={'#c4c4c4'} backColor={'#fff'} /> */}

      {/* Drawer */}
      <Drawer type={E_Position.DRAWER} position={{ x: CalculationUtils(size).left(BoardThickness.SIX_MM), y: topHieght(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(hangerRoadSize.height) - ConvertUtils().toMeterFromInch(BoardThickness.EIGHTEEN_MM) - ConvertUtils().toMeterFromInch(BoardThickness.GAP) - ConvertUtils().toMeterFromInch(4), z: 0 }} size={defaultDrawerSize} showWireFrame={showWireFrame} frontColor={wardrobeColor} />
    </Suspense>
  </>;
}