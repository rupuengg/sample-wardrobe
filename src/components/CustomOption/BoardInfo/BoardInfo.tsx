import React from "react";
import { IWardrobeModel } from "models";
import { TotalBoard } from "./TotalBoard";
import { TotalPiece } from "./TotalPiece";

export interface IBoardInfo {
  wardrobe?: IWardrobeModel;
}

export const BoardInfo: React.FC<IBoardInfo> = ({ wardrobe }) => {
  return <>
    <TotalBoard wardrobe={wardrobe} />
    <TotalPiece wardrobe={wardrobe} />
  </>
}