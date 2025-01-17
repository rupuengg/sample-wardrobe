/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { WardrobeConstants } from "constant";
import { E_Category, E_Position } from "enums";
import { IApplicationState, useAppDispatch, WardrobeActions } from "store";
import { defaultWardrobeCustomAttributes, IWardrobeCustomAttributes, IWardrobePiecesModel } from "models";
import { WardrobeUtils } from "utils";
import { Button, DropDown, IDropDownOption, TextBox, PieceInfo } from "components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UrlUtils } from "utils/urlUtils";

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
  const [pieces, setPieces] = useState<IWardrobePiecesModel[]>(customWardrobe.pieces || []);

  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(WardrobeActions.generateCustomWardrobe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPieces(customWardrobe.pieces || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customWardrobe.pieces]);

  const handleSelectChange = useCallback((name: string, value: string | string[]) => {
    if (name === 'category' && typeof value === 'string') {
      setCategory(value as E_Category);
      setType(undefined);
    } else if (name === 'type') setType(value as E_Position)
  }, []);

  const categoryDropdown = useMemo(() => {
    const options: IDropDownOption[] = Object.values(E_Category).filter(c => c.toString() !== 'door').map(c => ({ key: c, value: c } as IDropDownOption));
    options.unshift({ key: '', value: 'Select Category' });

    return <DropDown label="Category" name="category" value={category} options={options} onChange={handleSelectChange} />
  }, [category, handleSelectChange]);

  const typeDropdown = useMemo(() => {
    const options: IDropDownOption[] = Object.values(E_Position).filter(t => t.toString() !== 'door').map(c => ({ key: c, value: c } as IDropDownOption));

    const cb = (i: IDropDownOption) => {
      if ((category as E_Category) === E_Category.DRAWER && i.key as E_Position === E_Position.DRAWER) {
        return i;
      } else if ((category as E_Category) === E_Category.HANGER_ROAD && i.key as E_Position === E_Position.HANGER_ROAD) {
        return i;
      } else if ((category as E_Category) === E_Category.PARTITION && [E_Position.HORIZONTAL_PARTITION, E_Position.VERTICAL_PARTITION].includes(i.key as E_Position)) {
        return i;
      } else if ((category as E_Category) === E_Category.PARTITION && [E_Position.HORIZONTAL_PARTITION, E_Position.VERTICAL_PARTITION].includes(i.key as E_Position)) {
        return i;
      } else if ((category as E_Category) === E_Category.BOARD && [E_Position.BACK, E_Position.FRONT, E_Position.TOP, E_Position.BOTTOM, E_Position.LEFT, E_Position.RIGHT].includes(i.key as E_Position)) {
        return i;
      }
    }
    const newOptions: IDropDownOption[] = options.filter(cb);

    newOptions.unshift({ key: '', value: 'Select Type' });
    return <DropDown label="Type" name="type" value={type} options={newOptions} onChange={handleSelectChange} isDisabled={!category} />
  }, [category, type, handleSelectChange]);

  const handleChange = useCallback((fieldName: string, fieldValue: string | number) => {
    if (['size.width', 'size.height', 'size.depth'].includes(fieldName)) {
      let tmpColumn: string | undefined;
      if (fieldName === 'size.width') tmpColumn = 'width';
      else if (fieldName === 'size.height') tmpColumn = 'height';
      else if (fieldName === 'size.depth') tmpColumn = 'depth';

      tmpColumn && dispatch(WardrobeActions.updateSizeInCWardrobe({ key: tmpColumn, value: Number(fieldValue) }));
    } else if (['numberOfGate'].includes(fieldName)) {
      const gates: number = fieldValue && fieldValue.toString() !== '' ? Number(fieldValue) : 0;
      const doors: IWardrobePiecesModel[] = [];
      for (let iCounter = 1; iCounter <= gates; iCounter++) {
        doors.push({ ...WardrobeUtils(customWardrobe).getPosition(E_Category.DOOR, E_Position.DOOR, customWardrobe.size, { numberOfGate: gates, gateNumber: iCounter }) })
      }
      dispatch(WardrobeActions.updateDoorsInCWardrobe(doors));
      setNumberOfDoors(gates);

      if (gates > 0) searchParams.set('DOORS', 'true');
      else searchParams.delete('DOORS');
      navigate({
        pathname: UrlUtils.makeRouteWidthoutSearch(params.entity, undefined),
        search: `?${searchParams.toString()}`
      });
    } else if (['category', 'type'].includes(fieldName)) {
      setWardrobeAttributes(p => ({ ...p, [fieldName]: fieldValue }));
    } else {
      const name: keyof IWardrobeCustomAttributes = fieldName as keyof IWardrobeCustomAttributes;
      const value: number = Number(fieldValue);

      setWardrobeAttributes(p => ({ ...p, [name]: value }));
    }
  }, [customWardrobe, dispatch, navigate, params.entity, searchParams]);

  const handleAddPiece = useCallback(() => {
    const key: string = `${category}_${type}_${customWardrobe.size.width}_${customWardrobe.size.height}_${customWardrobe.size.depth}_${Math.random().toFixed(4)}`;
    if (category && type) {
      let piece: IWardrobePiecesModel = { category, type, key, size: { width: 0, height: 0, depth: 0 }, position: { x: 0, y: 0, z: 0 } };
      if (category === E_Category.PARTITION && type === E_Position.VERTICAL_PARTITION) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, customWardrobe.size, { fromLeft: wardrobeAttributes.fromLeft, height: wardrobeAttributes.height }) };
      } else if (category === E_Category.PARTITION && type === E_Position.HORIZONTAL_PARTITION) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, customWardrobe.size, { fromBottom: wardrobeAttributes.fromBottom, width: wardrobeAttributes.width }) };
      } else if (category === E_Category.DRAWER && type === E_Position.DRAWER) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe).getPosition(E_Category.DRAWER, E_Position.DRAWER, customWardrobe.size, { fromLeft: wardrobeAttributes.fromLeft, fromBottom: wardrobeAttributes.fromBottom, width: wardrobeAttributes.width, drawerHeight: wardrobeAttributes.drawerHeight }) };
      } else if (category === E_Category.HANGER_ROAD && type === E_Position.HANGER_ROAD) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe).getPosition(E_Category.HANGER_ROAD, E_Position.HANGER_ROAD, customWardrobe.size, { fromLeft: wardrobeAttributes.fromLeft, fromBottom: wardrobeAttributes.fromBottom, width: wardrobeAttributes.width }) };
      }
      dispatch(WardrobeActions.updatePieceInCWardrobe(piece));
      setCategory(undefined);
      setType(undefined);
      setWardrobeAttributes(defaultWardrobeCustomAttributes);
    }
  }, [category, customWardrobe, dispatch, type, wardrobeAttributes.drawerHeight, wardrobeAttributes.fromBottom, wardrobeAttributes.fromLeft, wardrobeAttributes.height, wardrobeAttributes.width]);

  const handleExport = useCallback(() => {
    console.log('customWardrobe', WardrobeUtils(customWardrobe).export());
  }, [customWardrobe]);

  const handleEditPiece = useCallback((piece: IWardrobePiecesModel) => {
    const key: string = piece.key;
    if (key) dispatch(WardrobeActions.removePieceInCWardrobe(key));
  }, [dispatch]);

  const handleRemovePiece = useCallback((piece: IWardrobePiecesModel) => {
    const key: string = piece.key;
    if (key) dispatch(WardrobeActions.removePieceInCWardrobe(key));
  }, [dispatch]);

  return <div className="total-board">
    <div className="inner-box">
      <div className="form">
        <h1 className="title">{WardrobeConstants.OPTION_TITLE.CUSTOM}</h1>
        <h2 className="title">Wardrobe Size</h2>
        <div className="row">
          <TextBox label="Width" name="size.width" value={customWardrobe.size.width} onChange={handleChange} />
          <TextBox label="Height" name="size.height" value={customWardrobe.size.height} onChange={handleChange} />
          <TextBox label="Depth" name="size.depth" value={customWardrobe.size.depth} onChange={handleChange} />
        </div>
        <h2 className="title">Door Information</h2>
        <div className="row">
          <TextBox label="Number of Doors" name="numberOfGate" value={numberOfDoors} onChange={handleChange} />
        </div>
        <h2 className="title">Piece Information</h2>
        <div style={{ minHeight: '190px' }}>
          <div className="row">
            {/* Category Dropdown */}
            {categoryDropdown}
            {/* Type Dropdown */}
            {typeDropdown}
          </div>

          <div className="row" style={{ marginBottom: '20px' }}>
            {/* FromLeft */}
            <TextBox label="F. Left" name="fromLeft" value={wardrobeAttributes.fromLeft} onChange={handleChange} isDisabled={!(category && type && [E_Category.PARTITION, E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category))} />
            {/* FromBottom */}
            <TextBox label="F. Bottom" name="fromBottom" value={wardrobeAttributes.fromBottom} onChange={handleChange} isDisabled={!(category && type && [E_Category.PARTITION, E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category))} />
            {/* Width */}
            <TextBox label="Width" name="width" value={wardrobeAttributes.width} onChange={handleChange} isDisabled={!(category && type && ([E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category) || ([E_Category.PARTITION].includes(category) && [E_Position.HORIZONTAL_PARTITION].includes(type))))} />
            {/* Height */}
            {category && !([E_Category.DRAWER].includes(category)) && <TextBox label="Height" name="height" value={wardrobeAttributes.height} onChange={handleChange} isDisabled={!(category && type && [E_Category.PARTITION].includes(category) && [E_Position.VERTICAL_PARTITION].includes(type))} />}
            {/* Drawer Height */}
            {category && type && [E_Category.DRAWER].includes(category) && <TextBox label="D. Height" name="drawerHeight" value={wardrobeAttributes.drawerHeight} onChange={handleChange} />}
          </div>

          {/* Save Button */}
          <div className="row" style={{ justifyContent: 'flex-start' }}>
            <Button isDisabled={category && type ? false : true} onClick={handleAddPiece}>Save Piece</Button>
            <Button style={{ width: '130px' }} onClick={handleExport}>Export Wardrobe</Button>
          </div>
        </div>

        {
          pieces.length > 0 && <>
            <h2 className="title">Piece List</h2>
            <div className="board-pieces">
              <ul>{pieces.map(p => <li key={p.key}><PieceInfo piece={p} onEdit={handleEditPiece} onRemove={handleRemovePiece} /></li>)}</ul>
            </div>
          </>
        }

      </div>
    </div>
  </div>
}