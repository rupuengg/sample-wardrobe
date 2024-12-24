import React from "react";
import { IWardrobeModel } from "models";
import { TotalBoard, TotalPiece } from "components";

export interface IBoardInfo {
  wardrobe?: IWardrobeModel;
}

export const BoardInfo: React.FC<IBoardInfo> = ({ wardrobe }) => {
  return <>
    <TotalBoard wardrobe={wardrobe} />
    <TotalPiece wardrobe={wardrobe} />
  </>
}