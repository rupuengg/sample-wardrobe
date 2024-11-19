import { E_Position } from "../enums";
import { IPosition } from "./Position";

export interface IWardrobe {
  type: E_Position;
  position: IPosition;
  size: IPosition;
  backColor?: string;
  frontColor?: string;
}

export interface IWardrobeList {
  3_7: IWardrobe[];
  4_7: IWardrobe[];
  6_7: IWardrobe[];
  7_9: IWardrobe[];
  10_10: IWardrobe[];
}