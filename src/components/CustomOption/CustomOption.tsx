import { CirclePicker } from "react-color";
import { ISize } from "../../models";
import { WardRobeConstants } from "../../constants";
import { useCallback, useState } from "react";

export interface ICustomOption {
  color: string;
  size: string;
  wireframe: boolean;
  onColorChange?: (color: string) => void;
  onSizeChange?: (size: ISize) => void;
  onWireFrameChange?: (wireframe: boolean) => void;
}

export const CustomOption: React.FC<ICustomOption> = ({ color, size, wireframe, onColorChange, onSizeChange, onWireFrameChange }) => {
  const [initialWardrobeColor] = useState<string>(color);
  const [initialWardrobeSize] = useState<string>(size);
  const [initialWireframe] = useState<boolean>(wireframe);

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
    onWireFrameChange && onWireFrameChange(initialWireframe);
  }, [initialWardrobeColor, initialWardrobeSize, initialWireframe, onColorChange, onSizeChange, onWireFrameChange]);

  const handleWireframe = useCallback(() => {
    onWireFrameChange && onWireFrameChange(!wireframe);
  }, [onWireFrameChange, wireframe]);

  return <div className="custom-option">
    <div className="inner-box">
      <h3 className="title">Color Picker</h3>
      <CirclePicker color={color} onChange={handleColorChange} />
      <h3 className="title">Size Picker</h3>
      <div className="wardrobe-size">
        <ul className="sizes">
          {WardRobeConstants.DEFAULT_WARDROBE_SIZE.map(item => <li key={item} onClick={() => handleSizeChange(item)}>{`${getValueInFeet(item)} Feet`}</li>)}
        </ul>
      </div>
      <h3 className="title">Other Option</h3>
      <div className="other">
        <ul className="sizes">
          <li onClick={handleWireframe}>Wireframe</li>
          <li onClick={handleReset}>Reset</li>
        </ul>
      </div>
    </div>
  </div>
}