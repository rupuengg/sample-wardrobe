import { useCallback, useEffect, useRef, useState } from "react";

export interface IDropDownOption {
  key: string;
  value: string;
}

export interface IDropDown {
  name: string;
  label?: string;
  options: IDropDownOption[];
  isMultiple?: boolean;
  value?: string | string[];
  onChange?: (name: string, value: string) => void;
}

export const DropDown: React.FC<IDropDown> = ({ name, label, options, isMultiple = false, value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tmpValue, setTmpValue] = useState<string[] | undefined>(value ? typeof value === 'string' ? [value] : value : undefined);
  const divRef: any = useRef(null);

  useEffect(() => {
    const cb = (e: any) => {
      if (divRef.current && divRef.current.contains(e.target)) return;
      setIsOpen(false);
    }

    document.addEventListener('click', cb);

    return () => {
      document.removeEventListener('click', cb);
    }
  }, []);

  useEffect(() => {
    if (value) setTmpValue(value ? typeof value === 'string' ? [value] : value : undefined);
    else setTmpValue(undefined);
  }, [value]);

  const handleClose = useCallback(() => {
    // onChange && onChange(name, tmpValue);
    setIsOpen(false);
  }, [onChange]);

  const handleSelectChange = useCallback((fieldName: string, fieldValue: string) => {
    setTmpValue(p => ([...(p ? [...p] : []), fieldValue]));
    onChange && onChange(fieldName, fieldValue);
    setIsOpen(false);
  }, [onChange]);

  return <div className="form-field dropdown">
    {label && <label className="form-field-label">{label}</label>}
    <div ref={divRef} className={`wrapper-box ${isOpen ? 'open' : ''}`}>
      <p onClick={() => setIsOpen(!isOpen)}>{tmpValue}</p>
      <div>
        <ul>
          {options.map((option, index) => <li key={index} className={tmpValue?.includes(option.key) ? 'active' : ''} value={option.key} onClick={() => handleSelectChange(name, option.key)}>{option.value}</li>)}
        </ul>
      </div>
    </div>
  </div>;
}