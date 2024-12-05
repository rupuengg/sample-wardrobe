/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { WardrobeConstants } from "constants/WardrobeConstants";
import { E_Category, E_Position } from "enums";
import { WardrobeActions } from "store/slices";
import { IApplicationState, useAppDispatch } from "store/store";
import { defaultWardrobeCustomAttributes, IWardrobeCustomAttributes, IWardrobePiecesModel } from "models";
import { WardrobeUtils } from "utils/WardrobeUtils";
import { DropDown, IDropDownOption, TextBox } from "components/FormField";
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
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { customWardrobe } = useSelector((state: IApplicationState) => state.wardrobe);
  const [category, setCategory] = useState<E_Category | undefined>(undefined);
  const [type, setType] = useState<E_Position | undefined>(undefined);
  const [numberOfDoors, setNumberOfDoors] = useState<number>(0);
  const [wardrobeAttributes, setWardrobeAttributes] = useState<IWardrobeCustomAttributes>(defaultWardrobeCustomAttributes);
  const [pieces, setPieces] = useState<IWardrobePiecesModel[]>([]);
  const dispatch: any = useAppDispatch();

  const handleSelectChange = useCallback((name: string, value: string) => {
    if (name === 'category') {
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
    return <DropDown label="Type" name="type" value={type} options={newOptions} onChange={handleSelectChange} />
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
        doors.push({ ...WardrobeUtils(customWardrobe.size).getPosition(E_Category.DOOR, E_Position.DOOR, customWardrobe.size, { numberOfGate: gates, gateNumber: iCounter }) })
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
  }, [customWardrobe.size, dispatch, navigate, params.entity, searchParams]);

  const handleAddPiece = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const key: string = `${category}_${type}_${customWardrobe.size.width}_${customWardrobe.size.height}_${customWardrobe.size.depth}_${Math.random().toFixed(4)}`;
    if (category && type) {
      let piece: IWardrobePiecesModel = { category, type, key, size: { width: 0, height: 0, depth: 0 }, position: { x: 0, y: 0, z: 0 } };
      if (category === E_Category.PARTITION && type === E_Position.VERTICAL_PARTITION) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe.size).getPosition(E_Category.PARTITION, E_Position.VERTICAL_PARTITION, customWardrobe.size, { fromLeft: wardrobeAttributes.fromLeft, height: wardrobeAttributes.height }) };
      } else if (category === E_Category.PARTITION && type === E_Position.HORIZONTAL_PARTITION) {
        piece = { ...piece, ...WardrobeUtils(customWardrobe.size).getPosition(E_Category.PARTITION, E_Position.HORIZONTAL_PARTITION, customWardrobe.size, { fromBottom: wardrobeAttributes.fromBottom, width: wardrobeAttributes.width }) };
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

  return <div className="total-board">
    <div className="inner-box">
      <ul className="board-pieces">
        <li>
          <div>
            <div className="form">
              <h1 className="title">{WardrobeConstants.TITLE.CUSTOM}</h1>
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
              <div className="row">
                {/* Category Dropdown */}
                {categoryDropdown}
                {/* Type Dropdown */}
                {category && typeDropdown}
              </div>

              <div className="row">
                {/* FromLeft */}
                {category && type && [E_Category.PARTITION, E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category) && <TextBox label="From Left" name="fromLeft" value={wardrobeAttributes.fromLeft} onChange={handleChange} />}
                {/* FromBottom */}
                {category && type && [E_Category.PARTITION, E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category) && <TextBox label="From Bottom" name="fromBottom" value={wardrobeAttributes.fromBottom} onChange={handleChange} />}
                {/* Width */}
                {category && type && ([E_Category.DRAWER, E_Category.HANGER_ROAD].includes(category) || ([E_Category.PARTITION].includes(category) && [E_Position.HORIZONTAL_PARTITION].includes(type))) && <TextBox label="Width" name="width" value={wardrobeAttributes.width} onChange={handleChange} />}
                {/* Height */}
                {category && type && [E_Category.PARTITION].includes(category) && [E_Position.VERTICAL_PARTITION].includes(type) && <TextBox label="Height" name="height" value={wardrobeAttributes.height} onChange={handleChange} />}
                {/* Drawer Height */}
                {category && type && [E_Category.DRAWER].includes(category) && <TextBox label="Drawer Height" name="drawerHeight" value={wardrobeAttributes.drawerHeight} onChange={handleChange} />}
              </div>

              {/* Save Button */}
              {category && type && <button onClick={(e) => handleAddPiece(e)}>Save Piece</button>}

              {
                pieces.length > 0 && <ul>
                  {
                    pieces.map(p => <li key={p.key}>
                      {`Category:${p.category}, Type:${p.type}, Size:${p.size.width.toFixed(2) + '*' + p.size.height.toFixed(2) + '*' + p.size.depth.toFixed(2)}`}
                      <button onClick={(e) => handleRemovePiece(e, p)}>Edit</button>
                      &nbsp;
                      <button onClick={(e) => handleRemovePiece(e, p)}>Remove</button>
                    </li>)
                  }
                </ul>
              }
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
}