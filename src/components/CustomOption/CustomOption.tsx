/* eslint-disable jsx-a11y/anchor-is-valid */
import { CirclePicker } from "react-color";
import { useCallback, useState } from "react";
import { ISize, IWardrobeModel } from "models";
import { mockWardrobes } from "mockValues";
import { useAppDispatch } from "store/store";
import { WardrobeActions } from "store/slices";

export interface ICustomOption {
  wardrobe: IWardrobeModel;
  color: string;
  wireframe: boolean;
  showDoors: boolean;
}

export const CustomOption: React.FC<ICustomOption> = ({ wardrobe, color, showDoors, wireframe }) => {
  const dispatch: any = useAppDispatch();

  const [initialWardrobe] = useState<IWardrobeModel>(wardrobe);
  const [initialWardrobeColor] = useState<string>(color);
  const [initialShowDoors] = useState<boolean>(showDoors);
  const [initialWireframe] = useState<boolean>(wireframe);

  const getValueInFeet = useCallback((newSize: ISize) => {
    return newSize.width / 12 + ' * ' + newSize.height / 12;
  }, []);

  const handleColorChange = useCallback((color: any) => {
    dispatch(WardrobeActions.setWardrobeColor(color.hex));
  }, [dispatch]);

  const handleSizeChange = useCallback((wardrobe: IWardrobeModel) => {
    dispatch(WardrobeActions.setCurrentWardrobe(wardrobe));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(WardrobeActions.setWardrobeColor(initialWardrobeColor));
    dispatch(WardrobeActions.setCurrentWardrobe(initialWardrobe));
    dispatch(WardrobeActions.toggleWireframe(initialWireframe));
    dispatch(WardrobeActions.toggleDoors(initialShowDoors));
  }, [dispatch, initialShowDoors, initialWardrobe, initialWardrobeColor, initialWireframe]);

  const handleWireframe = useCallback(() => {
    dispatch(WardrobeActions.toggleWireframe());
  }, [dispatch]);

  const handleShowDoors = useCallback(() => {
    dispatch(WardrobeActions.toggleDoors());
  }, [dispatch]);

  return <div className="custom-option">
    <div className="inner-box">
      <h3 className="title">Color Picker</h3>
      <CirclePicker color={color} onChange={handleColorChange} />
      <h3 className="title">Size Picker</h3>
      <div className="wardrobe-size">
        <ul className="sizes">
          {mockWardrobes.map(item => <li key={item.key}><a className={`link ${item.key === wardrobe.key ? 'active' : ''}`} href="#" onClick={() => handleSizeChange(item)}>{`${getValueInFeet(item.size)} Feet`}</a></li>)}
        </ul>
      </div>
      <h3 className="title">Other Option</h3>
      <div className="other">
        <ul className="sizes">
          <li><a className="link" href="#" onClick={handleWireframe}>Wireframe</a></li>
          <li><a className="link" href="#" onClick={handleShowDoors}>Doors</a></li>
          <li><a className="link" href="#" onClick={handleReset}>Reset</a></li>
        </ul>
      </div>
    </div>
  </div>
}