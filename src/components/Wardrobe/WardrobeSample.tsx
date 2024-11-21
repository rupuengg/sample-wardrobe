import { ComponentRef, Suspense, useCallback, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ISize, IWardrobeModel, IWardrobePiecesModel } from "models";
import { E_Category } from "enums";
import { ConvertUtils } from "utils";
import { Board, Partition } from "components/PlyBoard";
import { Drawer } from "components/Drawer";
import { HangerRoad } from "components/HangerRoad";
import { Door } from "components/Door";

export interface IWardrobeSample {
  wardrobe: IWardrobeModel;
  size: ISize;
  hangerRoadSize: ISize;
  showWireFrame?: boolean;
  showDoors?: boolean;
  showGridLine?: boolean;
  showAxes?: boolean;
}

export const WardrobeSample: React.FC<IWardrobeSample> = ({ wardrobe, size, hangerRoadSize, showWireFrame = false, showDoors = false, showGridLine = false, showAxes = false }) => {
  const dLightRef: any = useRef(null);
  const orbitRef = useRef<ComponentRef<typeof OrbitControls> | null>(null);
  const { camera } = useThree();

  useFrame((state, delta) => {
    if (dLightRef.current) {
      dLightRef.current.position.set(camera.position.x + delta, camera.position.y + delta, camera.position.z + delta);
    }
  });

  const getPiece = useCallback((piece: IWardrobePiecesModel) => {
    switch (piece.category) {
      case E_Category.BOARD:
        return <Board type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe.wardrobeColor} backColor={piece.backColor || wardrobe.innerColor} />;
      case E_Category.PARTITION:
        return <Partition type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe.wardrobeColor} backColor={piece.backColor || wardrobe.innerColor} />;
      case E_Category.DRAWER:
        return <Drawer type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe.wardrobeColor} backColor={piece.backColor || wardrobe.innerColor} />;
      case E_Category.HANGER_ROAD:
        return <HangerRoad type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe.wardrobeColor} backColor={piece.backColor || wardrobe.innerColor} />;
      case E_Category.DOOR:
        return showDoors ? <Door type={piece.type} position={ConvertUtils().positionToMeterFromInch(piece.position)} size={ConvertUtils().sizeToMeterFromInch(piece.size)} showWireFrame={showWireFrame} frontColor={piece.frontColor || wardrobe.wardrobeColor} backColor={piece.backColor || wardrobe.innerColor} /> : null;
      default:
        return null;
    }
  }, [showWireFrame, showDoors, wardrobe.innerColor, wardrobe.wardrobeColor]);

  return <>
    <ambientLight intensity={0.5} />
    <OrbitControls ref={orbitRef} target={[0, 0, 0]} autoRotate={false} />
    <directionalLight position={[0, 0, 2]} intensity={Math.PI} ref={dLightRef} />
    {showAxes && <axesHelper />}
    {showGridLine && <gridHelper />}

    <Suspense>
      {wardrobe.pieces?.map(piece => getPiece(piece))}
    </Suspense>
  </>;
}