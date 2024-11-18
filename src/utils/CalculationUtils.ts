import { ConvertUtils } from "./ConvertUtils";
import { ISize } from "../models";

export const CalculationUtils = (size: ISize) => {
  return {
    left: (boardThickness: number) => {
      return -((ConvertUtils().toMeterFromInch(size.depth) / 2) + (ConvertUtils().toMeterFromInch(boardThickness) / 2));
    },
    right: (boardThickness: number) => {
      return ((ConvertUtils().toMeterFromInch(size.depth) / 2) + (ConvertUtils().toMeterFromInch(boardThickness) / 2));
    },
    depth: (boardThickness: number) => {
      return -((ConvertUtils().toMeterFromInch(size.width) / 2) - (ConvertUtils().toMeterFromInch(boardThickness) / 2));
    },
    top: (boardThickness: number) => {
      return ((ConvertUtils().toMeterFromInch(size.height) / 2) - (ConvertUtils().toMeterFromInch(boardThickness) / 2));
    },
    bottom: (boardThickness: number) => {
      return -((ConvertUtils().toMeterFromInch(size.height) / 2) - (ConvertUtils().toMeterFromInch(boardThickness) / 2));
    },
  }
}