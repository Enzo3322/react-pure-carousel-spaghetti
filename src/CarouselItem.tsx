import React, { useState, useEffect } from 'react';
import { CarouselItemProps } from './types';

const CarouselItem: React.FC<CarouselItemProps> = ({
  children,
  index,
  isVisible,
  shouldPreload,
  width,
  className = '',
}) => {
  const [shouldRender, setShouldRender] = useState<boolean>(isVisible || shouldPreload);

  useEffect(() => {
    if (isVisible || shouldPreload) {
      setShouldRender(true);
    }
  }, [isVisible, shouldPreload]);

  const itemStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    flexShrink: 0,
    boxSizing: 'border-box',
  };

  return (
    <div 
      className={`carousel-item ${className}`} 
      style={itemStyle}
      data-index={index}
    >
      {shouldRender ? children : <div style={{ height: '100%', width: '100%' }} />}
    </div>
  );
};

export default CarouselItem; 