/**
 * 9. Build a Carousel Component
 *
 * Problem:
 * - Create a carousel component that cycles through a set of images.
 * - 이미지 세트를 순환하는 캐러셀 컴포넌트를 만듭니다.
 */

export const Solution9 = () => {
  return <Carousel />;
};

const Carousel = () => {
  return (
    <div>
      <div style={{ width: 600, height: 400 }}>
        <img src="https://placehold.co/600x400" alt="carousel" width={600} height={400} />
      </div>
    </div>
  );
};
