import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Wardrobe } from "components/Wardrobe";
import { CustomOption } from "components/CustomOption";
import { defaultSize, ISize } from "models";
import { WardRobeConstants } from "constants/WardRobeConstants";

export const App = () => {
  const [wardrobeInnerColor] = useState<string>('#ccc');
  const [wardrobeColor, setWardrobeColor] = useState<string>('#ffc107');
  const [wardrobeSize, setWardrobeSize] = useState<ISize>(defaultSize);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [showDoors, setShowDoors] = useState<boolean>(false);

  return <div className="main-container">
    <Canvas camera={{ fov: 10, near: 0.1, far: 1000, position: [-30, 4, -4] }}>
      <Wardrobe innerColor={wardrobeInnerColor} wardrobeColor={wardrobeColor} size={wardrobeSize} hangerRoadSize={{ ...wardrobeSize, height: 48 }} showWireFrame={wireframe} showDoors={showDoors} />
    </Canvas>

    <CustomOption size={WardRobeConstants.DEFAULT_WARDROBE_SIZE[0]} color={wardrobeColor} wireframe={wireframe} showDoors={showDoors} onColorChange={(color) => setWardrobeColor(color)} onSizeChange={(isShowWireframe) => setWardrobeSize(isShowWireframe)} onWireFrameChange={(size) => setWireframe(size)} onShowDoors={(isShowDoors) => setShowDoors(isShowDoors)} />
  </div>
};