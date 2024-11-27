/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useMemo } from "react";
import { IWardrobeModel } from "models";
import { WardrobeConstants } from "constants/WardrobeConstants";
import { ConvertUtils } from "utils";

export interface ITotalPiece {
  wardrobe?: IWardrobeModel;
}

export const TotalPiece: React.FC<ITotalPiece> = ({ wardrobe }) => {
  const elements = useMemo(() => {
    const obj: { [x: string]: React.JSX.Element[] } = {};

    wardrobe?.pieces?.forEach((piece, index) => {
      const depth: number = ConvertUtils().toMMFromInch(piece.size.depth);
      const element = <li key={piece.category + piece.type + index.toString()}>
        <div>
          <span><b>Category:</b> {piece.category}</span>
          <span><b>Type:</b> {piece.type}</span>
          <span><b>Size:</b> {piece.size.width.toFixed(2) + ' * ' + piece.size.height.toFixed(2) + ' * ' + depth}</span>
        </div>
        <div>dd</div>
      </li>;

      if (obj[depth]) obj[depth].push(element);
      else obj[depth] = [element];
    });

    return obj;
  }, [wardrobe?.pieces]);

  const getTitle = useCallback((item: string) => {
    switch (item) {
      case '6':
        return '6mm Board';
      case '18':
        return '18mm Board';
      case '236':
        return 'Drawer';
      case '878':
        return 'Hanger Road';
    }

  }, []);

  return <div className="total-board">
    <div className="inner-box">
      <h3 className="title">{WardrobeConstants.TITLE.TOTAL_PIECE}</h3>
      <ul className="board-pieces">
        {
          Object.keys(elements).map(item => <li key={item}>
            <h1>{getTitle(item)}</h1>
            <ul>{elements[item]}</ul>
          </li>)
        }
      </ul>
    </div>
  </div>
}