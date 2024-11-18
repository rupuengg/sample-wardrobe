import { ConvertUtils } from "../utils";

export interface ISize {
  width: number,
  height: number,
  depth: number,
}

export const defaultSize: ISize = {
  width: ConvertUtils().toMeterFromFeet(3),
  height: ConvertUtils().toMeterFromFeet(7),
  depth: ConvertUtils().toMeterFromFeet(2),
}