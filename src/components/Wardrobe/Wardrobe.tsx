import { ComponentRef, Suspense, useCallback, useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Group as _Group } from "three";
import { IWardrobeModel, IWardrobePiecesModel } from "models";
import { E_Category } from "enums";
import { ConvertUtils } from "utils";
import { Board, Partition, Drawer, HangerRoad, Door } from "components";

extend({ Group: _Group });

export interface IWardrobe {
  wardrobe?: IWardrobeModel;
  wardrobeColor?: string;
  showWireFrame?: boolean;
  showDoors?: boolean;
  showGridLine?: boolean;
  showAxes?: boolean;
}

export const Wardrobe: React.FC<IWardrobe> = ({ wardrobe, wardrobeColor, showWireFrame = false, showDoors = false, showGridLine = false, showAxes = false }) => {
  const dLightRef: any = useRef(null);
  const orbitRef = useRef<ComponentRef<typeof OrbitControls> | null>(null);
  const { camera } = useThree();

  useFrame((state, delta) => {
    if (dLightRef.current) {
      dLightRef.current.position.set(camera.position.x + delta, camera.position.y + delta, camera.position.z + delta);
    }
  });

  const getPiece = useCallback((piece: IWardrobePiecesModel, index: number) => {
    switch (piece.category) {
      case E_Category.BOARD:
        return <Board key={index.toString()} type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe?.wardrobeColor || wardrobeColor} backColor={piece.backColor || wardrobe?.innerColor} />;
      case E_Category.PARTITION:
        return <Partition key={index.toString()} type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe?.wardrobeColor || wardrobeColor} backColor={piece.backColor || wardrobe?.innerColor} />;
      case E_Category.DRAWER:
        return <Drawer key={index.toString()} type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe?.wardrobeColor || wardrobeColor} backColor={piece.backColor || wardrobe?.innerColor} />;
      case E_Category.HANGER_ROAD:
        return <HangerRoad key={index.toString()} type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe?.wardrobeColor || wardrobeColor} backColor={piece.backColor || wardrobe?.innerColor} />;
      case E_Category.DOOR:
        return showDoors ? <Door key={index.toString()} type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe?.wardrobeColor || wardrobeColor} backColor={piece.backColor || wardrobe?.innerColor} /> : null;
      default:
        return null;
    }
  }, [showWireFrame, showDoors, wardrobe?.wardrobeColor, wardrobe?.innerColor, wardrobeColor]);

  return <group key={wardrobe?.key}>
    <ambientLight intensity={0.5} />
    <OrbitControls ref={orbitRef} target={[0, 0, 0]} autoRotate={false} />
    <directionalLight position={[0, 0, 2]} intensity={Math.PI} ref={dLightRef} />
    {showAxes && <axesHelper />}
    {showGridLine && <gridHelper />}

    <Suspense>{wardrobe?.pieces?.map((piece, index) => getPiece(piece, index))}</Suspense>
  </group>;
}