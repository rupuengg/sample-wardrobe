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
  isDisabled?: boolean;
  onChange?: (name: string, value: string | string[]) => void;
}

export const DropDown: React.FC<IDropDown> = ({ name, label, options, isMultiple, value, isDisabled, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tmpDisabled, setTmpDisabled] = useState<boolean>(isDisabled || false);
  const [tmpValue, setTmpValue] = useState<string[] | undefined>(value ? typeof value === 'string' ? [value] : value : undefined);
  const divRef: any = useRef(null);

  useEffect(() => {
    setTmpDisabled(isDisabled || false);
  }, [isDisabled]);

  const dropDownClose = useCallback(() => {
    if (isMultiple && onChange) onChange(name, tmpValue || []);
    setIsOpen(false);
  }, [tmpValue, isMultiple, name, onChange]);

  useEffect(() => {
    const cb = (e: any) => {
      if (divRef.current && divRef.current.contains(e.target)) return;
      dropDownClose();
    }

    document.addEventListener('click', cb);
    return () => {
      document.removeEventListener('click', cb);
    }
  }, [dropDownClose]);

  useEffect(() => {
    if (value) setTmpValue(value ? typeof value === 'string' ? [value] : value : undefined);
    else setTmpValue(undefined);
  }, [value]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      if (isMultiple && onChange) onChange(name, tmpValue ? tmpValue : []);
      setIsOpen(false);
    } else setIsOpen(true);
  }, [isMultiple, isOpen, name, onChange, tmpValue]);

  const handleSelectChange = useCallback((fieldName: string, fieldValue: string) => {
    if (isMultiple) {
      setTmpValue(p => {
        let newTmpValue: string[] = p ? [...p] : [];
        if (newTmpValue?.includes(fieldValue)) {
          const index = newTmpValue.findIndex(t => fieldValue);
          if (index >= 0) {
            newTmpValue = [
              ...newTmpValue.slice(0, index),
              ...newTmpValue.slice(index + 1),
            ]
          }
        } else newTmpValue.push(fieldValue);

        return newTmpValue;
      });
    } else {
      setTmpValue([fieldValue]);
      if (onChange) onChange(fieldName, fieldValue);
      setIsOpen(false);
    }
  }, [isMultiple, onChange]);

  return <div className="form-field dropdown">
    {label && <label className="form-field-label">{label}</label>}
    <div ref={divRef} data-disabled={tmpDisabled} className={`wrapper-box ${isOpen ? 'open' : ''}`}>
      <p {...(!tmpDisabled ? { onClick: handleClose } : {})}>
        <span>{tmpValue?.join(', ')}</span>
      </p>
      <div>
        <ul>
          {options.map((option, index) => <li key={index} className={tmpValue?.includes(option.key) ? 'active' : ''} value={option.key} onClick={() => handleSelectChange(name, option.key)}>{option.value}</li>)}
        </ul>
      </div>
    </div>
  </div>;
}