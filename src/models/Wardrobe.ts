import { ISize } from "./Size";

export interface IWardrobeModel {
  key: string;
  title: string;
  size: ISize;
  innerColor?: string;
  wardrobeColor: string;
}