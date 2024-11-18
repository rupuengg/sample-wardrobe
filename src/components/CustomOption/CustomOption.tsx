import { CirclePicker } from "react-color";
import { ISize } from "../../models";
import { ConvertUtils } from "../../utils";

export interface ICustomOption {
  color: string;
  colorChange?: (color: string) => void;
  sizeChange?: (size: ISize) => void;
}

export const CustomOption: React.FC<ICustomOption> = ({ color, colorChange, sizeChange }) => {
  const handleColorChange = (color: any) => {
    colorChange && colorChange(color.hex);
  }

  const handleSizeChange = (sizeStr: string) => {
    const str = sizeStr.split('*');

    const size: ISize = {
      width: ConvertUtils().toMeterFromFeet(str[0]),
      height: ConvertUtils().toMeterFromFeet(str[1]),
      depth: ConvertUtils().toMeterFromFeet(2),
    }

    sizeChange && sizeChange(size);
  }

  return <div className="custom-option">
    <div className="inner-box">
      <CirclePicker color={color} onChange={handleColorChange} />
      <div>
        <ul>
          <li onClick={() => handleSizeChange('3*7')}>3 * 7 Feet</li>
          <li onClick={() => handleSizeChange('4*7')}>4 * 7 Feet</li>
          <li onClick={() => handleSizeChange('6*7')}>6 * 7 Feet</li>
          <li onClick={() => handleSizeChange('7*9')}>7 * 9 Feet</li>
          <li onClick={() => handleSizeChange('10*10')}>10 * 10 Feet</li>
        </ul>
      </div>
    </div>
  </div>
}