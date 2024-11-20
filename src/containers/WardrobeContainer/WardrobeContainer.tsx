import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { IApplicationState } from "store/store";
import { CustomOption } from "components";
import { WardrobeSample } from "components/Wardrobe/WardrobeSample";

export const WardrobeContainer = () => {
  const { currentWardrobe, showWireframe = false, showDoors = false, showGridLine = false, showAxes } = useSelector((state: IApplicationState) => state.wardrobe);

  return <div className="main-container">
    {/* <Canvas camera={{ fov: 7, near: 0.1, far: 1000, position: [-30, 4, -4] }}> */}
    <Canvas>
      <WardrobeSample wardrobe={currentWardrobe} size={currentWardrobe.size} hangerRoadSize={{ ...currentWardrobe.size, height: 48 }} showWireFrame={showWireframe} showDoors={showDoors} showGridLine={showGridLine} showAxes={showAxes} />
    </Canvas>

    <CustomOption wardrobe={currentWardrobe} color={currentWardrobe.wardrobeColor} wireframe={showWireframe} showDoors={showDoors} showGridLine={showGridLine} showAxes={showAxes} />
  </div>
};