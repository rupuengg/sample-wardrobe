/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useMemo } from "react";
import { IWardrobeModel } from "models";
import { WardrobeConstants } from "constant";
import { ConvertUtils } from "utils";
import { StringUtils } from "utils/StringUtils";

export interface ITotalPiece {
  wardrobe?: IWardrobeModel;
}

export const TotalPiece: React.FC<ITotalPiece> = ({ wardrobe }) => {
  const elements = useMemo(() => {
    const obj: { [x: string]: React.JSX.Element[] } = {};

    wardrobe?.pieces?.forEach((piece, index) => {
      const depth: number = ConvertUtils().toMMFromInch(piece.size.depth);
      const element = <li key={piece.category + piece.type + index.toString()}>
        <div className="piece-info">
          <div className="info">
            <span><span style={{ display: 'inline-block', marginRight: '10px', minWidth: '150px' }}><strong>Category: </strong>{StringUtils(piece.category).toCapitalize()}</span><span style={{ display: 'inline' }}><strong>Position: </strong>{StringUtils(piece.type).toCapitalize()}</span></span>
            <span><strong>Size: </strong>{`${piece.size.width.toFixed(2) + '*' + piece.size.height.toFixed(2) + '*' + piece.size.depth.toFixed(2)}`}</span>
          </div>
          <div className="action">&nbsp;</div>
        </div>
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
      <div className="form">
        <h1 className="title">{WardrobeConstants.TITLES.TOTAL_PIECE}</h1>
        {
          Object.keys(elements).map(item => <div key={item}>
            <h2 className="title">{getTitle(item)}</h2>
            <div className="board-pieces">
              <ul>{elements[item]}</ul>
            </div>
          </div>)
        }
      </div>
    </div>
  </div>
}