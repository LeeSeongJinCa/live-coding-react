import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

export type CarouselImage = {
  src: string;
  alt: string;
};

interface CarouselProps {
  images: CarouselImage[];
  interval?: number;
  pagination?: boolean;
  navigation?: boolean;
}

export const Carousel = ({
  images,
  interval = 1000,
  pagination = false,
  navigation = false,
}: CarouselProps) => {
  const [key, setKey] = useState(0);
  const resetTimeout = useCallback(() => setKey((prev) => prev + 1), []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const containerWidth = 600;
  const containerHeight = 400;

  useEffect(() => {
    const timeout = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timeout);
  }, [key, interval]);

  const handlePaginationClick = (index: number) => {
    setCurrentIndex(index);
    resetTimeout();
  };

  const handleNavigationClick = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (direction === 'prev') return (prev - 1 + images.length) % images.length;
      return (prev + 1) % images.length;
    });
    resetTimeout();
  };

  return (
    <div
      className="carousel-root"
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: containerWidth * 3,
          height: containerHeight,
          transform: `translateX(-${currentIndex * containerWidth}px)`,
          transition: 'transform 300ms ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={clsx({
              image: true,
              [`index-${index}`]: true,
              active: currentIndex === index,
            })}
            style={{
              position: 'relative',
              flex: '0',
              flexBasis: containerWidth,
              width: containerWidth,
              height: containerHeight,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>

      {pagination && (
        <CarouselPagination
          images={images}
          currentIndex={currentIndex}
          handlePaginationClick={handlePaginationClick}
        />
      )}

      {navigation && <CarouselNavigation handleNavigationClick={handleNavigationClick} />}
    </div>
  );
};

const CarouselPagination = ({
  images,
  currentIndex,
  handlePaginationClick,
}: {
  images: CarouselImage[];
  currentIndex: number;
  handlePaginationClick: (index: number) => void;
}) => {
  return (
    <div
      className="carousel-pagination"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '8px',
        marginBottom: '4px',
      }}
    >
      {Array.from({ length: images.length }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={clsx({
            pagination: true,
            [`index-${index}`]: true,
            active: currentIndex === index,
          })}
          style={{
            width: 10,
            height: 10,
            border: 0,
            borderRadius: '50%',
            background: '#c5c5c5',
            cursor: 'pointer',
            ...(currentIndex === index && {
              background: '#1c1c1c',
            }),
          }}
          onClick={() => handlePaginationClick(index)}
        />
      ))}
    </div>
  );
};

const CarouselNavigation = ({
  handleNavigationClick,
}: {
  handleNavigationClick: (direction: 'prev' | 'next') => void;
}) => {
  return (
    <div className="carousel-navigation">
      <button
        className="carousel-navigation-button carousel-navigation-button-prev"
        type="button"
        style={{
          position: 'absolute',
          top: '50%',
          left: '8px',
          transform: 'translate(0, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          padding: '12px',
          border: 'none',
          borderRadius: '999px',
          color: '#e0e0e0',
          backgroundColor: '#525252',
          cursor: 'pointer',
        }}
        onClick={() => handleNavigationClick('prev')}
      >
        {'<'}
      </button>
      <button
        className="carousel-navigation-button carousel-navigation-button-next"
        type="button"
        style={{
          position: 'absolute',
          top: '50%',
          right: '8px',
          transform: 'translate(0, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          padding: '12px',
          border: 'none',
          borderRadius: '999px',
          color: '#e0e0e0',
          backgroundColor: '#525252',
          cursor: 'pointer',
        }}
        onClick={() => handleNavigationClick('next')}
      >
        {'>'}
      </button>
    </div>
  );
};
