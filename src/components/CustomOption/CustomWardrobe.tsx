/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { WardrobeConstants } from "constants/WardrobeConstants";
import { E_Category, E_Position } from "enums";
import { WardrobeActions } from "store/slices";
import { IApplicationState, useAppDispatch } from "store/store";
import { defaultWardrobeCustomAttributes, IWardrobeCustomAttributes, IWardrobePiecesModel } from "models";
import { WardrobeUtils } from "utils/WardrobeUtils";

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
  const { customWardrobe } = useSelector((state: IApplicationState) => state.wardrobe);
  const [category, setCategory] = useState<E_Category | undefined>(undefined);
  const [type, setType] = useState<E_Position | undefined>(undefined);
  const [numberOfDoors, setNumberOfDoors] = useState<number>(0);
  const [wardrobeAttributes, setWardrobeAttributes] = useState<IWardrobeCustomAttributes>(defaultWardrobeCustomAttributes);
  const [pieces, setPieces] = useState<IWardrobePiecesModel[]>([]);
  const dispatch: any = useAppDispatch();

  const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.name === 'category') {
      const tmpCategory: E_Category = e.currentTarget.value as E_Category;
      setCategory(tmpCategory)
    } else if (e.currentTarget.name === 'type') {
      const tmpType: E_Position = e.currentTarget.value as E_Position;
      setType(tmpType)
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (['size.width', 'size.height', 'size.depth'].includes(e.currentTarget.name)) {
      if (e.currentTarget.name === 'size.width') dispatch(WardrobeActions.updateSizeInCWardrobe({ ...customWardrobe.size, width: Number(e.currentTarget.value) }));
      if (e.currentTarget.name === 'size.height') dispatch(WardrobeActions.updateSizeInCWardrobe({ ...customWardrobe.size, height: Number(e.currentTarget.value) }));
      if (e.currentTarget.name === 'size.depth') dispatch(WardrobeActions.updateSizeInCWardrobe({ ...customWardrobe.size, depth: Number(e.currentTarget.value) }));
    }
  }, [dispatch, customWardrobe.size]);

  const handleAttributeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const name: keyof IWardrobeCustomAttributes = e.currentTarget.name as keyof IWardrobeCustomAttributes;
    const value: number = Number(e.currentTarget.value);

    setWardrobeAttributes(p => ({ ...p, [name]: value }));
  }, []);

  const handleAddPiece = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const key: string = `${category}_${type}_${customWardrobe.size.width}_${customWardrobe.size.height}_${customWardrobe.size.depth}_${Math.random().toFixed(4)}`;
    if (category && type) {
      let piece: IWardrobePiecesModel = { category, type, key, size: { width: 0, height: 0, depth: 0 }, position: { x: 0, y: 0, z: 0 } };
      if (category === E_Category.PARTITION && type === E_Position.VERTICAL_PARTITION) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe.size).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, customWardrobe.size, { fromLeft: wardrobeAttributes.fromLeft, height: wardrobeAttributes.height }) };
      } else if (category === E_Category.PARTITION && type === E_Position.HORIZONTAL_PARTITION) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe.size).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, customWardrobe.size, { fromLeft: wardrobeAttributes.fromLeft, fromBottom: wardrobeAttributes.fromBottom, width: wardrobeAttributes.width }) };
      } else if (category === E_Category.DRAWER && type === E_Position.DRAWER) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe.size).getPosition(E_Category.DRAWER, E_Position.DRAWER, customWardrobe.size, { fromLeft: wardrobeAttributes.fromLeft, fromBottom: wardrobeAttributes.fromBottom, width: wardrobeAttributes.width, drawerHeight: wardrobeAttributes.drawerHeight }) };
      } else if (category === E_Category.HANGER_ROAD && type === E_Position.HANGER_ROAD) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe.size).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, customWardrobe.size, { fromLeft: wardrobeAttributes.fromLeft, fromBottom: wardrobeAttributes.fromBottom, width: wardrobeAttributes.width }) };
      }
      dispatch(WardrobeActions.updatePieceInCWardrobe(piece));
      setPieces(p => ([...p, piece]));
      setCategory(undefined);
      setType(undefined);
      setWardrobeAttributes(defaultWardrobeCustomAttributes);
    }
  }, [category, customWardrobe.size, dispatch, type, wardrobeAttributes.drawerHeight, wardrobeAttributes.fromBottom, wardrobeAttributes.fromLeft, wardrobeAttributes.height, wardrobeAttributes.width]);

  const handleRemovePiece = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, piece: IWardrobePiecesModel) => {
    const key: string = piece.key;
    if (key) {
      dispatch(WardrobeActions.removePieceInCWardrobe(key));
      const index = pieces.findIndex(p => p.key === key);
      if (index && index >= 0) {
        setPieces([
          ...pieces.slice(0, index),
          ...pieces.slice(index + 1),
        ]);
      }
    }
  }, [dispatch, pieces]);

  const handleDoorsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (['numberOfGate'].includes(e.currentTarget.name)) {
      const doors: IWardrobePiecesModel[] = [];
      for (let iCounter = 1; iCounter <= Number(e.currentTarget.value); iCounter++) {
        doors.push({ ...WardrobeUtils(customWardrobe.size).getPosition(E_Category.DOOR, E_Position.DOOR, customWardrobe.size, { numberOfGate: Number(e.currentTarget.value), gateNumber: iCounter }) })
      }
      dispatch(WardrobeActions.updateDoorsInCWardrobe(doors));
    }
    setNumberOfDoors(Number(e.currentTarget.value));
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

          <fieldset>
            <legend>Piece Information</legend>
            <div>
              <select name="category" value={category !== undefined ? category : ''} onChange={(e) => handleSelectChange(e)}>
                <option value={''}>Select Category</option>
                {Object.values(E_Category).filter(c => c.toString() !== 'door').map(c => <option value={c}>{c}</option>)}
              </select>
              <select name="type" value={type || ''} onChange={(e) => handleSelectChange(e)}>
                <option value={''}>Select Type</option>
                {Object.values(E_Position).filter(t => t.toString() !== 'door').map(t => <option value={t}>{t}</option>)}
              </select>
              <br /><br />
              {category && [E_Category.PARTITION, E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category) && <label style={{ display: 'inline-block', marginRight: '5px' }}>
                <span>fromLeft</span><br />
                <input type="number" name="fromLeft" placeholder="fromLeft" value={wardrobeAttributes.fromLeft} onChange={(e) => handleAttributeChange(e)} style={{ width: '40px' }} />
              </label>}

              {category && [E_Category.PARTITION, E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category) && <label style={{ display: 'inline-block', marginRight: '5px' }}>
                <span>fromBottom</span><br />
                <input type="number" name="fromBottom" placeholder="fromBottom" value={wardrobeAttributes.fromBottom} onChange={(e) => handleAttributeChange(e)} style={{ width: '40px' }} />
              </label>}

              {category && type && ([E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category) || ([E_Category.PARTITION].includes(category) && [E_Position.HORIZONTAL_PARTITION].includes(type))) && <label style={{ display: 'inline-block', marginRight: '5px' }}>
                <span>width</span><br />
                <input type="number" name="width" placeholder="width" value={wardrobeAttributes.width} onChange={(e) => handleAttributeChange(e)} style={{ width: '40px' }} />
              </label>}

              {category && type && [E_Category.PARTITION].includes(category) && [E_Position.VERTICAL_PARTITION].includes(type) && <label style={{ display: 'inline-block', marginRight: '5px' }}>
                <span>height</span><br />
                <input type="number" name="height" placeholder="height" value={wardrobeAttributes.height} onChange={(e) => handleAttributeChange(e)} style={{ width: '40px' }} />
              </label>}

              {category && [E_Category.DRAWER].includes(category) && <label style={{ display: 'inline-block', marginRight: '5px' }}>
                <span>drawerHeight</span><br />
                <input type="number" name="drawerHeight" placeholder="drawerHeight" value={wardrobeAttributes.drawerHeight} onChange={(e) => handleAttributeChange(e)} style={{ width: '40px' }} />
              </label>}

              <br /><br />
              {category && type && <button onClick={(e) => handleAddPiece(e)}>Add Piece</button>}
              <br /><br />
              {pieces.length > 0 && <ul>{pieces.map(p => <li>{`Category:${p.category}, Type:${p.type}, Size:${p.size.width.toFixed(2) + '*' + p.size.height.toFixed(2) + '*' + p.size.depth.toFixed(2)}`}<button onClick={(e) => handleRemovePiece(e, p)}>Remove Piece</button></li>)}</ul>}
            </div>
          </fieldset>

          <label>Doors</label>
          <br />
          <input type="number" name="numberOfGate" placeholder="numberOfGate" value={numberOfDoors} onChange={(e) => handleDoorsChange(e)} style={{ width: '60px' }} />
        </li>
      </ul>
    </div>
  </div>
}