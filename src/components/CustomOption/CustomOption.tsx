import { CirclePicker } from "react-color";
import { ISize } from "../../models";
import { WardRobeConstants } from "../../constants";
import { useCallback, useState } from "react";

export interface ICustomOption {
  color: string;
  size: string;
  onColorChange?: (color: string) => void;
  onSizeChange?: (size: ISize) => void;
}

export const CustomOption: React.FC<ICustomOption> = ({ color, size, onColorChange, onSizeChange }) => {
  const [initialWardrobeColor] = useState<string>(color);
  const [initialWardrobeSize] = useState<string>(size);

  const getValueInFeet = useCallback((sizeStr: string) => {
    const str = sizeStr.split('*');
    return Number(str[0]) / 12 + ' * ' + Number(str[1]) / 12;
  }, []);

  const handleColorChange = useCallback((color: any) => {
    onColorChange && onColorChange(color.hex);
  }, [onColorChange]);

  const handleSizeChange = useCallback((sizeStr: string) => {
    const str = sizeStr.split('*');

    const size: ISize = {
      width: Number(str[0]),
      height: Number(str[1]),
      depth: 12 * 2,
    }

    onSizeChange && onSizeChange(size);
  }, [onSizeChange]);

  const handleReset = useCallback(() => {
    onColorChange && onColorChange(initialWardrobeColor);

    const str = initialWardrobeSize.split('*');

    const size: ISize = {
      width: Number(str[0]),
      height: Number(str[1]),
      depth: 12 * 2,
    }

    onSizeChange && onSizeChange(size);
  }, [initialWardrobeColor, initialWardrobeSize, onColorChange, onSizeChange]);

  return <div className="custom-option">
    <div className="inner-box">
      <h3 className="title">Color Picker</h3>
      <CirclePicker color={color} onChange={handleColorChange} />
      <h3 className="title">Size Picker</h3>
      <div className="wardrobe-size">
        <ul>
          {WardRobeConstants.DEFAULT_WARDROBE_SIZE.map(item => <li key={item} onClick={() => handleSizeChange(item)}>{`${getValueInFeet(item)} Feet`}</li>)}
        </ul>
      </div>
      <h3 className="title" onClick={handleReset}>Reset</h3>
    </div>
  </div>
}