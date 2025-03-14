import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CarouselProps } from './types';
import CarouselItem from './CarouselItem';
import './carousel.css';

const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsPerView = 1,
  spacing = 10,
  lazyLoad = true,
  preloadItems = 1,
  infinite = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  className = '',
  showIndicators = true,
  showNavigation = true,
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;
  
  // Calcular o número de slides
  const totalSlides = Math.ceil(totalItems - itemsPerView) + 1;
  
  // Calcular a largura de cada item
  const calculateItemWidth = useCallback(() => {
    if (!containerWidth) return 0;
    const availableWidth = containerWidth - (spacing * (Math.floor(itemsPerView) - 1));
    return availableWidth / itemsPerView;
  }, [containerWidth, itemsPerView, spacing]);
  
  const itemWidth = calculateItemWidth();
  
  // Atualizar a largura do container quando a janela for redimensionada
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);
  
  // Configurar autoplay
  useEffect(() => {
    if (autoPlay && !isDragging) {
      autoPlayTimerRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, currentIndex, isDragging]);
  
  // Verificar se um item está visível
  const isItemVisible = (index: number) => {
    return index >= currentIndex && index < currentIndex + itemsPerView;
  };
  
  // Verificar se um item deve ser pré-carregado
  const shouldPreloadItem = (index: number) => {
    if (!lazyLoad) return true;
    
    const preloadStart = Math.max(0, currentIndex - preloadItems);
    const preloadEnd = Math.min(totalItems - 1, currentIndex + itemsPerView + preloadItems);
    
    return index >= preloadStart && index <= preloadEnd;
  };
  
  // Navegar para o próximo slide
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex > totalItems - itemsPerView) {
        return infinite ? 0 : totalItems - itemsPerView;
      }
      return nextIndex;
    });
  }, [infinite, itemsPerView, totalItems]);
  
  // Navegar para o slide anterior
  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex < 0) {
        return infinite ? totalItems - itemsPerView : 0;
      }
      return nextIndex;
    });
  }, [infinite, itemsPerView, totalItems]);
  
  // Navegar para um slide específico
  const goToSlide = useCallback((index: number) => {
    const validIndex = Math.max(0, Math.min(index, totalItems - itemsPerView));
    setCurrentIndex(validIndex);
    
    if (onSlideChange) {
      onSlideChange(validIndex);
    }
  }, [itemsPerView, onSlideChange, totalItems]);
  
  // Manipuladores de eventos de arrastar
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = currentX - startX;
    
    setTranslateX(diff);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    setTranslateX(diff);
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Determinar se deve navegar para o próximo ou anterior com base na distância arrastada
    if (Math.abs(translateX) > itemWidth / 3) {
      if (translateX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    
    setTranslateX(0);
  };
  
  // Calcular a posição do track
  const trackPosition = -currentIndex * (itemWidth + spacing);
  const trackStyle: React.CSSProperties = {
    transform: `translateX(${trackPosition + translateX}px)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
    display: 'flex',
    gap: `${spacing}px`,
  };
  
  return (
    <div 
      className={`carousel-container ${className}`} 
      ref={containerRef}
    >
      <div 
        className="carousel-track-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <div 
          className="carousel-track" 
          ref={trackRef}
          style={trackStyle}
        >
          {childrenArray.map((child, index) => (
            <CarouselItem
              key={index}
              index={index}
              isVisible={isItemVisible(index)}
              shouldPreload={shouldPreloadItem(index)}
              width={itemWidth}
            >
              {child}
            </CarouselItem>
          ))}
        </div>
      </div>
      
      {showNavigation && totalSlides > 1 && (
        <div className="carousel-navigation">
          <button 
            className="carousel-nav-button prev"
            onClick={goToPrev}
            disabled={!infinite && currentIndex === 0}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button 
            className="carousel-nav-button next"
            onClick={goToNext}
            disabled={!infinite && currentIndex >= totalItems - itemsPerView}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>
      )}
      
      {showIndicators && totalSlides > 1 && (
        <div className="carousel-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === Math.floor(currentIndex) ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel; 