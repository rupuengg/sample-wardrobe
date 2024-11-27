import { E_Category, E_Position } from "enums";
import { ISize } from "./Size";
import { IPosition } from "./Position";

export interface IWardrobePiecesModel {
  category: E_Category;
  type: E_Position;
  position: IPosition;
  size: ISize;
  frontColor?: string;
  backColor?: string;
}

export interface IWardrobeModel {
  key: string;
  title: string;
  size: ISize;
  innerColor?: string;
  wardrobeColor?: string;
  pieces?: IWardrobePiecesModel[];
}

export const defaultWardrobeModel: IWardrobeModel = {
  key: 'custom_wardrobe',
  title: 'Custom Wardrobe',
  size: { width: 0, height: 0, depth: 0 },
}