import React, { useCallback } from "react";

export interface IButton {
  children?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<IButton> = ({ children, onClick }) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  }, [onClick]);

  return <div className="form-field button">
    <div className={`wrapper-box`}>
      <div className="input-wrapper">
        <button type="button" onClick={handleClick}>{children}</button>
      </div>
    </div>
  </div>;
}