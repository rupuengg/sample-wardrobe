/* eslint-disable jsx-a11y/anchor-is-valid */
import { WardrobeConstants } from "constants/WardrobeConstants";
import { E_Category, E_Position } from "enums";
import { ISize } from "models";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { WardrobeActions } from "store/slices";
import { IApplicationState, useAppDispatch } from "store/store";

export interface ICustomWardrobe {
  category?: E_Category;
  type?: E_Position;
  fromLeft?: number;
  fromBottom?: number;
  width?: number;
  height?: number;
  drawerHeight?: number;
  numberOfGate?: number;
  gateNumber?: number;
}

export const CustomWardrobe = () => {
  const { customWardrobe, wardrobeColor } = useSelector((state: IApplicationState) => state.wardrobe);
  const dispatch: any = useAppDispatch();

  const getText = useCallback((str: string) => {
    const category: keyof typeof E_Category = str as keyof typeof E_Category;
    // console.log('str', str, category);

    return E_Category[category];
  }, []);

  const getPositionText = useCallback((str: string) => {
    const type: keyof typeof E_Position = str as keyof typeof E_Position;
    // console.log('str', str, type);

    return E_Position[type];
  }, []);

  const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.currentTarget.value, e.target.value);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (['size.width', 'size.height', 'size.depth'].includes(e.currentTarget.name)) {
      if (e.currentTarget.name === 'size.width') dispatch(WardrobeActions.updateSizeInCWardrobe({ ...customWardrobe.size, width: Number(e.currentTarget.value) }));
      if (e.currentTarget.name === 'size.height') dispatch(WardrobeActions.updateSizeInCWardrobe({ ...customWardrobe.size, height: Number(e.currentTarget.value) }));
      if (e.currentTarget.name === 'size.depth') dispatch(WardrobeActions.updateSizeInCWardrobe({ ...customWardrobe.size, depth: Number(e.currentTarget.value) }));
    }
  }, [dispatch, customWardrobe.size]);

  return <div className="total-board">
    <div className="inner-box">
      <h3 className="title">{WardrobeConstants.TITLE.CUSTOM}</h3>
      <ul className="board-pieces">
        <li>
          <label>Size</label>
          <br />
          <input type="number" name="size.width" placeholder="width" value={customWardrobe.size.width} onChange={(e) => handleChange(e)} style={{ width: '60px' }} />
          <input type="number" name="size.height" placeholder="height" value={customWardrobe.size.height} onChange={(e) => handleChange(e)} style={{ width: '60px' }} />
          <input type="number" name="size.depth" placeholder="depth" value={customWardrobe.size.depth} onChange={(e) => handleChange(e)} style={{ width: '60px' }} />
          <br /><br />

          <label>Piece Information</label>
          <br />
          <select name="category" onChange={(e) => handleSelectChange(e)}>
            {Object.keys(E_Category).map(category => <option value={category}>{getText(category)}</option>)}
          </select>
          <select name="type" onChange={(e) => handleSelectChange(e)}>
            {Object.keys(E_Position).map(type => <option value={type}>{getPositionText(type)}</option>)}
          </select>
          <input type="number" name="fromLeft" placeholder="fromLeft" onChange={(e) => handleChange(e)} />
          <input type="number" name="fromBottom" placeholder="fromBottom" onChange={(e) => handleChange(e)} />
          <input type="number" name="width" placeholder="width" onChange={(e) => handleChange(e)} />
          <input type="number" name="height" placeholder="height" onChange={(e) => handleChange(e)} />
          <input type="number" name="drawerHeight" placeholder="drawerHeight" onChange={(e) => handleChange(e)} />
          <input type="number" name="numberOfGate" placeholder="numberOfGate" onChange={(e) => handleChange(e)} />
          <input type="number" name="gateNumber" placeholder="gateNumber" onChange={(e) => handleChange(e)} />
        </li>
      </ul>
    </div>
  </div>
}