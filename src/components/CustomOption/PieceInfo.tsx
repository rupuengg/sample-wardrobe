import React, { useCallback } from "react";
import { IWardrobePiecesModel } from "models";
import { E_Category } from "enums";
import { Button } from "components";

export interface IPieceInfo {
  piece: IWardrobePiecesModel;
  onEdit?: (piece: IWardrobePiecesModel) => void;
  onRemove?: (piece: IWardrobePiecesModel) => void;
}

export const PieceInfo: React.FC<IPieceInfo> = ({ piece, onEdit, onRemove }) => {
  const handleEdit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (onEdit) onEdit(piece);
  }, [onEdit, piece]);

  const handleRemove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (onRemove) onRemove(piece);
  }, [onRemove, piece]);

  return <div className="piece-info">
    <div className="info">
      <span><strong>Type: </strong>{piece.type}</span>
      <span><strong>Size: </strong>{`${piece.size.width.toFixed(2) + '*' + piece.size.height.toFixed(2) + '*' + piece.size.depth.toFixed(2)}`}</span>
    </div>
    {
      ![E_Category.BOARD, E_Category.DOOR].includes(piece.category) && <div className="action">
        {onEdit && <Button onClick={handleEdit}>Edit</Button>}
        {onRemove && <Button onClick={handleRemove}>Remove</Button>}
      </div>
    }
  </div>;
}