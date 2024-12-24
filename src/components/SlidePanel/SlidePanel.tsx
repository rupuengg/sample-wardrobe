import React, { useEffect, useState } from "react";

export interface ISlidePanel {
  isOpen?: boolean;
  leftContent: React.JSX.Element;
  rightContent: React.JSX.Element;
  openLeftPanel?: () => void;
}

export const SlidePanel: React.FC<ISlidePanel> = ({ isOpen = false, leftContent, rightContent }) => {
  const [isTmpOpen, setIsTmpOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    setIsTmpOpen(isOpen);
  }, [isOpen]);

  return <div className="slide-panel">
    {isTmpOpen && <div className="left">{leftContent}</div>}
    <div className={`right ${!isTmpOpen ? 'full' : ''}`}>{rightContent}</div>
  </div >;
}