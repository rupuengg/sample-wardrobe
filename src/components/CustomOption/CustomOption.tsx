/* eslint-disable jsx-a11y/anchor-is-valid */
import { CirclePicker } from "react-color";
import { useCallback, useState } from "react";
import { IWardrobeModel } from "models";
import { mockWardrobes } from "mockValues";
import { useAppDispatch } from "store/store";
import { WardrobeActions } from "store/slices";
import { WardrobeConstants } from "constants/WardrobeConstants";

export interface ICustomOption {
  wardrobe: IWardrobeModel;
  color: string;
  wireframe?: boolean;
  showDoors?: boolean;
  showGridLine?: boolean;
  showAxes?: boolean;
}

export const CustomOption: React.FC<ICustomOption> = ({ wardrobe, color, showDoors = false, wireframe = false, showGridLine = false, showAxes = true }) => {
  const dispatch: any = useAppDispatch();

  const [initialWardrobe] = useState<IWardrobeModel>(wardrobe);
  const [initialShowDoors] = useState<boolean>(showDoors);
  const [initialWireframe] = useState<boolean>(wireframe);
  const [initialShowGridLine] = useState<boolean>(showGridLine);
  const [initialShowAxes] = useState<boolean>(showAxes);

  const handleColorChange = useCallback((color: any) => {
    dispatch(WardrobeActions.setWardrobeColor(color.hex));
  }, [dispatch]);

  const handleSizeChange = useCallback((wardrobe: IWardrobeModel) => {
    dispatch(WardrobeActions.setCurrentWardrobe(wardrobe));
  }, [dispatch]);

  const handleWireframe = useCallback(() => {
    dispatch(WardrobeActions.toggleWireframe());
  }, [dispatch]);

  const handleShowDoors = useCallback(() => {
    dispatch(WardrobeActions.toggleDoors());
  }, [dispatch]);

  const handleShowGrid = useCallback(() => {
    dispatch(WardrobeActions.toggleGridLine());
  }, [dispatch]);

  const handleShowAxes = useCallback(() => {
    dispatch(WardrobeActions.toggleAxes());
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(WardrobeActions.setCurrentWardrobe(initialWardrobe));
    dispatch(WardrobeActions.toggleWireframe(initialWireframe));
    dispatch(WardrobeActions.toggleDoors(initialShowDoors));
    dispatch(WardrobeActions.toggleGridLine(initialShowGridLine));
    dispatch(WardrobeActions.toggleAxes(initialShowAxes));
  }, [dispatch, initialShowDoors, initialWardrobe, initialWireframe, initialShowGridLine, initialShowAxes]);

  return <div className="custom-option">
    <div className="inner-box">
      <h3 className="title">{WardrobeConstants.TITLE.COLOR_PICKER}</h3>
      <CirclePicker color={color} onChange={handleColorChange} />
      <h3 className="title">{WardrobeConstants.TITLE.SIZE_PICKER}</h3>
      <div className="wardrobe-size">
        <ul className="sizes">
          {mockWardrobes.map(item => <li key={item.key}><a className={`link ${item.key === wardrobe.key ? 'active' : ''}`} href="#" onClick={() => handleSizeChange(item)}>{`${item.size.width / 12} * ${item.size.height / 12} Feet`}</a></li>)}
        </ul>
      </div>
      <h3 className="title">{WardrobeConstants.TITLE.OTHER_OPTION}</h3>
      <div className="other">
        <ul className="sizes">
          <li><a className="link" href="#" onClick={handleWireframe}>{WardrobeConstants.TITLE.WIREFRAME}</a></li>
          <li><a className="link" href="#" onClick={handleShowDoors}>{WardrobeConstants.TITLE.DOORS}</a></li>
          <li><a className="link" href="#" onClick={handleShowGrid}>{WardrobeConstants.TITLE.GRID_LINE}</a></li>
          <li><a className="link" href="#" onClick={handleShowAxes}>{WardrobeConstants.TITLE.AXES}</a></li>
          <li><a className="link" href="#" onClick={handleReset}>{WardrobeConstants.TITLE.RESET}</a></li>
        </ul>
      </div>
    </div>
  </div>
}