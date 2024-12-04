import { useCallback, useEffect, useState } from "react";

export interface ITextBox {
  name: string;
  label?: string;
  value?: string | number;
  onChange?: (name: string, value: string) => void;
}

export const TextBox: React.FC<ITextBox> = ({ name, label, value, onChange }) => {
  const [tmpValue, setTmpValue] = useState<string | number | undefined>(value);

  useEffect(() => {
    if (value) setTmpValue(value);
    else setTmpValue('');
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpValue(e.currentTarget.value);
    onChange && onChange(e.currentTarget.name, e.currentTarget.value);
  }, []);

  return <div className="form-field textbox">
    {label && <label className="form-field-label">{label}</label>}
    <div className={`wrapper-box`}>
      <div className="input-wrapper">
        <input name={name} value={tmpValue} onChange={handleChange} />
      </div>
    </div>
  </div>;
}