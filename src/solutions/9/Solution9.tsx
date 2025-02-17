/**
 * 9. Build a Carousel Component
 *
 * Problem:
 * - Create a carousel component that cycles through a set of images.
 * - 이미지 세트를 순환하는 캐러셀 컴포넌트를 만듭니다.
 */

import { Carousel, CarouselImage } from './Carousel';

const images: CarouselImage[] = [
  { src: 'https://placehold.co/600x400', alt: 'carousel 1' },
  { src: 'https://placehold.co/600x400', alt: 'carousel 2' },
  { src: 'https://placehold.co/600x400', alt: 'carousel 3' },
];

export const Solution9 = () => {
  const interval = 3000;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '24px',
        padding: '24px 0',
      }}
    >
      <h2>Carousel with Pagination and Navigation</h2>
      <Carousel images={images} interval={interval} pagination navigation />
    </div>
  );
};
