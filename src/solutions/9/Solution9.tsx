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
  return <Carousel images={images} interval={1000} pagination />;
};
