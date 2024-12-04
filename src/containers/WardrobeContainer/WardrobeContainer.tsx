import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { IApplicationState, useAppDispatch } from "store/store";
import { CustomOption, TotalBoard, TotalPiece } from "components";
import { WardrobeSample } from "components/Wardrobe/WardrobeSample";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { WardrobeActions } from "store/slices";
import { CustomWardrobe } from "components/CustomOption/CustomWardrobe";

export const WardrobeContainer = () => {
  const { currentWardrobe, customWardrobe, wardrobeColor } = useSelector((state: IApplicationState) => state.wardrobe);
  const dispatch: any = useAppDispatch();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const showWireframe = useMemo(() => searchParams.get('WIREFRAME') && searchParams.get('WIREFRAME') !== null && searchParams.get('WIREFRAME') !== '' ? Boolean(searchParams.get('WIREFRAME')?.toString()) : false, [searchParams]);
  const showDoors = useMemo(() => searchParams.get('DOORS') && searchParams.get('DOORS') !== null && searchParams.get('DOORS') !== '' ? Boolean(searchParams.get('DOORS')?.toString()) : false, [searchParams]);
  const showGridLine = useMemo(() => searchParams.get('GRID_LINE') && searchParams.get('GRID_LINE') !== null && searchParams.get('GRID_LINE') !== '' ? Boolean(searchParams.get('GRID_LINE')?.toString()) : false, [searchParams]);
  const showAxes = useMemo(() => searchParams.get('AXES') && searchParams.get('AXES') !== null && searchParams.get('AXES') !== '' ? Boolean(searchParams.get('AXES')?.toString()) : false, [searchParams]);
  const showTotalPiece = useMemo(() => searchParams.get('TOTAL_PIECE') && searchParams.get('TOTAL_PIECE') !== null && searchParams.get('TOTAL_PIECE') !== '' ? Boolean(searchParams.get('TOTAL_PIECE')?.toString()) : false, [searchParams]);
  const showTotalBoard = useMemo(() => searchParams.get('TOTAL_BOARD') && searchParams.get('TOTAL_BOARD') !== null && searchParams.get('TOTAL_BOARD') !== '' ? Boolean(searchParams.get('TOTAL_BOARD')?.toString()) : false, [searchParams]);

  useEffect(() => {
    if (params.entity) {
      if (params.entity === 'custom') dispatch(WardrobeActions.initalizeCWardrobe());
      else dispatch(WardrobeActions.setWardrobeByKey(params.entity));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.entity]);

  return <div className="main-container">
    {/* <Canvas camera={{ fov: 7, near: 0.1, far: 1000, position: [-30, 4, -4] }}> */}

    <Canvas>
      {params.entity !== 'custom' && <WardrobeSample wardrobe={currentWardrobe} wardrobeColor={wardrobeColor} showWireFrame={showWireframe} showDoors={showDoors} showGridLine={showGridLine} showAxes={showAxes} />}
      {params.entity === 'custom' && <WardrobeSample wardrobe={customWardrobe} wardrobeColor={wardrobeColor} showWireFrame={showWireframe} showDoors={showDoors} showGridLine={showGridLine} showAxes={showAxes} />}
    </Canvas>

    <CustomOption color={currentWardrobe?.wardrobeColor} />

    {showTotalBoard && <TotalBoard wardrobe={currentWardrobe} />}

    {showTotalPiece && <TotalPiece wardrobe={currentWardrobe} />}

    {params.entity === 'custom' && <CustomWardrobe />}
  </div>
};