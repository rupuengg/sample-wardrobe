/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useMemo } from "react";
import { ISize, IWardrobeModel } from "models";
import { WardrobeConstants } from "constants/WardrobeConstants";
import { ConvertUtils, UnitConverter } from "utils";
import { E_Category } from "enums";

interface ICalculation {
  sqft: number;
  sizes: ISize[];
  depth: number;
}

export interface ITotalBoard {
  wardrobe?: IWardrobeModel;
}

export const TotalBoard: React.FC<ITotalBoard> = ({ wardrobe }) => {
  const elements = useMemo(() => {
    const obj: { [x: string]: ICalculation } = {};

    wardrobe?.pieces?.forEach(piece => {
      const depth: number = ConvertUtils().toMMFromInch(piece.size.depth);
      const sqft: number = ConvertUtils().toFeetFromInch(piece.size.width) * ConvertUtils().toFeetFromInch(piece.size.height);

      if (piece.category === E_Category.HANGER_ROAD) {
        if (obj[E_Category.HANGER_ROAD.toString()]) obj[E_Category.HANGER_ROAD.toString()].sizes.push(piece.size);
        else obj[E_Category.HANGER_ROAD.toString()] = { sizes: [piece.size], sqft, depth: piece.size.depth };
      } else if (piece.category === E_Category.DRAWER) {
        if (obj[E_Category.DRAWER.toString()]) obj[E_Category.DRAWER.toString()].sizes.push(piece.size);
        else obj[E_Category.DRAWER.toString()] = { sizes: [piece.size], sqft, depth: piece.size.depth };
      } else {
        if (obj[depth]) obj[depth].sqft += sqft;
        else obj[depth] = { sqft, sizes: [], depth: piece.size.depth };
      }
    });

    return obj;
  }, [wardrobe?.pieces]);

  const getTitle = useCallback((item: string) => {
    switch (item) {
      case '6':
        return '6mm Board';
      case '18':
        return '18mm Board';
      case E_Category.DRAWER.toString():
        return 'Drawer';
      case E_Category.HANGER_ROAD.toString():
        return 'Hanger Road';
    }

  }, []);

  const getDetail = useCallback((item: string, obj: ICalculation) => {
    return <li>
      <div style={{ width: '100%' }}>
        <span><b>Total Sqft:</b> {Math.round(obj.sqft)}</span>
        {[E_Category.DRAWER.toString(), E_Category.HANGER_ROAD.toString()].includes(item) && <span><b>Size:</b> {obj.sizes.map(size => <span>{size.width.toFixed(2) + ' * ' + size.height.toFixed(2) + ' * ' + size.depth.toFixed(2)}</span>)}</span>}
        {![E_Category.DRAWER.toString(), E_Category.HANGER_ROAD.toString()].includes(item) && <span><b>Number of boards:</b> {(obj.sqft / 32).toFixed(2)} (48 * 98 boards)</span>}
      </div>
    </li>

  }, []);

  console.log('elements', elements);

  return <div className="total-board">
    <div className="inner-box">
      <h3 className="title">{WardrobeConstants.TITLE.TOTAL_BOARD}</h3>
      <ul className="board-pieces">
        {
          Object.keys(elements).map(item => <li key={item}>
            <h1>{getTitle(item)}</h1>
            <ul>{getDetail(item, elements[item])}</ul>
          </li>)
        }
      </ul>
    </div>
  </div>
}