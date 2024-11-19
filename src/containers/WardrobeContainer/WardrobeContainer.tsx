import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { Wardrobe } from "components/Wardrobe";
import { IApplicationState } from "store/store";
import { CustomOption } from "components";

export const WardrobeContainer = () => {
  const { currentWardrobe, wardrobeInnerColor = '#CCC', showWireframe = false, showDoors = false } = useSelector((state: IApplicationState) => state.wardrobe);

  return <div className="main-container">
    <Canvas camera={{ fov: 10, near: 0.1, far: 1000, position: [-30, 4, -4] }}>
      <Wardrobe innerColor={wardrobeInnerColor} wardrobeColor={currentWardrobe.wardrobeColor} size={currentWardrobe.size} hangerRoadSize={{ ...currentWardrobe.size, height: 48 }} showWireFrame={showWireframe} showDoors={showDoors} />
    </Canvas>

    <CustomOption wardrobe={currentWardrobe} color={currentWardrobe.wardrobeColor} wireframe={showWireframe} showDoors={showDoors} />
  </div>
};