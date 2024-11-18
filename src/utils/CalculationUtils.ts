import { ISize } from "../models";

export const CalculationUtils = (size: ISize) => {
  return {
    left: (boardThickness: number) => {
      return -((size.depth / 2) + (boardThickness / 2));
    },
    right: (boardThickness: number) => {
      return ((size.depth / 2) + (boardThickness / 2));
    },
    depth: (boardThickness: number) => {
      return -((size.width / 2) - (boardThickness / 2));
    },
    top: (boardThickness: number) => {
      return ((size.height / 2) - (boardThickness / 2));
    },
    bottom: (boardThickness: number) => {
      return -((size.height / 2) - (boardThickness / 2));
    },
  }
}