import { useCallback, useEffect, useState } from 'react';

export type CarouselImage = {
  src: string;
  alt: string;
};

interface CarouselProps {
  images: CarouselImage[];
  interval?: number;
  pagination?: boolean;
}

export const Carousel = ({
  images,
  interval = 3000,
  pagination = false,
}: CarouselProps) => {
  const [key, setKey] = useState(0);
  const updateKey = useCallback(() => setKey((prev) => prev + 1), []);

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
    updateKey();
  };

  return (
    <div
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
        <div
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
              style={{
                width: 10,
                height: 10,
                border: 0,
                borderRadius: '50%',
                background: '#616161',
                cursor: 'pointer',
              }}
              onClick={() => handlePaginationClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
