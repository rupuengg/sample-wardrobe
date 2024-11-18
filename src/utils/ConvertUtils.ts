export const ConvertUtils = () => {
  return {
    toMeterFromInch: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return value * 0.0254;
    },
    toMeterFromFeet: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return value * 0.3048;
    },
    toMeterFromMM: (val: string | number) => {
      let value: number = typeof val === 'string' ? Number(val) : val;
      return value * 0.001;
    },
  }
}