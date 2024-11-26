import { IPosition, ISize } from "models";

export const UnitConverter = {
  MM: {
    TO_METER: 0.001,
    TO_FOOT: 0.0032808399,
    TO_INCH: 0.0393700787,
  },
  METER: {
    TO_MM: 1000,
    TO_FOOT: 3.280839895,
    TO_INCH: 39.37007874,
  },
  FOOT: {
    TO_MM: 304.8,
    TO_METER: 0.3048,
    TO_INCH: 12,
  },
  INCH: {
    TO_MM: 25.4,
    TO_METER: 0.0254,
    TO_FOOT: 0.0833333333,
  }
}

export const ConvertUtils = () => {
  return {
    toMeterFromInch: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return value * UnitConverter.INCH.TO_METER;
    },
    toMeterFromFeet: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return value * UnitConverter.FOOT.TO_METER;
    },
    toMeterFromMM: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return value * UnitConverter.MM.TO_METER;
    },
    toInchFromMM: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return value * UnitConverter.MM.TO_INCH;
    },
    toFeetFromInch: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return value * UnitConverter.INCH.TO_FOOT;
    },
    toMMFromInch: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return Math.round(value * UnitConverter.INCH.TO_MM);
    },
    sizeToInchFromMeter: (position: ISize) => {
      return {
        width: position.width * UnitConverter.METER.TO_INCH,
        height: position.height * UnitConverter.METER.TO_INCH,
        depth: position.depth * UnitConverter.METER.TO_INCH,
      } as ISize;
    },
    positionToInchFromMeter: (position: IPosition) => {
      return {
        x: position.x * UnitConverter.METER.TO_INCH,
        y: position.y * UnitConverter.METER.TO_INCH,
        z: position.z * UnitConverter.METER.TO_INCH,
      } as IPosition;
    },
    sizeToMeterFromInch: (size: ISize) => {
      return {
        width: size.width * UnitConverter.INCH.TO_METER,
        height: size.height * UnitConverter.INCH.TO_METER,
        depth: size.depth * UnitConverter.INCH.TO_METER,
      } as ISize;
    },
    positionToMeterFromInch: (position: IPosition) => {
      return {
        x: position.x * UnitConverter.INCH.TO_METER,
        y: position.y * UnitConverter.INCH.TO_METER,
        z: position.z * UnitConverter.INCH.TO_METER,
      } as IPosition;
    },
  }
}