import { Canvas } from "@react-three/fiber";
import { Wardrobe } from "./components/Wardrobe";
import { CustomOption } from "./components/CustomOption";
import { useState } from "react";
import { defaultSize, ISize } from "./models";
import { WardRobeConstants } from "./constants";

export const App = () => {
  const [wardrobeInnerColor] = useState<string>('#fafafa');
  const [wardrobeColor, setWardrobeColor] = useState<string>('#ffc107');
  const [wardrobeSize, setWardrobeSize] = useState<ISize>(defaultSize);

  return <div className="main-container">
    <Canvas camera={{ fov: 10, near: 0.1, far: 1000, position: [-30, 4, -4] }}>
      <Wardrobe innerColor={wardrobeInnerColor} wardrobeColor={wardrobeColor} size={wardrobeSize} hangerRoadSize={{ ...wardrobeSize, height: 48 }} />
    </Canvas>

    <CustomOption size={WardRobeConstants.DEFAULT_WARDROBE_SIZE[0]} color={wardrobeColor} onColorChange={(color) => setWardrobeColor(color)} onSizeChange={(size) => setWardrobeSize(size)} />
  </div>
};