import React, { CSSProperties, useCallback } from "react";

export interface IButton {
  children?: string;
  isDisabled?: boolean;
  style?: CSSProperties | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<IButton> = ({ children, isDisabled = false, style, onClick }) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  }, [onClick]);

  return <div className="form-field button">
    <div className="wrapper-box">
      <div className="input-wrapper">
        <button style={style ? style : {}} disabled={isDisabled} type="button" onClick={handleClick}>{children}</button>
      </div>
    </div>
  </div>;
}