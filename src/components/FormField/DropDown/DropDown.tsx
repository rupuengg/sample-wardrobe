import { useCallback, useEffect, useRef, useState } from "react";

export interface IDropDownOption {
  key: string;
  value: string;
}

export interface IDropDown {
  name: string;
  label?: string;
  options: IDropDownOption[];
  value?: string;
  onChange?: (name: string, value: string) => void;
}

export const DropDown: React.FC<IDropDown> = ({ name, label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tmpValue, setTmpValue] = useState<string | undefined>(value);
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
    if (value) setTmpValue(value);
    else setTmpValue('');
  }, [value]);

  const handleSelectChange = useCallback((fieldName: string, fieldValue: string) => {
    setTmpValue(fieldValue);
    onChange && onChange(fieldName, fieldValue);
    setIsOpen(false);
  }, [onChange]);

  return <div className="form-field dropdown">
    {label && <label className="form-field-label">{label}</label>}
    <div ref={divRef} className={`wrapper-box ${isOpen ? 'open' : ''}`}>
      <p onClick={() => setIsOpen(!isOpen)}>{tmpValue}</p>
      <div>
        <ul>
          {options.map((option, index) => <li key={index} value={option.key} onClick={() => handleSelectChange(name, option.key)}>{option.value}</li>)}
        </ul>
      </div>
    </div>
  </div>;
}