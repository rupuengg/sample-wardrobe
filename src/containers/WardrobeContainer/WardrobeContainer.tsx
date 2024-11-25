import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { IApplicationState, useAppDispatch } from "store/store";
import { CustomOption } from "components";
import { WardrobeSample } from "components/Wardrobe/WardrobeSample";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { WardrobeActions } from "store/slices";


export const WardrobeContainer = () => {
  const dispatch: any = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.entity && params.entity !== '') {
      dispatch(WardrobeActions.setWardrobeByKey(params.entity));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.entity]);

  const { currentWardrobe, wardrobeColor, showWireframe = false, showDoors = false, showGridLine = false, showAxes } = useSelector((state: IApplicationState) => state.wardrobe);

  return <div className="main-container">
    {/* <Canvas camera={{ fov: 7, near: 0.1, far: 1000, position: [-30, 4, -4] }}> */}
    <Canvas>
      <WardrobeSample wardrobe={currentWardrobe} wardrobeColor={wardrobeColor} showWireFrame={showWireframe} showDoors={showDoors} showGridLine={showGridLine} showAxes={showAxes} />
    </Canvas>

    <CustomOption wardrobe={currentWardrobe} color={currentWardrobe?.wardrobeColor} wireframe={showWireframe} showDoors={showDoors} showGridLine={showGridLine} showAxes={showAxes} />
  </div>
};