import { Mesh as _Mesh, BoxGeometry as _BoxGeometry, MeshStandardMaterial as _MeshStandardMaterial } from "three";
import { extend } from '@react-three/fiber';
import { IPosition, ISize } from "models";
import { ConvertUtils } from "utils";
import { useMemo } from "react";
import { BoardThickness } from "constants/BoardSize";

extend({
  Mesh: _Mesh,
  BoxGeometry: _BoxGeometry,
  MeshStandardMaterial: _MeshStandardMaterial,
});

export interface IDrawer {
  position: IPosition;
  size: ISize;
  frontColor?: string;
  showWireFrame?: boolean;
}

export const Drawer: React.FC<IDrawer> = ({ position, size, frontColor = 'red', showWireFrame = false }) => {
  const yPos = useMemo(() => {
    return ConvertUtils().toMeterFromInch(size.height) - (2 * ConvertUtils().toMeterFromMM(18));
  }, [size.height]);

  const zPos = useMemo(() => {
    return ConvertUtils().toMeterFromInch(size.width) - (2 * ConvertUtils().toMeterFromMM(18)) - (2 * ConvertUtils().toMeterFromInch(BoardThickness.GAP));
  }, [size.width]);

  return <mesh position={[position.x, position.y, position.z]}>
    <boxGeometry args={[ConvertUtils().toMeterFromInch(size.depth), yPos, zPos]} />

    {/* Back Side */}
    <meshStandardMaterial color={frontColor} {...(showWireFrame ? { wireframe: true } : {})} />
  </mesh>;
}