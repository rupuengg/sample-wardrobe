import { E_Category, E_Position } from "enums";
import { ISize } from "./Size";
import { IPosition } from "./Position";

export interface IWardrobePiecesModel {
  key: string;
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

export interface IWardrobeCustomAttributes {
  fromLeft?: number;
  fromBottom?: number;
  width?: number;
  height?: number;
  drawerHeight?: number;
  numberOfGate?: number;
  gateNumber?: number;
}

export const defaultWardrobeCustomAttributes: IWardrobeCustomAttributes = {
  fromLeft: 0,
  fromBottom: 0,
  width: 0,
  height: 0,
  drawerHeight: 0,
  numberOfGate: 0,
  gateNumber: 0,
}

export const defaultWardrobeModel: IWardrobeModel = {
  key: 'custom_wardrobe',
  title: 'Custom Wardrobe',
  size: { width: 0, height: 0, depth: 0 },
}